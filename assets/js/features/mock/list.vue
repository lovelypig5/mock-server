<script>
import template from 'templates/features/mock/list.html';
import MockApi from './api.vue';
import Edit from './edit.vue';

const MockList = Vue.extend({
    name: 'mock-list',
    template: template,
    components: {
        mockApi: MockApi
    },
    props: ['project', 'menus', 'mockapis'],
    data() {
        return {};
    },
    methods: {
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        add() {
            this.modal({
                show: true,
                type: 'default',
                options: {
                    class: 'edit-modal'
                },
                data: {
                    project: this.project
                },
                component: Edit
            });
        }
    }
})

export default MockList;
</script>
