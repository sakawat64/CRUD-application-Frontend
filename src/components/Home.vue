<template>
   <div>
      <section class="content" v-if="user">
          <h3>Welcome {{user.name}}</h3>
         <div class="row justify-content-around">
            <div class="col-12">
               <div class="card">
                  <div class="card-header">
                     <h3 class="card-title">Product List</h3>
                     <div class="card-tools">
                        <button class="btn btn-primary">
                           <router-link to="/add-product" style="color:#fff;"> Add New Product</router-link>
                        </button>
                     </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                     <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                           <th>SL</th>
                           <th>Title</th>
                           <th>Description</th>
                           <th>Price</th>
                           <th>Image</th>
                           <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(product,index) in allProducts" :key="product.id">
                           <td>{{index+1}}</td>
                           <td>{{product.title}} </td>
                           <td>{{product.description}}</td>
                           <td>{{product.price}}</td>
                           <td><img :src="product.image" alt="" width="40" height="50"> </td>
                           <td>
                              <router-link :to="`/edit-product/${product.id}`">Edit </router-link>
                              <a href="javacript:void(0)" @click.prevent="deleteproduct(product.id)"> Delete</a>
                           </td>
                        </tr>
                        </tbody>
                     </table>
                  </div>
                  <!-- /.card-body -->
               </div>
            </div>
            <!-- /.col -->
         </div>
         <!-- /.row -->
      </section>
      <h3 v-if="!user">You are not Logged in!</h3>
   </div>
</template>

<script>
   import {mapGetters} from 'vuex'
   import axios from 'axios'
    export default {
        name: 'Home',
       // props:['user']
       mounted() {
           this.$store.dispatch('getAllProducts');
         // this.$store.dispatch('profile');
           //console.log(localStorage.getItem('token'));
       },
       computed:{
          ...mapGetters(['user']),
          allProducts(){
             console.log(this.$store.getters.products) ;
             return this.$store.getters.products;
          }
        },
       methods:{
          deleteproduct(id)
          {
             this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
                if (result.value) {
                   axios.delete('products/'+id,{
                      headers:{
                         Authorization:'bearer' + localStorage.getItem('token')
                      }
                   })
                           .then((response)=>{
                              console.log(response);
                              this.$store.dispatch("getAllProducts")
                              this.$swal.fire(
                                      'Deleted!',
                                      'Product has been deleted.',
                                      'success'
                              )
                           })
                }
             })
          }
       }
    }
</script>