<script>
import template from 'templates/features/mock/list.html';
import MockApi from './api.vue';
import Edit from './edit.vue';
import Test from './test.vue';
import events from '../../events';

const MockList = Vue.extend({
    name: 'mock-list',
    template: template,
    components: {
        mockApi: MockApi,
        mockTest: Test
    },
    props: ['data'],
    data() {
        return {
            currentApi: {
                num: 0,
                _id: "",
                url: "",
                desc: "",
                result: "",
                respParam: "",
                dataHandler: "",
                param: "",
                type: "测试",
                active: true,
                postParam: "",
                headers: ""
            }
        };
    },
    computed: {
        project() {
            return this.data.project;
        },
        mockapis() {
            return this.data.mockapis;
        },
        menus() {
            return this.data.menus;
        }
    },
    created() {
        events.$on('testApi', this.testApi);
        events.$on('removeApi', this.modify);
        events.$on('modifyApi', this.modify);
        events.$on('addApi', this.addApi);
    },
    beforeDestroy: function() {
        events.$off('testApi', this.testApi);
        events.$off('removeApi', this.modify);
        events.$off('modifyApi', this.modify);
        events.$off('addApi', this.addApi);
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
        },
        testApi(mockapi) {
            this.currentApi = mockapi;
        },
        modify(index, mockapi) {
            if (mockapi) {
                this.mockapis.splice(index, 1, mockapi);
            } else {
                this.mockapis.splice(index, 1);
            }
        },
        addApi(mockapi) {
            this.mockapis.push(mockapi);
        }
    }
})

export default MockList;
</script>
