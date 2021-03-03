<template>
    <form role="form" enctype="multipart/form-data" @submit.prevent="handelSubmit">
        <h3>Create Product</h3>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="form-control" v-model="form.title" name="title" placeholder="Title" :class="{ 'is-invalid': form.errors.has('title') }"/>
            <has-error :form="form" field="title"></has-error>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="form-control" rows="2" v-model="form.description" name="description" placeholder="Description" :class="{ 'is-invalid': form.errors.has('description') }"></textarea>
            <has-error :form="form" field="description"></has-error>
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="form.price" name="price" placeholder="Price" :class="{ 'is-invalid': form.errors.has('price') }"/>
            <has-error :form="form" field="price"></has-error>
        </div>
        <div class="form-group">
            <label>Image</label>
            <input type="file" @change="changePhoto($event)" name="photo" class="form-control" :class="{ 'is-invalid': form.errors.has('photo') }"/>
            <img :src="form.photo" width="80" height="80" alt="">
            <has-error :form="form" field="photo"></has-error>
        </div>
        <button class="btn btn-primary btn-block">Save</button>
    </form>
</template>

<script>
    import Vue from 'vue'
    import { Form, HasError } from 'vform'
    Vue.component(HasError.name, HasError)
    export default {
        name: "CreateProduct",
        data()
        {
            return {
                form: new Form({
                    title : '',
                    description :'',
                    price : '',
                    photo : '',
                })
            }
        },
        methods:{
            changePhoto(event){
                let ff = event.target.files;
                console.log(ff)
                let file = event.target.files[0];
                if(file.size > 1048576)
                {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'File Size not more tham 1 MB!',
                        footer: '<a href="#">Why do I have this issue?</a>'
                    })
                }
                else
                {
                    let reader = new FileReader();
                    reader.onload = event => {
                        this.form.photo = event.target.result
                    };
                    reader.readAsDataURL(file);
                }
            },
            handelSubmit()
            {
                this.form.post('products',{
                    headers:{
                        Authorization:'bearer' + localStorage.getItem('token')
                    }
                })
                    .then((response)=>{
                        console.log(response);
                        this.$swal('Insert Successfully');
                        this.$router.push('/');
                    })
                    .catch(()=>{
                        console.log("Error");
                    })
            }
        }
    }
</script>

<style scoped>

</style>