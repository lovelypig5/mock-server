<script>
import template from 'templates/features/mock/index.html';
import API from 'config/api';
import Header from './header.vue';
import Menu from './menu.vue';
import List from './list.vue';

const Mock = Vue.extend({
    name: 'mock-view',
    template: template,
    components: {
        mockHeader: Header,
        mockMenu: Menu,
        mockList: List
    },
    data() {
        return {
            project: {},
            mockapis: []
        }
    },
    mounted() {
        this.fetch();
    },
    computed: {
        menus() {
            return [...new Set(this.mockapis.map((item) => {
                return item.menuId;
            }))]
        },
        mockset() {
            return this.$store.state.control.mockset;
        }
    },
    methods: {
        fetch() {
            var self = this;
            $.ajax({
                url: API.project + '/' + this.$route.params.id
            }).done((result) => {
                self.project = result[0];
                window.document.title = self.project.name;
                self.fetchMockApis();
            })
        },
        fetchMockApis() {
            var self = this;
            $.ajax({
                url: API.mocklist + '/' + this.project._id
            }).done(function(result) {
                self.mockapis = result;
            });
        },
        togglePane(event) {
            var bar = $(event.target);
            if (bar.hasClass("mocksetHeader"))
                bar.next().slideToggle();
            else if (bar.parent().hasClass("mocksetHeader"))
                bar.parent().next().slideToggle();
        },
        deleteMockset(mockset) {
            var vm = this;
            if (!confirm("确定删除")) return;
            $.ajax({
                    url: "/umock/mockset/" + mockset._id,
                    type: "delete"
                })
                .done((result) => {
                    vm.deleteById(mockset._id);
                    initMenu(vm);
                });
        },
        testMock(mockset) {
            this.$broadcast('testMock', mockset);
        },
        deleteById(_id) {
            let vm = this;
            vm.mocksets.forEach((n, i) => {
                if (n._id == _id) {
                    vm.mocksets.splice(i, 1);
                    return false;
                }
            });
        }
    },
    watch: {
        mockset() {
            this.fetchMockApis();
        }
    },
    events: {
        changeMenu(menu) {
            this.filterMenu = menu;
        },
        reInitMenu() {
            initMenu(this);
        },
        testMock: function(mockset) {
            this.$refs.test.$emit("testMock", mockset);
        }
    }

})

export default Mock;
</script>
