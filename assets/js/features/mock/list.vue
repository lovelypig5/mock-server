<script>
import template from "templates/features/mock/list.html";
import MockApi from "./api.vue";
import Edit from "./edit.vue";
import Test from "./test.vue";
import events from "../../events";

const MockList = Vue.extend( {
    name: "mock-list",
    template: template,
    components: {
        mockApi: MockApi,
        mockTest: Test
    },
    props: [ "project", "mockapis", "menus", "loading" ],
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
    created() {
        events.$on( "testApi", this.test );
    },
    beforeDestroy: function() {
        events.$off( "testApi", this.test );
    },
    methods: {
        modal( obj ) {
            this.$store.dispatch( "modal", obj );
        },
        addApi() {
            this.modal( {
                show: true,
                type: "default",
                options: {
                    class: "edit-modal"
                },
                data: {
                    project: this.project,
                    menus: this.menus
                },
                component: Edit
            } );
        },
        test( mockapi ) {
            this.currentApi = mockapi;
        }
    }
} )

export default MockList;
</script>
