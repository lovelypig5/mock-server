const actions = {
    modal(context, obj) {
        context.commit('MODAL', obj);
    },
    alert(context, obj) {
        context.commit('ALERT', obj);
    },
    user(context) {
        context.commit('USER');
    },
    changeLocale(context, lang) {
        context.commit('LOCALE');
    },
    logout(context) {
        context.commit('LOGOUT');
    },
    isLogin(context) {
        context.commit('ISLOGIN');
    }
};
export default actions;
