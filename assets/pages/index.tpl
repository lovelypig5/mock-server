<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Mock Server</title>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="keywords" content="mock-server development">
        <meta name="author" content="out2man"/>
        <meta name="application-name" content="mock-server"/>
        <meta name="description" content="">
        <%=htmlWebpackPlugin.files.webpackManifest%>

        <link rel="shortcut icon" href="favicon.ico"/>
    </head>
    <body>
        <div class="preloader">
            <div class="sk-spinner sk-spinner-rotating-plane"></div>
        </div>
        <nav class="navbar navbar-default navbar-fixed-top mock-nav" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="icon icon-bar"></span>
                        <span class="icon icon-bar"></span>
                        <span class="icon icon-bar"></span>
                    </button>
                    <a href="#" class="navbar-brand">Mock Server</a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right text-uppercase">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#feature">Features</a>
                        </li>
                        <!-- <li>
                            <a href="#pricing">Pricing</a>
                        </li> -->
                        <li>
                            <a href="#try">Try</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                        <li>
                            <button class="btn btn-warning start">Get Start</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section id="home">
            <div class="overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-10 wow fadeIn" data-wow-delay="0.3s">
                            <h1 class="text-upper">Introduction</h1>
                            <p class="tm-white">Mock Server is an api mock server for frontend developers or testers to work on real apis. It can override or intercept apis and return specified data result.
                            </p>
                            <img src="/images/software-img.png" class="img-responsive" alt="home img">
                        </div>
                        <div class="col-md-1"></div>
                    </div>
                </div>
            </div>
        </section>
        <section id="divider">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 wow fadeInUp mock-box" data-wow-delay="0.3s">
                        <i class="fa fa-laptop"></i>
                        <h3 class="text-uppercase">RESPONSIVE LAYOUT</h3>
                        <p>Mock Server is supported in most mobile, pc and tablet.
                        </p>
                    </div>
                    <div class="col-md-4 wow fadeInUp mock-box" data-wow-delay="0.3s">
                        <i class="fa fa-support"></i>
                        <h3 class="text-uppercase">MOCKJS</h3>
                        <p>Data mock feature is supported by
                            <a href="http://mockjs.com" target="_blank">mockjs</a>. Mock.js is a simulation data generator to help the front-end to develop and prototype separate from the back-end progress and reduce some monotony particularly while writing automated tests.
                        </p>
                    </div>
                    <div class="col-md-4 wow fadeInUp mock-box" data-wow-delay="0.3s">
                        <i class="fa fa-server"></i>
                        <h3 class="text-uppercase">Aliyun</h3>
                        <p>Mock Server is deployed on Aliyun, so can be always available
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <section id="feature">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 wow fadeInLeft" data-wow-delay="0.6s">
                        <h2 class="text-uppercase">Set up mock api</h2>
                        <p>Apis can be configured by
                        </p>
                        <p>
                            <span>
                                <i class="fa fa-mobile"></i>
                            </span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>
                            <i class="fa fa-code"></i>Quis autem velis reprehenderit et quis voluptate velit esse quam.</p>
                    </div>
                    <div class="col-md-6 wow fadeInRight" data-wow-delay="0.6s">
                        <img src="/images/software-img.png" class="img-responsive" alt="feature img">
                    </div>
                </div>
            </div>
        </section>
        <!-- <section id="feature1">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <img src="/images/software-img.png" class="img-responsive" alt="feature img">
                    </div>
                    <div class="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                        <h2 class="text-uppercase">More of Your Software</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>
                            <span>
                                <i class="fa fa-mobile"></i>
                            </span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>
                            <i class="fa fa-code"></i>Quis autem velis reprehenderit et quis voluptate velit esse quam.</p>
                    </div>
                </div>
            </div>
        </section> -->
        <!-- <section id="pricing">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 wow bounceIn">
                        <h2 class="text-uppercase">Our Pricing</h2>
                    </div>
                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.6s">
                        <div class="pricing text-uppercase">
                            <div class="pricing-title">
                                <h4>Basic Plan</h4>
                                <p>$10</p>
                                <small class="text-lowercase">monthly</small>
                            </div>
                            <ul>
                                <li>2 GB Space</li>
                                <li>200 GB Bandwidth</li>
                                <li>20 More Themes</li>
                                <li>Lifetime Support</li>
                            </ul>
                            <button class="btn btn-primary text-uppercase">Sign up</button>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.6s">
                        <div class="pricing active text-uppercase">
                            <div class="pricing-title">
                                <h4>Business Plan</h4>
                                <p>$20</p>
                                <small class="text-lowercase">monthly</small>
                            </div>
                            <ul>
                                <li>5 GB space</li>
                                <li>500 GB Bandwidth</li>
                                <li>50 More Themes</li>
                                <li>Lifetime Support</li>
                            </ul>
                            <button class="btn btn-primary text-uppercase">Sign up</button>
                        </div>
                    </div>
                    <div class="col-md-4 wow fadeIn" data-wow-delay="0.6s">
                        <div class="pricing text-uppercase">
                            <div class="pricing-title">
                                <h4>Pro Plan</h4>
                                <p>$30</p>
                                <small class="text-lowercase">monthly</small>
                            </div>
                            <ul>
                                <li>10 GB space</li>
                                <li>1,000 GB bandwidth</li>
                                <li>100 more themes</li>
                                <li>Lifetime Support</li>
                            </ul>
                            <button class="btn btn-primary text-uppercase">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->
        <section id="try">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 wow fadeInLeft" data-wow-delay="0.6s">
                        <h2 class="text-uppercase">Have a Try</h2>
                        <p>Try to register and create your first mock api
                        </p>
                        <button class="btn btn-primary text-uppercase">
                            <i class="fa fa-try"></i>
                            Try</button>
                    </div>
                    <div class="col-md-6 wow fadeInRight" data-wow-delay="0.6s">
                        <img src="/images/software-img.png" class="img-responsive" alt="feature img">
                    </div>
                </div>
            </div>
        </section>
        <section id="contact">
            <div class="overlay">
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                            <h2 class="text-uppercase">Contact Us</h2>
                            <p>If you have any problems, please feel free to contact us.
                            </p>
                            <address>
                                <p>
                                    <i class="fa fa-map-marker"></i>Building 29, No.2 street and 25th street intersection, Hangzhou, ZheJiang, China</p>
                                <p>
                                    <i class="fa fa-phone"></i>
                                    86 185 0169 4249</p>
                                <p>
                                    <i class="fa fa-envelope-o"></i>
                                    lovelypig5@163.com</p>
                            </address>
                        </div>
                        <div class="col-md-6 wow fadeInUp" data-wow-delay="0.6s">
                            <div class="contact-form">
                                <form action="#" method="post">
                                    <div class="col-md-6">
                                        <input type="text" class="form-control" placeholder="Name">
                                    </div>
                                    <div class="col-md-6">
                                        <input type="email" class="form-control" placeholder="Email">
                                    </div>
                                    <div class="col-md-12">
                                        <input type="text" class="form-control" placeholder="Subject">
                                    </div>
                                    <div class="col-md-12">
                                        <textarea class="form-control" placeholder="Message" rows="4"></textarea>
                                    </div>
                                    <div class="col-md-8">
                                        <input type="submit" class="form-control text-uppercase" value="Send">
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div class="container">
                <div class="row">
                    <p>Copyright © 2016 - 2017
                        <a href="http://www.out2man.com" target="_blank">Out2man</a>
                        All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
        <script src="https://cdn.bootcss.com/wow/1.1.2/wow.min.js"></script>
    </body>
</html>
