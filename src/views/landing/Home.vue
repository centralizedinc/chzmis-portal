<template>
  <div class="card-container bg_landing">
    <a-row type="flex" align="middle" style="height: 100%;">
      <a-col
        :xs="24"
        :md="{span: 22, offset: 1}"
        :lg="{span: 18, offset: 3}"
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
            <span style="text-align: center">Sign up using your existing social media accounts</span>

            <a-col :span="12">
              <a-row type="flex" align="middle" :gutter="12" style="padding-top: 20px">
                <a-col :span="8">
                  <a-form-item>
                    <a-button type="primary" block>
                      <i class="fab fa-facebook-f"></i>
                    </a-button>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item>
                    <a-button type="primary" block>
                      <i class="fab fa-twitter"></i>
                    </a-button>
                  </a-form-item>
                </a-col>

                <a-col :span="8">
                  <a-form-item>
                    <a-button type="primary" block>
                      <i class="fab fa-google-plus-g"></i>
                    </a-button>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-divider>or login with</a-divider>

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
                    </a-form-item>
                    <div style="text-align: left;">
                      <a-checkbox style="color: black">Remember me</a-checkbox>
                      <a href="#" style="float: right">Forgot password ?</a>
                    </div>
                    <a-form-item style="padding-top: 10px">
                      <a-button type="primary" block html-type="submit">Log in</a-button>
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
export default {};
</script>

<style>
.card-container {
  /* background: #f5f5f5; */
  overflow: hidden;
  padding: 24px;
  border: none !important;
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
}
#app {
  text-align: center !important;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
