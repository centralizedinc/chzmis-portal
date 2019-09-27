<template>
  <div class="card-container bg_landing">
    <a-row type="flex" align="middle" style="height: 100%;">
      <a-col
        :xs="24"
        :md="{span: 22, offset: 1}"
        :lg="{span: 18, offset: 4}"
        style="font-weight: bold"
      >
        <div class="rounded-corners-transparent custom-size"></div>
        <a-card class="overlay-form">
          <!-- LEFT -->
          <a-row :gutter="24" style="text-align: center">
            <a-col :span="12">
              <a-card
                style="background: transparent !important ; border: none !important ; padding-top: 80px !important"
              >
                <img alt="logo" src="../../assets/Chzmis.png" slot="cover">
              </a-card>
            </a-col>
            <!-- RIGHT -->
            <div class="center">
              <span>Login</span>
            </div>
            <a-col :span="12" style="padding-top: 10px">
              <a-row type="flex" align="middle">
                <a-col :span="24">
                  <!-- username -->
                  <a-form :form="form" @submit="login">
                    <a-form-item>
                      <a-input
                        @keypress.enter="login"
                        v-decorator="['email', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                        placeholder="Username or Email Address"
                      >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                      </a-input>
                    </a-form-item>
                    <!-- password -->
                    <a-form-item>
                      <a-input
                        @keypress.enter="login"
                        v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] }]"
                        :type="show_password ? 'text' : 'password'"
                        placeholder="Password"
                      >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                        <a-icon slot="suffix" :type="show_password ? 'eye-invisible' : 'eye'" @click="show_password=!show_password" />
                      </a-input>
                      <a-form-item style="padding-top: 10px">
                        <a-button type="primary" :loading="loading" block @click="login">Login</a-button>
                        <div>
                          <a @click="() => setModal1Visible(true)">Forgot password?</a>
                          <br>
                          <a
                            @click="() => modal2Visible = true"
                            :disabled="loading"
                          >If you haven't set up an account yet, Register here</a>
                        </div>
                        <a-divider>or</a-divider>
                        <span
                          style="text-align: center"
                        >Login using your existing social media accounts</span>
                        <a-row type="flex" align="middle" :gutter="12">
                          <a-col :span="24">
                            <a-form-item>
                              <a-button
                                :disabled="loading"
                                @click="facebookLogin"
                                type="primary"
                                block
                                style="font-size: 18px ; background-color: #3b5998; border-color: #3b5998"
                              >
                                <a-icon type="facebook" theme="filled"/>
                              </a-button>
                            </a-form-item>
                          </a-col>
                        </a-row>
                        <a-row type="flex" align="middle" :gutter="12">
                          <a-col :span="24">
                            <a-form-item>
                              <a-button
                                :disabled="loading"
                                @click="googleLogin"
                                style="font-size: 20px; background-color: #d34836; border-color: #d34836"
                                type="primary"
                                block
                              >
                                <a-icon type="google-plus"/>
                              </a-button>
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </a-form-item>
                    </a-form-item>
                  </a-form>
                   <!-- Forgot Password -->
                  <a-modal
                    title="Forgot your password?"
                    centered
                    v-model="modal1Visible"
                    @ok="() => modal1Visible = false"
                    :visible="modal1Visible"
                    @cancel="() => setModal1Visible(false)"
                  >
                  
                    <!-- content -->
                    <a-form>
                      <a-row type="flex" align="right" :gutter="12">
                        <!-- email -->
                        <a-col :span="24">
                          <a-form-item>
                            <a-input
                           
                              placeholder="Please input your email address"
                              v-decorator="['email',{rules: [{ required: true, message: 'Email Address is required!' }],}]"
                            />
                          </a-form-item>
                        </a-col>
                        <!-- password -->
                        <a-col :span="24">
                          
                          
                          
                        </a-col>
                      </a-row>
                    </a-form>
                  </a-modal>
                  <!-- Sign up -->
                  <a-modal
                    title="Signup"
                    centered
                    v-model="modal2Visible"
                    :footer="null"
                    @ok="() => modal2Visible = false"
                  >
                    <!-- content -->
                    <a-form>
                      <a-row type="flex" align="center" :gutter="12">
                        <!-- email -->
                        <a-col :span="24">
                          <a-form-item>
                            <a-input
                              placeholder="Email Address"
                              v-model="account_details.email"
                            />
                          </a-form-item>
                        </a-col>
                        <!-- password -->
                        <a-col :span="24">
                          <a-form-item>
                            <a-input
                              placeholder="Create new password"
                              v-model="password"
                              type="password"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="24">
                          <a-form-item>
                            <a-input
                              placeholder="Confirm new password"
                              type="password"
                              v-model="account_details.password"
                              @blur="handleConfirmBlur"
                            />
                          </a-form-item>
                        </a-col>
                        <a-button
                          @click="localSignUp"
                          type="primary"
                          block
                          style="font-size: 18px ; background-color: #3b5998; border-co`lor: #3b5998"
                        >Signup
                          <a-icon type="primary" theme="filled"/>
                        </a-button>
                      </a-row>
                    </a-form>
                    <a-divider>or sigup using</a-divider>
                    <a-row type="flex" align="top" :gutter="12">
                      <a-col :span="12">
                        <a-button
                          @click="facebookSignUp"
                          type="primary"
                          block
                          style="font-size: 18px ; background-color: #3b5998; border-color: #3b5998"
                        >
                          <a-icon type="facebook" theme="filled"/>
                        </a-button>
                      </a-col>
                      <a-col :span="12">
                        <a-button
                          @click="googleSignUp"
                          style="font-size: 20px; background-color: #d34836; border-color: #d34836"
                          type="primary"
                          block
                        >
                          <a-icon type="google-plus"/>
                        </a-button>
                      </a-col>
                    </a-row>
                  </a-modal>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Icon } from "ant-design-vue";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});
