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
          <a-row :gutter="24">
            <a-col :span="12">
              <a-card
                style="background: transparent !important ; border: none !important ; padding-top: 80px !important"
              >
                <img alt="logo" src="../../assets/Chzmis.png" slot="cover" />
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
                  <a-form :form="form" @submit="handleSubmit">
                    <a-form-item>
                      <a-input
                        v-decorator="['userName', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                        placeholder="Username or Email Address"
                      >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                      </a-input>
                    </a-form-item>
                    <!-- password -->
                    <a-form-item>
                      <a-input
                        v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] }]"
                        type="password"
                        placeholder="Password"
                      >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                      </a-input>
                      <a-form-item style="padding-top: 10px">
                        <a-button type="primary" block @click="registration">Login</a-button>
                        <div class="center">
                          <a href="#">If you haven't set up an account yet, Register here</a>
                        </div>
                        <a-divider>or</a-divider>

                        <span
                          style="text-align: center"
                        >Sign up using your existing social media accounts</span>
                        <a-row type="flex" align="middle" :gutter="12">
                          <a-col :span="12">
                            <a-form-item>
                              <a-button
                                type="primary"
                                block
                                style="font-size: 18px ; background-color: #3b5998; border-color: #3b5998"
                                @click="facebook"
                              >
                                <a-icon type="facebook" theme="filled" />
                              </a-button>
                            </a-form-item>
                          </a-col>

                          <a-col :span="12">
                            <a-form-item>
                              <a-button
                                style="font-size: 20px; background-color: #d34836; border-color: #d34836"
                                type="primary"
                                block
                                @click="google"
                              >
                                <a-icon type="google-plus" />
                              </a-button>
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </a-form-item>
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
  methods: {
    registration() {
      this.$router.push("/signUp");
    },
    facebook() {
      this.$router.push("/facebookSignUp");
      return
      this.$router.push("/newAccount");
    },
    google() {
      this.$router.push("/newAccount");
    }
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
  height: 400px;
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
