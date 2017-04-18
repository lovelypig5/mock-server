<script>
import template from 'templates/features/mock/api.html';
import API from 'config/api';
import Edit from './edit.vue';
import events from '../../events';

var MockApi = Vue.extend({
    name: 'mock-api',
    template: template,
    props: ['data'],
    data() {
        return {
            loading: {
                active: false,
                delete: false,
                api: false
            }
        }
    },
    computed: {
        project() {
            return this.data.project;
        },
        mockapi() {
            return this.data.mockapi;
        },
        menus() {
            return this.data.menus;
        },
        index() {
            return this.data.index;
        }
    },
    methods: {
        alert(obj) {
            this.$store.dispatch('alert', obj);
        },
        test() {
            events.$emit('testApi', this.mockapi);
        },
        modal(obj) {
            this.$store.dispatch('modal', obj);
        },
        changeStatus() {
            var self = this;
            if (self.loading.active) {
                return;
            }
            self.loading.active = !self.loading.active;
            $.ajax({
                url: API.mockapi + '/' + self.mockapi._id,
                type: 'post',
                data: JSON.stringify(Object.assign({}, self.mockapi, {
                    active: !self.mockapi.active
                }))
            }).done(() => {
                self.mockapi.active = !self.mockapi.active;
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '修改接口状态失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.active = !self.loading.active;
            })
        },
        remove() {
            var self = this;
            if (self.loading.delete) {
                return;
            }
            self.loading.delete = !self.loading.delete;

            if (!confirm("确定删除")) {
                return;
            }
            $.ajax({
                url: API.mockapi + '/' + self.mockapi._id,
                type: "delete"
            }).done((result) => {
                events.$emit('removeApi', self.index);
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '删除接口失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.delete = !self.loading.delete;
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
                    project: this.project,
                    index: this.index
                },
                component: Edit
            })
        },
        togglePane() {
            $(this.$el).find('.mocksetContent').slideToggle();
            if (!this.mockapi.result) {
                this.fetch();
            }
        },
        fetch() {
            var self = this;
            if (self.loading.api) {
                return;
            }
            self.loading.api = !self.loading.api;
            $.ajax({
                url: API.mockapi + '/' + this.mockapi._id
            }).done(function(result) {
                events.$emit('modifyApi', self.index, result[0]);
            }).fail((resp) => {
                self.alert({
                    show: true,
                    msg: resp.responseText || '获取接口列表失败',
                    type: 'error'
                })
            }).always(() => {
                self.loading.api = !self.loading.api;
            })
        }
    }
})

export default MockApi;
</script>
