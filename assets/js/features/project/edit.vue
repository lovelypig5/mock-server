<script>
import template from 'templates/features/project/edit.html';
import API from 'config/api';

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
            Object.assign(this.project, this.data);
            this.editing = true;
        }
    },
    methods: {
        control(key) {
            this.$store.dispatch('control', key);
        },
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
            if (this.loading.post) {
                return;
            }
            this.loading.post = !this.loading.post;

            let url = API.project;
            if (this.editing) {
                url = url + '/' + this.project._id;
            }

            $.ajax({
                url: url,
                type: 'post',
                data: JSON.stringify(this.project)
            }).done((result) => {
                self.control('projectlist');
                $(self.$el).find('._close').click();
            }).always(() => {
                self.loading.post = !self.loading.post;
            })
        },
        remove() {
            var self = this;
            if (!confirm("确定删除")) return;
            $.ajax({
                url: API.project + "/" + this.project._id,
                type: "DELETE"
            }).done((result) => {
                self.control('projectlist');
                $(self.$el).find('._close').click();
            })
        }
    }
})

export default ProjectEdit;
</script>
