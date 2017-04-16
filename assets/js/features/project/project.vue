<script>
import template from 'templates/features/project/project.html';
import Edit from './edit.vue';

const Project = Vue.extend({
    name: 'project',
    template: template,
    props: ['project', 'index'],
    methods: {
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        edit(project) {
            this.modal({
                show: true,
                type: 'default',
                options: {},
                data: {
                    project: this.project,
                    index: this.index
                },
                component: Edit
            })
        }
    }
});

export default Project;
</script>
