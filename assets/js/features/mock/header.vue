<script>
import template from "templates/features/mock/header.html";

const MockHeader = Vue.extend( {
    name: "mock-header",
    template: template,
    props: [ "project" ],
    mounted() {
        this.getUser();
    },
    methods: {
        getUser() {
            this.$store.dispatch( "user" );
        }
    }
} )

export default MockHeader;
</script>
