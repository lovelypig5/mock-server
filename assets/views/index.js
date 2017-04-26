import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'animate.css';
import 'font-awesome/css/font-awesome.min.css';
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
