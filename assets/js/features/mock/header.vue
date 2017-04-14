<script>
import template from 'templates/features/mock/header.html';

const MockHeader = Vue.extend({
    name: 'mock-header',
    template: template,
    props: ['project']
})

export default MockHeader;
</script>
