<template>
  <div class="card-container bg_landing">
    <a-row type="flex" align="middle" style="height: 100%;">
      <a-col
        :xs="24"
        :sm="{span: 20, offset: 2}"
        :md="{span: 14, offset: 5}"
        :lg="{span: 10, offset: 7}"
        style="position: relative; font-weight: bold"
      >
        <div class="rounded-corners-transparent custom-size"></div>
        <a-card
          class="overlay-form"
          :headStyle="{'font-weight': 'bold', 'font-size':'20px','text-align': 'left', 'color': 'black;', 'border-bottom':'1px solid black', color: 'black'}"
          title="Login to Chzmis"
          :bordered="false"
        >
          <!-- FORM -->
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
                <a-form-item>
                  <a-button type="primary" block html-type="submit">Log in</a-button>
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
  width: 500px;
  height: 300px;
}
.rounded-corners-transparent {
  background: white !important;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
