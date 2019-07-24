<template>
  <a-layout>
    <div class="card-container">
      <a-row type="flex" align="middle">
        <a-col class="height: 500px" :span="4" :offset="10">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
                placeholder="Username"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
                type="password"
                placeholder="Password"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
              >Remember me</a-checkbox>
              <a class="login-form-forgot" href>Forgot password</a>
              <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
              <a @click="signUp()">register now!</a>
              <br />
              <a-button type="primary" @click="googleSignUp">Sign up using Google</a-button>
              <a-button type="primary" @click="facebookSignUp">Sign up using Facebook</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      username: "",
      password: ""
      // first_name: "",
      // last_name: "",
      // gender: ""
    };
  },
  created() {},
  methods: {
    googleSignUp() {
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "auth/google",
        "Google Sign Up",
        "width=500,height=500"
      );
    },
    facebookSignUp() {
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "auth/facebook",
        "Facebook Sign Up",
        "width=500,height=500"
      );
    },
    signUp() {
      this.$router.push("/signUp");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    }
  }
};
</script>

<style>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
  text-align: center !important;
}
</style>

