<template>
  <!-- class="card-container bg_landing" -->
  <div class="card-container bg_landing">  
      
        
        <a-row type="flex" justify="center" align="center">
        <a-col>
          <a-form>
          <a-form-item>
          <a-modal  title="Welcome to CHZMIS" v-model="visible">
          
            <h2 align="center">Welcom to Chzmis! <br>
            Thank you for verifying your account</h2>
           <template slot="footer">
             <a-button @click="link">please click to redirect to login</a-button>
    
           </template>
            
          
          </a-modal>
   </a-form-item>
          </a-form>
          </a-col>
    </a-row>
      
  </div>
</template>
<script>


export default {
    data(){
      return{
        visible: true
      }
    },
    created(){
      console.log("confirm registration: " + this.$route.query)
    },
  methods: {
    handleOk(){
      this.link()
    },
    link(){
    //   this.$store.commit("SET_REGISTRATION", this.user_info);
    //   console.log('console user information:', JSON.stringify(this.user_info))
      // console.log('username :', username);
      
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
.ant-row {
    margin-top: 600px;
}
.steps-content {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #fafafa;
  /* min-height: 200px; */
  text-align: center;
  padding-top: 10px;
  background: transparent;
}
.steps-action {
  margin-top: 10px;
}
</style>