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
              <span>Change Password</span>
            </div>
            <a-col :span="12" style="padding-top: 10px">
              <a-row type="flex" align="middle">
                <a-col :span="24">
                  <!-- username -->
                  <a-form :form="form" @submit="login">
                    <a-form-item>
                      <a-input
                        @keypress.enter="password"
                        v-decorator="['newpassword', { rules: [{ required: true, message: 'Please input new  password!' }] }]"
                        placeholder="Create new user password"
                      >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                      </a-input>
                    </a-form-item>
                    <!-- password -->
                    <a-form-item>
                      <a-input
                        @keypress.enter="password"
                        v-decorator="['confirmpassword',{ rules: [{ required: true, message: 'Retype new password!' }] }]"
                        :type="show_password ? 'text' : 'password'"
                        placeholder="Confirm new user password"
                      >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                        <a-icon slot="suffix" :type="show_password ? 'eye-invisible' : 'eye'" @click="show_password=!show_password" />
                      </a-input>
                      <!-- -------------------------------------------- -->
                      <a-form-item style="padding-top: 40px">
                        <a-button type="primary" :loading="loading" block @click="login">Confirm</a-button>
                        <div>
                          
                        </div>
                        <a-divider></a-divider>
                        <!------------------------------------------------>
                        
                        <a-row type="flex" align="middle" :gutter="12">
                          <a-col :span="24">
                            <a-form-item>
                              
                            </a-form-item>
                          </a-col>
                        </a-row>
                        <a-row type="flex" align="middle" :gutter="12">
                          <a-col :span="24">
                            
                          </a-col>
                        </a-row>
                      </a-form-item>
                      <!-- ------------------------------------------------- -->
                    </a-form-item>
                  </a-form>
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
      user_details:{
        name:{
          first_name:"",
          last_name:""
        }
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
      this.$store.dispatch("CREATE_ACCOUNT", {account: this.account_details, user:this.user_details.name}).then((result) =>{
        console.log("create account data: " + JSON.stringify(result))
        this.modal2Visible = false
        this.account_details.email = ""
        this.account_details.password = ""
        this.user_details.name.first_name = ""
        this.user_details.name.last_name = ""
        this.$router.push("/")
      })
    },
    login() {
      this.loading = true;
      this.form.validateFieldsAndScroll((err, auth) => {
        if (!err) {
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
