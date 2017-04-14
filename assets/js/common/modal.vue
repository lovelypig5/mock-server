<script>
import template from 'templates/common/modal.html';

var Modal = Vue.extend({
    props: ['modal'],
    template: template,
    mounted() {
        var self = this;
        $(self.$el).on('hidden.bs.modal', (e) => {
            self.hide();
        }).on('show.bs.modal', () => {
            setTimeout(() => {
                var $modal_dialog = $(self.$el).find('.modal-dialog');
                $(self.$el).css('display', 'block');
                $modal_dialog.css({
                    'margin-top': Math.max(0, ($(window).height() - $modal_dialog.height()) / 2)
                });
                if (self.modal.options.class) {
                    $modal_dialog.addClass(self.modal.options.class);
                }
            }, 100);
        });
    },
    methods: {
        hide() {
            this.$store.dispatch('modal', {
                show: false,
                type: 'default',
                options: {},
                component: ''
            })
        }
    },
    watch: {
        modal(val, oldVal) {
            if (!oldVal.show && val.show) {
                $(this.$el).modal(this.modal.options || {});
            }
        }
    }
})

export default Modal;
</script>
