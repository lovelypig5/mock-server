<script>
import template from 'templates/features/mock/edit.html';
import API from 'config/api';
import JSONEditor from 'jsoneditor';
import events from '../../events';

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
            this.index = this.data.index;

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
            var self = this;
            if (self.loading.post) {
                return
            }
            self.loading.post = !self.loading.post;
            self.mockapi.result = JSON.stringify(self.editor.get(), null, 2);
            self.mockapi.param = JSON.stringify(self.paramEditor.get(), null, 2)
            if (self.mockapi.url === "" || self.mockapi.result === "" || self.mockapi.type === "") {
                alert("参数不全");
                return false;
            } else if (self.mockapi.url.indexOf("\/") !== 0) {
                alert("url必须以/开头");
                return false;
            } else if (self.mockapi.url.indexOf("/umock") != -1) {
                alert("url不能以/umock开头，与现在的url冲突");
                return false;
            } else if (self.project.isPublic == "1" && self.mockapi.url.indexOf(self.project.beginPath) != 0) {
                alert("url必须以" + self.project.beginPath + "为开头！");
                return false;
            }

            var url = API.mockset;
            if (self.editing) {
                url = url + '/' + self.mockapi._id;
            }
            var data = Object.assign({}, self.mockapi);
            data.projectId = self.project._id;

            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(data)
            }).done((result) => {
                if (self.editing) {
                    events.$emit('modifyApi', self.index, self.mockapi);
                } else {
                    events.$emit('addApi', result);
                }
                $(self.$el).find('._close').click();
            }).always(() => {
                self.loading.post = !self.loading.post;
            })
        }
    }
})

export default MockEdit;
</script>
