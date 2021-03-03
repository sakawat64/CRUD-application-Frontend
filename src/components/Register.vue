<template>
    <form @submit.prevent="handelSubmit">
        <Error v-if="error" :error="error"/>
        <h3>Sign Up</h3>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" required placeholder="Provide Name"/>
        </div>
        <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="email" required placeholder="Provide Email"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" required placeholder="Provide Password"/>
        </div>
        <div class="form-group">
            <label>Confirm Password</label>
            <input type="password" class="form-control" v-model="password_confirmation" required placeholder="Provide Password"/>
        </div>
        <button class="btn btn-primary btn-block">Sign Up</button>
    </form>
</template>

<script>
    import axios from 'axios'
    import Error from "./Error.vue";

    export default {
        name: 'Register',
        components: {Error},
        data(){
            return{
                name:'',
                email:'',
                password:'',
                password_confirmation:'',
                error:''
            }
        },
        methods:{
            async handelSubmit()
            {
                // const data = {
                //
                // }
                try{
                    await axios.post('auth/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation
                    })
                    this.$swal('Registration Successful');
                    this.$router.push('/login');
                }catch(err)
                {
                    this.error = "Error Occurred! Please fill up form accurately & Password should be 6 character!";
                }

                // .then(
                //     res =>{
                //         console.log(res)
                //     }
                // ).catch(
                //     err => {
                //         console.log(err)
                //     }
                // )
            }
        }
    }
</script>