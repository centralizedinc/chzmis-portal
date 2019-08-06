<template>
  <div class="card-container bg_landing">
    <a-row type="flex" align="middle" style="padding: 200px">
      <a-col :span="10" :offset="5" style="position: relative;">
        <div class="rounded-corners-transparent custom-size"></div>
        <a-card
          class="overlay-form"
          :headStyle="{'font-weight': 'bold', 'font-size':'20px','text-align': 'left', 'color': 'black;', 'border-bottom':'1px solid black'}"
          title="Login to Chzmis"
          :bordered="false"
        >
          <!-- FORM -->
          <a-row type="flex" align="middle">
            <a-col :span="24">
              <!-- username -->
              <a-form
                id="components-form-demo-normal-login"
                :form="form"
                class="login-form"
                @submit="handleSubmit"
              >
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
                  <a-checkbox
                    style="align: left"
                    v-decorator="['remember', { valuePropName: 'checked', initialValue: true }]"
                  >Remember me</a-checkbox>
                </a-form-item>
                <a-form-item>
                  <a class="login-form-forgot" href>Forgot password</a>
                  <br />
                  <a-button type="primary" block html-type="submit" class="login-form-button">Log in</a-button>
                </a-form-item>
              </a-form>
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
  text-align: center !important;
}
.overlay-form {
  position: absolute;
  border-radius: 15px;
  top: 10px;
  height: 330px;
  width: 500px;
  background: transparent;
}
.custom-size {
  width: 500px;
  height: 330px;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
