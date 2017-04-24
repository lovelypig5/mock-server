<script>
import template from 'templates/features/mock/test.html';
import JSONEditor from "jsoneditor";

const MockTest = Vue.extend({
    name: 'mock-test',
    template: template,
    props: ['project', 'mockapi'],
    mounted() {
        var options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'],
            onError(err) {
                alert(err.toString());
            },
            onModeChange(newMode, oldMode) {
                console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };
        this.headerEditor = new JSONEditor($(this.$el).find("#headersJson")[0], options);
        this.paramEditor = new JSONEditor($(this.$el).find("#paramJson")[0], options);
        this.editor = new JSONEditor($(this.$el).find('#testResult')[0], {
            mode: 'view'
        }, {});
        this.headerEditor.set({
            mockauthor: "",
            mocktype: 'prefix',
            mocktoken: this.token
        });
    },
    computed: {
        isPost() {
            return this.mockapi.type != 'GET';
        },
        token() {
            return this.$store.state.user.id;
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
                    "Result": e.responseText
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
                    var prefix = this.project.beginPath;
                    if (headers.mockauthor != prefix) {
                        headers.mockauthor = prefix;
                        headers.mocktype = 'author';
                        headers.mocktoken = this.token;
                        this.headerEditor.set(headers);
                    }
                }
            }
            this.paramEditor.setText(this.mockapi.param);
        },
        token() {
            this.headerEditor.set({
                mockauthor: "",
                mocktype: 'prefix',
                mocktoken: this.token
            });
        }
    }
})

export default MockTest;
</script>
