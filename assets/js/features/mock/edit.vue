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
                respParam: "",
                dataHandler: "over",
                param: "{}",
                type: "",
                active: true
            },
            editing: false,
            loading: {
                post: false,
                api: false
            }
        }
    },
    computed: {
        menus() {
            return Object.assign([], this.data.menus);
        },
        project() {
            return Object.assign({}, this.data.project);
        }
    },
    mounted() {
        if (this.data.mockapi) {
            Object.assign(this.mockapi, this.data.mockapi);
            this.index = this.data.index;
            this.editing = true;

            if (!this.mockapi.result) {
                this.fetch();
            }
        } else {
            this.mockapi.result = "{}";
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
        this.editor.set(JSON.parse(this.mockapi.result));
        this.paramEditor = new JSONEditor(paramContainer, options, {});
        this.paramEditor.set(JSON.parse(this.mockapi.param));
    },
    methods: {
        alert(obj) {
            this.$store.dispatch('alert', obj);
        },
        fetch() {
            var self = this;
            if (self.loading.api) {
                return;
            }
            self.loading.api = !self.loading.api;
            $.ajax({
                url: API.mockapi + '/' + this.mockapi._id
            }).done((result) => {
                this.mockapi = result[0];
                events.$emit('modifyApi', self.index, result[0]);
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '获取接口列表失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.api = !self.loading.api;
            })
        },
        save() {
            var self = this;
            if (self.loading.post) {
                return
            }
            self.mockapi.result = JSON.stringify(self.editor.get(), null, 2);
            self.mockapi.param = JSON.stringify(self.paramEditor.get(), null, 2)

            if (self.mockapi.url === "" || self.mockapi.result === "" || self.mockapi.type === "") {
                self.alert({
                    show: true,
                    msg: '参数不全',
                    type: 'error'
                })
                return false;
            } else if (self.mockapi.url.indexOf("\/") !== 0) {
                self.alert({
                    show: true,
                    msg: 'url前缀必须以/开头',
                    type: 'error'
                })
                return false;
            } else if (self.mockapi.url.indexOf("/_system") != -1) {
                self.alert({
                    show: true,
                    msg: 'url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范',
                    type: 'error'
                })
                return false;
            } else if (self.project.isPublic == "1" && self.mockapi.url.indexOf(self.project.beginPath) != 0) {
                self.alert({
                    show: true,
                    msg: "url必须以" + self.project.beginPath + "为开头！",
                    type: 'error'
                })
                return false;
            }

            self.loading.post = !self.loading.post;
            var url = API.mockapi;
            var data = Object.assign({}, self.mockapi);
            if (self.editing) {
                url = url + '/' + self.mockapi._id;
            } else {
                data.projectId = self.project._id;
            }

            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(data)
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '修改接口失败',
                    type: 'error'
                })
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
    },
    watch: {
        mockapi() {
            this.editor.set(JSON.parse(this.mockapi.result));
        }
    }
})

export default MockEdit;
</script>
