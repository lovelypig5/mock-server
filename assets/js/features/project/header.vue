<script>
import template from 'templates/features/project/header.html';

const ProjectHeader = Vue.extend({
    template: template,
    name: 'project-header',
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    mounted() {
        this.getUser();
    },
    methods: {
        login(store) {
            this.$router.push({
                path: '/login'
            })
        },
        logout() {
            this.$store.dispatch('logout');
        },
        getUser() {
            this.$store.dispatch('user');
        }
    }
})
export default ProjectHeader;
</script>
