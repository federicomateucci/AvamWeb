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
  </div>

    
    
    
  </section>

</template>

<script>

import jwt from "jsonwebtoken";
 const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
  export default  {
    name: 'srccomponentsloadArchive',
    props: [],
    mounted () {
      this.chequearAdmin();

    },
    data () {
      return {
         isAdmin: false,
         file :''
      }
    },
     computed: {

    },
    methods: {
      chequearAdmin() {
      const tokenDecoded = jwt.decode(localStorage.jwt);
      if (tokenDecoded) {
        const { rol } = tokenDecoded;
        this.isAdmin = rol == "admin";
        console.log(this.isAdmin);
      }
    },
    submitForm(){
            let formData = new FormData();
            formData.append('sample', this.file);
  
            this.axios.post('http://localhost:3000/products/upload-avatar',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(data){
              console.log(data.data);
            })
            .catch(function(){
              console.log('FAILURE!!');
            });
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
