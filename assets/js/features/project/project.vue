<script>
import template from 'templates/features/project/index.html';
import Edit from './edit.vue';

const Project = Vue.extend({
    name: 'project',
    template: template,
    props: ['project'],
    data() {
        return {};
    },
    methods: {
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        edit(project) {
            this.modal({
                show: true,
                type: 'default',
                options: {},
                data: this.project,
                component: Edit
            })
        }
    }
});

export default Project;
</script>
