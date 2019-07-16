<template>
    <a-layout>
    <div class="card-container">
      <a-row type="flex" align="middle">
        <a-col class="height: 500px" :span="6" :offset="9">
            <h2>Create an account, it's free.</h2>
            <br />
            <a-row>
              <a-col>
                <a-button class="fb-button" icon="like" style="color: white" @click="fb">Sign up with Facebook</a-button>
              </a-col>
              <br />
              <a-col>
                <a-button class="google-button" icon="global" style="color: white" @click="ggl">Sign up with Google</a-button>
              </a-col>
              <br/>
              <a-col>
                <a-button class="mail-button" icon="mail" style="color: white" @click="mail">Sign up with email</a-button>
              </a-col>
            </a-row>
            
              
            
           
           
           
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
export default {
data(){
    return {
    //   username: "",
    //   password: ""
      // first_name: "",
      // last_name: "",
      // gender: ""
    };

},
methods: {
    fb() {
      this.$router.push("/registration")
    },
    ggl() {
      this.$router.push("/registration")
    },
    mail() {
      this.$router.push("/registration")
    },
    // handleSubmit (e) {
    //   e.preventDefault();
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of form: ', values);
    //     }
    //   });
    // },
  }
}
</script>

<style>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
  text-align: center !important;
}
.fb-button {
  background: rgb(77, 77, 247);
  text-align: center !important;
}
.google-button {
  background: green;
  text-align: center !important;
}
.mail-button {
  background: gray;
  text-align: center !important;
}
/* .components-form-demo-normal-login .login-form {
  max-width: 300px;
}
.components-form-demo-normal-login .login-form-forgot {
  float: right;
}
.components-form-demo-normal-login .login-form-button {
  width: 100%;
} */

</style>
