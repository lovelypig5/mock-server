<script>
import template from 'templates/features/project/header.html';
import Edit from './edit.vue';

const ProjectHeader = Vue.extend({
    template: template,
    name: 'project-header',
    methods: {
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        createProject() {
            this.modal({
                show: true,
                type: 'default',
                options: {},
                component: Edit
            })
        }
    }
})
export default ProjectHeader;
</script>
