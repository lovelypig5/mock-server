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
                post: false
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
        save() {
            if (this.project.name === "" || this.project.beginPath === "" || this.project.proxy === "") {
                alert("参数不全");
                return false;
            } else if (this.project.beginPath.isPublic == 1 && this.project.beginPath.indexOf("\/") !== 0) {
                alert("url必须以/开头");
                return false;
            } else if (this.project.beginPath.indexOf("/umock") != -1) {
                alert("url不能以/umock开头，与现在的url冲突");
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
                    events.$emit('addProject', self.project);
                }

                $(self.$el).find('._close').click();
            }).always(() => {
                self.loading.post = !self.loading.post;
            })
        },
        remove() {
            var self = this;
            if (!confirm("确定删除")) {
                return;
            }
            $.ajax({
                url: API.project + "/" + this.project._id,
                type: "DELETE"
            }).done((result) => {
                events.$emit('removeProject', self.index);
                $(self.$el).find('._close').click();
            })
        }
    }
})

export default ProjectEdit;
</script>
