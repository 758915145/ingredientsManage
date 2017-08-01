import Vue from 'vue'
import App from './App.vue'
Vue.prototype._ = window._ = require('lodash');
Vue.prototype.window = window;

//common中的所有JS
(r => {
    r.keys().forEach(r);
})(require.context('./common/', true, /\.js/));

//Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

//路由
import Router from 'vue-router'
Vue.use(Router)
let router = new Router({
    mode: 'hash',
    routes: (r => {
        let routes = [];
        r.keys().forEach(key => {
            let component = r(key);
            if (component.name === "index") {
                routes.push({
                    path: '/',
                    component: component
                });
            } else {
                routes.push({
                    path: component.name,
                    component: component
                });
            }
        });
        return routes;
    })(require.context('./views/', true, /.+index\.vue$/))
});

//状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
let store = new Vuex.Store({
    modules: (r => {
        let store = {};
        r.keys().forEach(key => {
            let item = r(key).default;
            store[item.name] = item;
        });
        return store;
    })(require.context('./', true, /.+store\.js$/))
});

//路由和状态管理合体
import { sync } from 'vuex-router-sync'
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