export default {
  components: {
    IconFont
  },
  data() {
    return {
      form: this.$form.createForm(this),
      modal1Visible: false,
      modal2Visible: false,
      loading: false,
      password: "",
      account_details: {
        email: "",
        method: "local",
        password: ""
      },
      show_password: false
    };
  },
  created() {
    console.log("user_info initialized:", this.user_info);
    console.log(
      "user_info STORE:Facebook",
      this.$store.state.third_party_libraries.facebook_details
    );
    console.log(
      "user_info STORE:Google",
      this.$store.state.third_party_libraries.google_details
    );

    //   this.init();
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },

    registration() {
      this.$router.push("/signUp");
    },
    localSignUp() {
      // this.$router.push("/newAccount");
      this.$store.dispatch("CREATE_ACCOUNT", {account: this.account_details}).then((result) =>{
        console.log("create account data: " + JSON.stringify(result))
        this.modal2Visible = false
        this.account_details.email = ""
        this.account_details.password = ""
        this.$router.push("/")
      })
    },
    login() {
      this.loading = true;
      this.form.validateFieldsAndScroll((err, auth) => {
        if (!err) {
           this.$store.commit('ACTIVE_USER', this.form.getFieldValue('email'))
          console.log("Received values of form: ", auth);
          this.$store
            .dispatch("LOGIN", auth)
            .then(result => {
              console.log("Success Login");
              if (this.$store.state.accounts.is_authenticated) {
                // Notification message

                this.$router.push("/main");
              } else {
                // notification error
              }
              this.loading = false;
            })
            .catch(err => {
              console.log("LOGIN err :", err);
              this.loading = false;
            });
        }
      });
    },
    // SIGNIN
    facebookLogin() {
      // this.$router.push("/main");
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "/auth/facebook",
        "Facebook Sign In",
        "width=500,height=500"
      );
    },
    googleLogin() {
      // this.$router.push("/main");
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "/auth/google",
        "Google Sign In",
        "width=500,height=500"
      );
    },
    // SIGNUP
    facebookSignUp() {
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "/auth/facebook",
        "Facebook Sign Up",
        "width=500,height=500"
      );
    },
    googleSignUp() {
      var googleWindow = window.open(
        process.env.VUE_APP_API_BASE_URL + "/auth/google",
        "Google Sign Up",
        "width=500,height=500"
      );
    },
    // validator
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }

    //

    //  mapProps() {
    //   var data = {};
    //   if (this.current === 1) {
    //     data = {
    //       category: this.$form.createFormField({
    //         value: this.form_data.category
    //       })
    //     };
    //   } else if (this.current === 2) {
    //     data = {
    //       email: this.$form.createFormField({
    //         value: this.form_data.email
    //       }),
    //       "password": this.$form.createFormField({
    //         value: this.form_data.password
    //       })
    //     };
    //   }
    //   this.form = this.$form.createForm(this, {
    //     mapPropsToFields() {
    //       return data;
    //     }
    //   });
    // }
  }
};
</script>

<style>
.icons-list >>> .anticon {
  margin-right: 6px;
  font-size: 24px;
}
.card-container {
  /* background: #f5f5f5; */
  overflow: hidden;
  padding: 24px;
  /* text-align: center !important; */
}
.overlay-form {
  /* position: absolute; */
  border-radius: 15px;
  top: 0px;
  background: transparent;
}
.overlay-form,
.custom-size {
  width: 800px;
  height: 480px;
}
.rounded-corners-transparent {
  background: white !important;
  box-shadow: -8px 10px 10px #0000003b;
}
.center {
  text-align: center !important;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
