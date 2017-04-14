<script>
import template from 'templates/features/mock/edit.html';
import API from 'config/api';
import JSONEditor from 'jsoneditor';

const MockEdit = Vue.extend({
    name: 'mock-edit',
    template: template,
    props: ['data'],
    data() {
        return {
            mockapi: {
                num: 0,
                _id: "",
                url: "",
                desc: "",
                menuId: "",
                result: "{}",
                respParam: "",
                dataHandler: "over",
                param: "{}",
                type: "",
                active: true
            },
            menus: [],
            project: {},
            editing: false,
            loading: {
                post: false
            }
        }
    },
    mounted() {
        if (this.data) {
            Object.assign(this.mockapi, this.data.mockapi);
            Object.assign(this.menus, this.data.menus);
            Object.assign(this.project, this.data.project);

            this.editing = true;
        }

        var container = $(this.$el).find('#jsoneditor')[0];
        var paramContainer = $(this.$el).find('#param-jsoneditor')[0];

        var options = {
            mode: 'code',
            modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
            onError: (err) => {
                alert(err.toString());
            },
            onModeChange: (newMode, oldMode) => {
                console.log('Mode switched from', oldMode, 'to', newMode);
            }
        };

        this.editor = new JSONEditor(container, options, {});
        this.paramEditor = new JSONEditor(paramContainer, options, {});
        this.editor.set(JSON.parse(this.mockapi.result));
        this.paramEditor.set(JSON.parse(this.mockapi.param));
    },
    methods: {
        save() {
            if (this.loading.post) {
                return
            }
            this.loading.post = !this.loading.post;
            this.mockapi.result = JSON.stringify(this.editor.get(), null, 2);
            this.mockapi.param = JSON.stringify(this.paramEditor.get(), null, 2)
            if (this.mockapi.url === "" || this.mockapi.result === "" || this.mockapi.type === "") {
                alert("参数不全");
                return false;
            } else if (this.mockapi.url.indexOf("\/") !== 0) {
                alert("url必须以/开头");
                return false;
            } else if (this.mockapi.url.indexOf("/umock") != -1) {
                alert("url不能以/umock开头，与现在的url冲突");
                return false;
            } else if (this.project.isPublic == "1" && this.mockapi.url.indexOf(this.project.beginPath) != 0) {
                alert("url必须以" + this.project.beginPath + "为开头！");
                return false;
            }

            var url = API.mockset;
            if (this.editing) {
                url = url + '/' + this.mockapi._id;
            }
            var data = Object.assign({}, this.mockapi);
            data.projectId = this.project._id;
            var self = this;
            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(data)
            }).done(() => {
                $(self.$el).find('._close').click();
            }).always(() => {
                self.loading.post = !self.loading.post;
            })
        }
    }
})

export default MockEdit;
</script>
