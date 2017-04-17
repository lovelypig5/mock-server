<script>
import template from 'templates/features/project/edit.html';
import API from 'config/api';
import events from '../../events';

const ProjectEdit = Vue.extend({
    name: 'project-edit',
    template: template,
    props: ['data'],
    data() {
        return {
            project: {
                _id: "",
                name: "",
                desc: "",
                beginPath: "",
                isPublic: "1",
                proxy: ""
            },
            editing: false,
            loading: {
                post: false,
                delete: false
            }
        }
    },
    mounted() {
        if (this.data) {
            Object.assign(this.project, this.data.project);
            this.index = this.data.index;

            this.editing = true;
        }
    },
    methods: {
        alert(obj) {
            this.$store.dispatch('alert', obj);
        },
        save() {
            if (this.project.name === "" || this.project.beginPath === "" || this.project.proxy === "") {
                self.alert({
                    show: true,
                    msg: '参数不全',
                    type: 'error'
                })
                return false;
            } else if (this.project.beginPath.isPublic == 1 && this.project.beginPath.indexOf("\/") !== 0) {
                self.alert({
                    show: true,
                    msg: 'url前缀必须以/开头',
                    type: 'error'
                })
                return false;
            } else if (this.project.beginPath.indexOf("/_system") != -1) {
                self.alert({
                    show: true,
                    msg: 'url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范',
                    type: 'error'
                })
                return false;
            }

            var self = this;
            if (self.loading.post) {
                return;
            }
            self.loading.post = !self.loading.post;

            let url = API.project;
            if (self.editing) {
                url = url + '/' + self.project._id;
            }
            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(self.project)
            }).done((result) => {
                if (self.editing) {
                    events.$emit('modifyProject', self.index, self.project);
                } else {
                    events.$emit('addProject', result);
                }

                $(self.$el).find('._close').click();
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '修改项目失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.post = !self.loading.post;
            })
        },
        remove() {
            var self = this;
            if (self.loading.delete) {
                return;
            }
            self.loading.delete = !self.loading.delete;
            if (!confirm("确定删除")) {
                return;
            }
            $.ajax({
                url: API.project + "/" + this.project._id,
                type: "DELETE"
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '删除项目失败',
                    type: 'error'
                })
            }).done((result) => {
                events.$emit('removeProject', self.index);
                $(self.$el).find('._close').click();
            }).always(() => {
                self.loading.delete = !self.loading.delete;
            })
        }
    }
})

export default ProjectEdit;
</script>
