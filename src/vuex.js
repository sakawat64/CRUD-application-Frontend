import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
    user: null,
    profile: [],
    products :[],
};

const store = new Vuex.Store({
    state,
    getters:{
        user : (state) =>{
            return state.user;
        },
        profile : (state) =>{
            return state.profile;
        },
        products : (state) =>{
            return state.products;
        }
    },
    actions: {
        user(context, user){
            context.commit('user',user);
        },
        profile(context){
            axios.get('auth/profile',{
                headers:{
                    Authorization:'bearer' + localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    context.commit('profile_data',response.data)
                })
        },
        getAllProducts(context){
            axios.get('products',{
                headers:{
                    Authorization:'bearer' + localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    context.commit('allProducts',response.data.products)
                })
        }
    },
    mutations:{
        user(state,user){
            state.user = user;
        },
        profile_data(state,profile){
            state.profile = profile;
        },
        allProducts(state,products)
        {
            state.products = products;
        }
    }
});

export default store;