<script>
import template from 'templates/features/project/list.html';
import ProjectHeader from './header.vue';
import Project from './project.vue';
import API from 'config/api';
import {
    mapState
} from 'vuex';

const ProjectList = Vue.extend({
    name: 'project-list',
    template: template,
    components: {
        projectHeader: ProjectHeader,
        project: Project
    },
    data() {
        return {
            projectStart: "/api/",
            projects: [],
            loading: {
                fetch: false
            }
        };
    },
    computed: mapState({
        projectlist: state => state.control.projectlist
    }),
    methods: {
        alert(obj) {
            this.$store.dispatch('alert', obj);
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
        }
    },
    mounted() {
        this.fetch();
    },
    watch: {
        projectlist() {
            this.fetch();
        }
    }
});

export default ProjectList;
</script>
