<script>
import template from 'templates/features/mockSet.html';
import mockEdit from './mockEdit.vue';
import mockTest from './mockTest.vue';
import mockMenu from './mockMenu.vue';


let getURLParam = function(name, search) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(search || location.search) || [true, ""])[1].replace(/\+/g, '%20')) || null;
};

function initMenu(M) {
    M.menus = [...new Set(
        M.mocksets.map((item) => {
            return item.menuId;
        })
    )];
    M.$broadcast("menuInit", M.menus);
}

var mockSet = Vue.extend({
    name: 'mockSet',
    template: template,
    data() {
        return {
            id: 0,
            nowProject: {},
            // projectStart:"/api/",
            mocksets: [],
            filterMenu: "",
            menus: []
        };
    },
    components: {
        mockEdit,
        mockTest,
        mockMenu
    },
    mounted() {

    },
    methods: {
        togglePane(event) {
            var bar = $(event.target);
            if (bar.hasClass("mocksetHeader"))
                bar.next().slideToggle();
            else if (bar.parent().hasClass("mocksetHeader"))
                bar.parent().next().slideToggle();
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

export default mockSet;
</script>
