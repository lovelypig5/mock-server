webpackJsonp([2],{"RJ+I":function(e,o,a){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),function(e,s,t){var r=a("WA0P"),n=a.n(r),i=a("k06x"),l=a("dV3E"),d=a("lbHh"),c=a.n(d),p="mock.out2man.com";"development"==e.env.NODE_ENV&&(p="localhost");var m=s.extend({store:l.a,template:n.a,name:"login",data:function(){var e=!!c.a.get("rememberMe");return{userName:e?c.a.get("name"):"",password:e?c.a.get("password"):"",rememberMe:e,loading:{login:!1}}},methods:{alert:function(e){this.$store.dispatch("alert",e)},getUser:function(){this.$store.dispatch("user")},doLogin:function(){var e=this;e.loading.login||(e.loading.login=!e.loading.login,t.ajax({url:i.a.login,type:"post",data:JSON.stringify({userName:e.userName,password:e.password})}).done(function(o){if(e.rememberMe){var a={expires:365,domain:p};c.a.set("rememberMe",e.rememberMe,a),c.a.set("name",e.userName,a),c.a.set("password",e.password,a)}else c.a.remove("rememberMe"),c.a.remove("name"),c.a.remove("password");c.a.set("access-token",o.token,{expires:1,domain:p}),t.ajaxSetup({headers:{"Access-Token":o.token}}),e.getUser(),e.$router.push({path:"/project"})}).fail(function(o){e.alert({show:!0,msg:o.responseText||"登录失败",type:"error"})}).always(function(){e.loading.login=!e.loading.login}))}}});o.default=m}.call(o,a("dGDx"),a("I3G/"),a("7t+N"))},WA0P:function(e,o){e.exports='<div class=login-page> <div class=container> <div class=row> <div class="col-md-4 col-md-offset-4"> <div class="login-panel panel panel-default"> <div class=panel-heading> <h3 class=panel-title>请先登录</h3> </div> <div class=panel-body> <fieldset> <div class=form-group> <input type=text class=form-control placeholder=用户名 aria-describedby=userName v-model=userName @keyup.enter=doLogin /> </div> <div class=form-group> <input type=password class=form-control placeholder=密码 aria-describedby=password v-model=password @keyup.enter=doLogin /> </div> <div class=checkbox> <label> <input name=remember type=checkbox v-model=rememberMe>记住我 </label> </div> <a href=javascript:void(0) class="btn btn-lg btn-success btn-block" @click=doLogin> <template v-if=loading.login> 登录中 </template> <template v-if=!loading.login> 登录 </template> </a> </fieldset> </div> </div> </div> </div> </div> </div> '},ux8B:function(e,o,a){var s,t={};s=a("RJ+I"),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;r.computed||(r.computed={}),Object.keys(t).forEach(function(e){var o=t[e];r.computed[e]=function(){return o}})}});
//# sourceMappingURL=2.06207a06a0d39a6095eb.js.map