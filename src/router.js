import Vue from  'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import CreateProduct from "./components/CreateProduct.vue"
import EditProduct from "./components/EditProduct.vue";

Vue.use(Router)
function isAuthenticated() {
    if(localStorage.getItem('token'))
    {
        return true;
    }
    return false;
}
export default new Router({
    mode: 'history',
    routes:[
        {
            path: '/',
            component: Home,
            beforeEnter(to, from, next) {
                if (isAuthenticated()) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {
            path: '/add-product',
            component: CreateProduct,
            beforeEnter(to, from, next) {
                if (isAuthenticated()) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {
            path: '/edit-product/:productid',
            component: EditProduct,
            beforeEnter(to, from, next) {
                if (isAuthenticated()) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {path: '/login',component: Login},
        {path: '/register',component: Register}
    ]
})