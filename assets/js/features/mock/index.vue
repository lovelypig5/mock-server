<script>
import template from "templates/features/mock/index.html";
import API from "config/api";
import Header from "./header.vue";
import Menu from "./menu.vue";
import List from "./list.vue";
import events from "../../events";

const MockView = Vue.extend( {
    name: "mock-view",
    template: template,
    components: {
        mockHeader: Header,
        mockMenu: Menu,
        mockList: List
    },
    data() {
        return {
            project: {},
            mockapis: [],
            loading: {
                project: false,
                mockapis: false
            },
            filterMenu: ""
        }
    },
    created() {
        events.$on( "removeApi", this.modify );
        events.$on( "modifyApi", this.modify );
        events.$on( "addApi", this.add );
        events.$on( "changeMenu", this.changeMenu );
    },
    beforeDestroy() {
        events.$off( "removeApi", this.modify );
        events.$off( "modifyApi", this.modify );
        events.$off( "addApi", this.add );
        events.$off( "changeMenu", this.changeMenu );
    },
    mounted() {
        this.fetch();
        this.fetchMockApis();
    },
    computed: {
        menus() {
            return [ ... new Set( this.mockapis.map( ( item ) => {
                return item.menuId;
            } ) ) ]
        },
        filterdApis() {
            if ( this.filterMenu === "" ) {
                return this.mockapis;
            } else {
                return this.mockapis.filter( ( api ) => {
                    return api.menuId === this.filterMenu;
                } );
            }
        }
    },
    methods: {
        alert( obj ) {
            this.$store.dispatch( "alert", obj );
        },
        fetch() {
            var self = this;
            if ( self.loading.project ) {
                return;
            }
            self.loading.project = !self.loading.project;
            $.ajax( {
                url: API.project + "/" + self.$route.params.id
            } ).done( ( result ) => {
                self.project = result[ 0 ];
            } ).fail( ( resp ) => {
                self.alert( {
                    show: true,
                    msg: resp.responseText || "获取项目列表失败",
                    type: "error"
                } )
            } ).always( () => {
                self.loading.project = !self.loading.project;
            } )
        },
        fetchMockApis() {
            var self = this;
            if ( self.loading.mockapis ) {
                return;
            }
            self.loading.mockapis = !self.loading.mockapis;
            $.ajax( {
                url: API.mocklist + "/" + self.$route.params.id
            } ).done( function( result ) {
                self.mockapis = result;
            } ).fail( ( resp ) => {
                self.alert( {
                    show: true,
                    msg: resp.responseText || "获取接口列表失败",
                    type: "error"
                } )
            } ).always( () => {
                self.loading.mockapis = !self.loading.mockapis;
            } );
        },
        changeMenu( menu ) {
            this.filterMenu = menu;
        },
        modify( index, mockapi ) {
            if ( mockapi ) {
                this.mockapis.splice( index, 1, mockapi );
            } else {
                this.mockapis.splice( index, 1 );
            }
        },
        add( mockapi ) {
            this.mockapis.push( mockapi );
        }
    }
} )

export default MockView;
</script>
