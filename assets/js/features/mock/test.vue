<script>
import template from 'templates/features/mock/test.html';
import JSONEditor from "jsoneditor";

const MockTest = Vue.extend({
    name: 'mock-test',
    template: template,
    props: ['mockapi', 'project'],
    mounted() {
        var options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'],
            onError: function(err) {
                alert(err.toString());
            },
            onModeChange: function(newMode, oldMode) {
                console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };
        this.headerEditor = new JSONEditor($(this.$el).find("#headersJson")[0], options, {
            "author": ""
        });
        this.paramEditor = new JSONEditor($(this.$el).find("#paramJson")[0], options);
        this.editor = new JSONEditor($(this.$el).find('#testResult')[0], {
            mode: 'view'
        }, {});
    },
    computed: {
        isPost() {
            return this.mockapi.type != 'GET';
        }
    },
    methods: {
        expand() {
            $("#mockTest").toggleClass("expand");
        },
        request() {
            let self = this;
            if (!this.mockapi.url) {
                return;
            }

            let ajaxParam = {
                url: this.mockapi.url,
                type: this.mockapi.type
            };

            let headers = {};
            if (this.headerEditor.getText() != "") {
                try {
                    headers = this.headerEditor.get();
                } catch (e) {
                    alert("header格式错误");
                    return false;
                }
                ajaxParam.headers = headers;
            }

            if (this.paramEditor.getText() != '') {
                var param = this.paramEditor.get();
                ajaxParam.data = param;
                if (this.isPost) {
                    ajaxParam.data = JSON.stringify(param);
                }
            }

            $.ajax(ajaxParam).done((result) => {
                self.editor.set(result);
            }).fail((e) => {
                let responseText = e.responseText;
                try {
                    responseText = JSON.parse(responseText);
                } catch (e) {}
                var result = {
                    "Status": e.status,
                    "Result": responseText
                }
                self.editor.set(result);
            });
        }
    },
    watch: {
        mockapi() {
            if (this.project.isPublic != "1") {
                let headers;
                if (this.headerEditor.getText() != "") {
                    try {
                        headers = this.headerEditor.get();
                    } catch (e) {
                        alert("header格式错误");
                        return false;
                    }
                    var author = this.project.beginPath;
                    if (headers.author != author) {
                        headers.author = author;
                        this.headerEditor.set(headers);
                    }
                }
            }
            this.paramEditor.setText(this.mockapi.param);
        }
    }
})

export default MockTest;
</script>
