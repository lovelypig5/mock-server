<script>
import template from 'templates/features/mock/menu.html';
import events from '../../events';

const MockMenu = Vue.extend({
    name: 'mock-menu',
    template: template,
    props: ['menus'],
    data() {
        return {
            current: "all"
        };
    },
    methods: {
        changeMenu(menu) {
            this.current = menu;
            events.$emit('changeMenu', menu);
        }
    }
})

export default MockMenu;
</script>
