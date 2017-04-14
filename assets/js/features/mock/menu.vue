<script>
import template from 'templates/features/mock/menu.html';

const MockMenu = Vue.extend({
    name: 'mock-menu',
    template: template,
    props: ['project', 'menus'],
    data() {
        return {
            current: "all"
        };
    }
})

export default MockMenu;
</script>
