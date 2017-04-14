<script>
import template from 'templates/features/mock/api.html';
import API from 'config/api';
import Edit from './edit.vue';

var MockApi = Vue.extend({
    name: 'mock-api',
    template: template,
    props: ['mockapi', 'menus', 'project'],
    data() {
        return {
            loading: {
                active: false
            }
        }
    },
    methods: {
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        changeStatus() {
            if (this.loading.active) {
                return;
            }
            var self = this;
            this.loading.active = !this.loading.active;
            $.ajax({
                url: API.mockset + '/' + this.mockapi._id,
                type: 'post',
                data: JSON.stringify({
                    _id: this.mockapi._id,
                    active: !this.mockapi.active
                })
            }).done(() => {
                self.mockapi.active = !self.mockapi.active;
            }).always(() => {
                self.loading.active = !self.loading.active;
            })
        },
        remove() {
            var self = this;
            if (!confirm("确定删除")) return;
            $.ajax({
                url: API.mockset + '/' + this.mockapi._id,
                type: "delete"
            }).done((result) => {
                // self.deleteById(mockset._id);
                // initMenu(self);
            });
        },
        edit() {
            this.modal({
                show: true,
                type: 'default',
                options: {
                    class: 'edit-modal'
                },
                data: {
                    mockapi: this.mockapi,
                    menus: this.menus,
                    project: this.project
                },
                component: Edit
            })
        }
    }
})

export default MockApi;
</script>
