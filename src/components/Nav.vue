<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
        <div class="container">
            <div v-if="user">
            <router-link to="/" class="navbar-brand">Home</router-link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto" v-if="!user">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">Sign up</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-if="user">
                    <li class="nav-item">
                        <a href="javacript:void(0)" @click="handleClick" class="nav-link">Logout</a>
                    </li>
                </ul>
            </div>

        </div>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    //import axios from "axios";
   export default {
       name: 'Nav',
       // props:['user'],
       methods:{
            handleClick(){
               this.$store.dispatch('user', null);
               localStorage.removeItem('token');
               this.$router.push('/login');
           }
       },
       computed:{
           ...mapGetters(['user'])
       }
   }
</script>