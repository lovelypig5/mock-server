webpackJsonp([1],{"2iTa":function(t,e,o){t.exports=!o("Unp9")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},"3k40":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=o("weH4"),r=o.n(n),i=o("N3ez"),a=o.n(i),c=t.extend({name:"project",template:r.a,props:["project","index"],methods:{modal:function(t){this.$store.dispatch("modal",t)},edit:function(t){this.modal({show:!0,type:"default",options:{},data:{project:this.project,index:this.index},component:a.a})}}});e.default=c}).call(e,o("I3G/"))},"93I4":function(t,e,o){var n=o("uIwA");n(n.S+n.F,"Object",{assign:o("mzS1")})},AXnM:function(t,e,o){var n=o("rIa5");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==n(t)?t.split(""):Object(t)}},COb2:function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},GoCw:function(t,e,o){var n=o("COb2");t.exports=function(t){if(!n(t))throw TypeError(t+" is not an object!");return t}},Htk1:function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},IlWp:function(t,e,o){var n,r={};n=o("WSkn"),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})},IudN:function(t,e,o){var n=o("avsW"),r=o("Ki01");t.exports=Object.keys||function(t){return n(t,r)}},"J/rs":function(t,e,o){var n=o("hDf/"),r=o("lLRj");t.exports=o("2iTa")?function(t,e,o){return n.f(t,e,r(1,o))}:function(t,e,o){return t[e]=o,t}},KJ6L:function(t,e,o){"use strict";(function(t){var o=new t;e.a=o}).call(e,o("I3G/"))},KYD9:function(t,e,o){t.exports=!o("2iTa")&&!o("Unp9")(function(){return 7!=Object.defineProperty(o("obGz")("div"),"a",{get:function(){return 7}}).a})},Ki01:function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},La4w:function(t,e){var o=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=o)},MwMJ:function(t,e,o){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0});var r=o("hA8Y"),i=o.n(r),a=o("oqKF"),c=o.n(a),s=o("oXYe"),u=o.n(s),l=o("k06x"),p=o("KJ6L"),f=t.extend({name:"project-edit",template:u.a,props:["data"],data:function(){return{project:{_id:"",name:"",desc:"",beginPath:"",isPublic:"1",proxy:""},editing:!1,loading:{post:!1,delete:!1}}},mounted:function(){this.data&&(c()(this.project,this.data.project),this.index=this.data.index,this.editing=!0)},methods:{alert:function(t){this.$store.dispatch("alert",t)},save:function(){var t=this;if(""===this.project.name||""===this.project.beginPath||""===this.project.proxy)return t.alert({show:!0,msg:"参数不全",type:"error"}),!1;if(1==this.project.beginPath.isPublic&&0!==this.project.beginPath.indexOf("/"))return t.alert({show:!0,msg:"url前缀必须以/开头",type:"error"}),!1;if(-1!=this.project.beginPath.indexOf("/_system"))return t.alert({show:!0,msg:"url前缀不能以/_system开头，与系统接口冲突，同时下划线命名不规范",type:"error"}),!1;if(!t.loading.post){t.loading.post=!t.loading.post;var e=l.a.project;t.editing&&(e=e+"/"+t.project._id),n.ajax({url:e,type:"post",data:i()(t.project)}).done(function(e){t.editing?p.a.$emit("modifyProject",t.index,t.project):p.a.$emit("addProject",e),n(t.$el).find("._close").click()}).fail(function(e){t.alert({show:!0,msg:e.responseText||"修改项目失败",type:"error"})}).always(function(){t.loading.post=!t.loading.post})}},remove:function(){var t=this;t.loading.delete||(t.loading.delete=!t.loading.delete,confirm("确定删除")&&n.ajax({url:l.a.project+"/"+this.project._id,type:"DELETE"}).fail(function(e){t.alert({show:!0,msg:e.responseText||"删除项目失败",type:"error"})}).done(function(e){p.a.$emit("removeProject",t.index),n(t.$el).find("._close").click()}).always(function(){t.loading.delete=!t.loading.delete}))}}});e.default=f}).call(e,o("I3G/"),o("7t+N"))},N3ez:function(t,e,o){var n,r={};n=o("MwMJ"),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})},NqvB:function(t,e,o){var n,r={};n=o("3k40"),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})},SDDF:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n=o("TZB4"),r=o.n(n),i=t.extend({template:r.a,name:"project-header",computed:{user:function(){return this.$store.state.user}},mounted:function(){this.getUser()},methods:{login:function(t){this.$router.push({path:"/login"})},logout:function(){this.$store.dispatch("logout")},getUser:function(){this.$store.dispatch("user")}}});e.default=i}).call(e,o("I3G/"))},TA2b:function(t,e,o){var n=o("wcQ8"),r=o("oHOM"),i=o("tEJ4");t.exports=function(t){return function(e,o,a){var c,s=n(e),u=r(s.length),l=i(a,u);if(t&&o!=o){for(;u>l;)if((c=s[l++])!=c)return!0}else for(;u>l;l++)if((t||l in s)&&s[l]===o)return t||l||0;return!t&&-1}}},TZB4:function(t,e){t.exports='<nav class="navbar navbar-default navbar-fixed-top"> <div class=container> <div class=navbar-header> <a class=navbar-brand href=#/project>Mock Server</a> </div> <div id=navbar class="collapse navbar-collapse"> <ul class="nav navbar-nav navbar-right"> <li class=active> <a href=/ >Home</a> </li> <li> <a href=https://github.com/vvpvvp/UMock#readme target=_blank>文档</a> </li> <li class=dropdown> <a href=javascript:void(0) @click=login v-if=!user.id>登录</a> <a class=dropdown-toggle data-toggle=dropdown href=# v-if=user.id> <i class="fa fa-user fa-fw"></i> {{user.name}} <i class="fa fa-caret-down"></i> </a> <ul class="dropdown-menu dropdown-user" v-if=user.id> <li> <a href=javascript:void(0) @click=logout> <i class="fa fa-sign-out fa-fw"></i> 注销</a> </li> </ul> </li> </ul> </div> </div> </nav> '},UJ8w:function(t,e){var o=Math.ceil,n=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?n:o)(t)}},UYjw:function(t,e){var o=0,n=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++o+n).toString(36))}},Unp9:function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},Uyhh:function(t,e,o){var n,r={};n=o("SDDF"),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports.default);var i="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;i.computed||(i.computed={}),Object.keys(r).forEach(function(t){var e=r[t];i.computed[t]=function(){return e}})},W5lq:function(t,e,o){var n=o("kg1d");t.exports=function(t,e,o){if(n(t),void 0===e)return t;switch(o){case 1:return function(o){return t.call(e,o)};case 2:return function(o,n){return t.call(e,o,n)};case 3:return function(o,n,r){return t.call(e,o,n,r)}}return function(){return t.apply(e,arguments)}}},WSkn:function(t,e,o){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0});var r=o("gWBi"),i=o.n(r),a=o("Uyhh"),c=o.n(a),s=o("NqvB"),u=o.n(s),l=o("N3ez"),p=o.n(l),f=o("k06x"),d=o("KJ6L"),v=t.extend({name:"project-list",template:i.a,components:{projectHeader:c.a,project:u.a},data:function(){return{projects:[],loading:{fetch:!1}}},created:function(){d.a.$on("removeProject",this.modify),d.a.$on("modifyProject",this.modify),d.a.$on("addProject",this.add)},beforeDestroy:function(){d.a.$off("removeProject",this.modify),d.a.$off("modifyProject",this.modify),d.a.$off("addProject",this.add)},methods:{alert:function(t){this.$store.dispatch("alert",t)},modal:function(t){this.$store.dispatch("modal",t)},fetch:function(){var t=this;t.loading.fetch||(t.loading.fetch=!t.loading.fetch,n.ajax({url:f.a.projectlist}).done(function(e){t.projects=e}).fail(function(e){t.alert({show:!0,msg:e.responseText||"获取mockapi列表失败",type:"error"})}).always(function(){t.loading.fetch=!t.loading.fetch}))},modify:function(t,e){e?this.projects.splice(t,1,e):this.projects.splice(t,1)},add:function(t){this.projects.push(t)},addProject:function(){this.modal({show:!0,type:"default",options:{},component:p.a})}},mounted:function(){this.fetch()}});e.default=v}).call(e,o("I3G/"),o("7t+N"))},XTH8:function(t,e){var o=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=o)},avsW:function(t,e,o){var n=o("b3jA"),r=o("wcQ8"),i=o("TA2b")(!1),a=o("e+Tu")("IE_PROTO");t.exports=function(t,e){var o,c=r(t),s=0,u=[];for(o in c)o!=a&&n(c,o)&&u.push(o);for(;e.length>s;)n(c,o=e[s++])&&(~i(u,o)||u.push(o));return u}},b3jA:function(t,e){var o={}.hasOwnProperty;t.exports=function(t,e){return o.call(t,e)}},dH0W:function(t,e){e.f=Object.getOwnPropertySymbols},dH8t:function(t,e,o){var n=o("La4w"),r=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},"e+Tu":function(t,e,o){var n=o("iIby")("keys"),r=o("UYjw");t.exports=function(t){return n[t]||(n[t]=r(t))}},gWBi:function(t,e){t.exports='<div> <project-header></project-header> <div class="container wrapper"> <div class=page-header> <h3>项目<span class="glyphicon glyphicon-plus newProject" @click=addProject>创建项目</span> </h3> </div> <div class=projectlist> <div v-for="(project, index) in projects" :key=project._id> <project :project=project :index=index></project> </div> </div> <div class=empty v-if="!loading.fetch && projects.length == 0"> <div class=msg>还没有配置api，赶紧配置一个</div> </div> <div v-if=loading.fetch> <div class="loading audio-wave"></div> </div> </div> </div> '},hA8Y:function(t,e,o){t.exports={default:o("dH8t"),__esModule:!0}},"hDf/":function(t,e,o){var n=o("GoCw"),r=o("KYD9"),i=o("hjDZ"),a=Object.defineProperty;e.f=o("2iTa")?Object.defineProperty:function(t,e,o){if(n(t),e=i(e,!0),n(o),r)try{return a(t,e,o)}catch(t){}if("get"in o||"set"in o)throw TypeError("Accessors not supported!");return"value"in o&&(t[e]=o.value),t}},hjDZ:function(t,e,o){var n=o("COb2");t.exports=function(t,e){if(!n(t))return t;var o,r;if(e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;if("function"==typeof(o=t.valueOf)&&!n(r=o.call(t)))return r;if(!e&&"function"==typeof(o=t.toString)&&!n(r=o.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},iIby:function(t,e,o){var n=o("XTH8"),r=n["__core-js_shared__"]||(n["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},kg1d:function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},lLRj:function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},mZhX:function(t,e,o){var n=o("Htk1");t.exports=function(t){return Object(n(t))}},mzS1:function(t,e,o){"use strict";var n=o("IudN"),r=o("dH0W"),i=o("q453"),a=o("mZhX"),c=o("AXnM"),s=Object.assign;t.exports=!s||o("Unp9")(function(){var t={},e={},o=Symbol(),n="abcdefghijklmnopqrst";return t[o]=7,n.split("").forEach(function(t){e[t]=t}),7!=s({},t)[o]||Object.keys(s({},e)).join("")!=n})?function(t,e){for(var o=a(t),s=arguments.length,u=1,l=r.f,p=i.f;s>u;)for(var f,d=c(arguments[u++]),v=l?n(d).concat(l(d)):n(d),h=v.length,m=0;h>m;)p.call(d,f=v[m++])&&(o[f]=d[f]);return o}:s},oHOM:function(t,e,o){var n=o("UJ8w"),r=Math.min;t.exports=function(t){return t>0?r(n(t),9007199254740991):0}},oXYe:function(t,e){t.exports='<div class=modal-content> <div class=modal-header> <button type=button class=close data-dismiss=modal aria-label=Close> <span aria-hidden=true>&times;</span> </button> <h4 class=modal-title id=exampleModalLabel>项目</h4> </div> <div class=modal-body> <div class=form-group> <label for=recipient-name class=control-label>项目名称:</label> <input type=text class=form-control v-model=project.name> </div> <div class=form-group> <label for=recipient-name class=control-label>描述:</label> <input type=text class=form-control v-model=project.desc> </div> <div class=form-group> <label for=recipient-name class=control-label>种类:</label> </div> <div class=form-group> <label class=radio-inline> <input type=radio name=type v-model=project.isPublic value=1> URL前缀 </label> <label class=radio-inline> <input type=radio name=type v-model=project.isPublic value=0> HEAD参数 </label> </div> <div class=form-group> <label for=recipient-name class=control-label>前缀区分/设定HEAD的author参数:</label> <input type=text class=form-control v-model=project.beginPath> </div> <div class=form-group> <label for=recipient-name class=control-label>反向代理地址:</label> <input type=text class=form-control v-model=project.proxy> </div> </div> <div class=modal-footer> <button type=button v-if=editing class="btn btn-danger" id=editButton @click=remove>删除</button> <button type=button class="btn btn-primary" id=editButton @click=save>保存</button> <button type=button class="btn btn-default _close" data-dismiss=modal>关闭</button> </div> </div> '},obGz:function(t,e,o){var n=o("COb2"),r=o("XTH8").document,i=n(r)&&n(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},oqKF:function(t,e,o){t.exports={default:o("xLTH"),__esModule:!0}},q453:function(t,e){e.f={}.propertyIsEnumerable},rIa5:function(t,e){var o={}.toString;t.exports=function(t){return o.call(t).slice(8,-1)}},tEJ4:function(t,e,o){var n=o("UJ8w"),r=Math.max,i=Math.min;t.exports=function(t,e){return t=n(t),t<0?r(t+e,0):i(t,e)}},uIwA:function(t,e,o){var n=o("XTH8"),r=o("La4w"),i=o("W5lq"),a=o("J/rs"),c=function(t,e,o){var s,u,l,p=t&c.F,f=t&c.G,d=t&c.S,v=t&c.P,h=t&c.B,m=t&c.W,b=f?r:r[e]||(r[e]={}),j=b.prototype,y=f?n:d?n[e]:(n[e]||{}).prototype;f&&(o=e);for(s in o)(u=!p&&y&&void 0!==y[s])&&s in b||(l=u?y[s]:o[s],b[s]=f&&"function"!=typeof y[s]?o[s]:h&&u?i(l,n):m&&y[s]==l?function(t){var e=function(e,o,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,o)}return new t(e,o,n)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(l):v&&"function"==typeof l?i(Function.call,l):l,v&&((b.virtual||(b.virtual={}))[s]=l,t&c.R&&j&&!j[s]&&a(j,s,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},wcQ8:function(t,e,o){var n=o("AXnM"),r=o("Htk1");t.exports=function(t){return n(r(t))}},weH4:function(t,e){t.exports='<div :class="[\'alert-gray\',\'alert-success\'][project.isPublic]" role=alert class="project alert"> <h4> <span class=label :class="[\'label-primary\',\'label-success\'][project.isPublic]"> {{project.beginPath}} </span> <router-link :to="{name:\'mockSet\' ,params:{id:project._id}}" class=alert-link> {{project.name}} - {{["HEAD参数","URL前缀"][project.isPublic]}} </router-link> <span class="pointer glyphicon glyphicon-edit" @click=edit(project)></span> </h4> <p>{{project.desc}}</p> </div> '},xLTH:function(t,e,o){o("93I4"),t.exports=o("La4w").Object.assign}});
//# sourceMappingURL=1.9a180cdb8ac70a8c4f83.js.map