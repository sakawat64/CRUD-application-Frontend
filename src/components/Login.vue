<template>
    <form @submit.prevent="handelSubmit">
        <Error v-if="error" :error="error"/>
        <h3>Login</h3>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" required placeholder="Email"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" required placeholder="Password"/>
        </div>
        <button class="btn btn-primary btn-block">Login</button>
    </form>
</template>

<script>
    import axios from 'axios'
    import Error from "./Error.vue";
    export default {
        name: 'Login',
        components:{Error},
        data(){
            return{
                email:'',
                password:'',
                error:'',
            }
        },
        methods:{
            async handelSubmit()
            {
                try{
                    const response = await axios.post('auth/login',{
                        email: this.email,
                        password : this.password
                    });
                    localStorage.setItem('token',response.data.token);
                    this.$store.dispatch('user', response.data.user);
                    this.$router.push('/');
                }catch(e)
                {
                    this.error = "Invalid Username or Password!"
                }
            }
        }
    }
</script>