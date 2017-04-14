<template>
<div id="mockMenu">
    <h4>目录</h4>
    <ul class="nav nav-stacked">
        <li :class='[nowMenu=="all"?"open":""]'>
            <router-link to='{path: "/" +$route.params.id + "/all" }'>全部</router-link>
        </li>
        <li v-for="menu in menus" :class='[menu==nowMenu? "open": ""]'>
            <router-link to='{path: "/" +$route.params.id + "/" +menu}'>{{menu}}</router-link>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    props: ['mocksets', "nowProject"],
    data() {
        return {
            nowMenu: "",
            menus: []
        };
    },
    ready() {
        this.nowMenu = this.$route.params.menu || "all";
    },
    methods: {
        changeMenu1: function(menu) {
            this.nowMenu = menu;
            if (menu == "all") menu = "";
            this.$dispatch("changeMenu", menu);
        }
    },
    events: {
        menuInit(menu) {
            this.menus = menu;
        },
        changeMenuBy(menu) {
            this.changeMenu1(menu);
        }
    }
}
</script>
