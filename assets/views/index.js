import 'bootstrap';
import 'less/index.less';

$(window).load(() => {
    $('.preloader').fadeOut(1000); // set duration in brackets
}).error((err) => {
    //TODO show error page
});

new WOW().init();
$('.navbar-collapse a').click(() => {
    $(".navbar-collapse").collapse('hide');
});
