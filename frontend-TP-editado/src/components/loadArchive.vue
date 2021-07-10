<template>

  <section class="src-components-load-archive">
    <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <h1>Vue JS Axios - Image Upload using PHP API - ItSolutionStuff.com</h1>
      <label>File
        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()"/>
      </label>
        <button v-on:click="submitForm()">Upload</button>
    </div>
    <div v-if="this.showMsg === true" class="jumbotron">
     <h3>EL ARCHIVOS SE CARGO CORRECTAMENTE , LA BASE DE DATOS FUE ACTUALIZADA</h3>
    </div>
  </div>

    
    
    
  </section>

</template>

<script>

import jwt from "jsonwebtoken";
 
  export default  {
    name: 'srccomponentsloadArchive',
    props: [],
    mounted () {
      this.chequearAdmin();

    },
    data () {
      return {
         isAdmin: false,
         file :'',
         finishMsg:'',
         showMsg : false
         
      }
    },
     computed: {

    },
    methods: {
      changemsg(data){
         this.showMsg = true
         this.finishMsg = data.data.message
      },
      chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = rol == "admin";
        console.log(this.isAdmin);
        
      }
    },
    
    async submitForm(){
           
            let formData = new FormData();
            formData.append('sample', this.file);
            try {

            let resp = await this.axios.post('http://localhost:3000/products/upload-avatar',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            console.log(resp);
            this.changemsg(resp);
            return resp
            } catch (error) {
              console.log(error);
              
            }
         

            
      },
  
      onChangeFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  } 



</script>

<style scoped lang="css">
  .src-components-load-archive {

  }
</style>
