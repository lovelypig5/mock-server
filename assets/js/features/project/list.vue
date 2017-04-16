<script>
import template from 'templates/features/project/list.html';
import Header from './header.vue';
import Project from './project.vue';
import Edit from './edit.vue';
import API from 'config/api';
import events from '../../events';

const ProjectList = Vue.extend({
    name: 'project-list',
    template: template,
    components: {
        projectHeader: Header,
        project: Project
    },
    data() {
        return {
            projects: [],
            loading: {
                fetch: false
            }
        };
    },
    created() {
        events.$on('removeProject', this.modify);
        events.$on('modifyProject', this.modify);
        events.$on('addProject', this.add);
    },
    beforeDestroy: function() {
        events.$off('removeProject', this.modify);
        events.$off('modifyProject', this.modify);
        events.$off('addProject', this.add);
    },
    methods: {
        alert(obj) {
            this.$store.dispatch('alert', obj);
        },
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        fetch() {
            var self = this;
            if (self.loading.fetch) {
                return;
            }
            self.loading.fetch = !self.loading.fetch;

            $.ajax({
                url: API.projectlist
            }).done((result) => {
                self.projects = result;
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: '拉取商品列表失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.fetch = !self.loading.fetch;
            })
        },
        modify(index, project) {
            if (project) {
                this.projects.splice(index, 1, project);
            } else {
                this.projects.splice(index, 1);
            }
        },
        add(project) {
            this.projects.push(project);
        },
        addProject() {
            this.modal({
                show: true,
                type: 'default',
                options: {},
                component: Edit
            })
        }
    },
    mounted() {
        this.fetch();
    }
});

export default ProjectList;
</script>
