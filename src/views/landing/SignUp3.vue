<template>
  

          

          <div id="components-form-demo-vuex">
            <div align="middle">
            <h3>Create your password</h3>
          </div>
          <div align="left">
            <i>
              Remember that your password must:
              <br>
              - Have atleast six (6) characters
              <br>
              - Include at least one (1) letter and one (1) number
            </i>
          </div>
            <a-form>
              <a-form-item>
                <a-input
                  v-decorator="['newPassword', { rules: [{ required: true, message: 'New password is required!' }] }]"
                  placeholder="Create new password"
                  type="password"
                  v-model="form.password"
                >
                  <a-icon slot="prefix" type="unlock" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-input
                  v-decorator="['confirmNewPassword', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                  placeholder="Confirm new password"
                  type="password"
                >
                  <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                </a-input>

                <!-- <a-button type="primary" @click="submit">Submit</a-button> -->
              </a-form-item>
            </a-form>
          </div>

        <!-- </a-card>
      </a-col>
    </a-row>
  </div> -->
</template>

<script>
export default {
    props: ['form'],
  methods: {
    // handleChange(value) {
    //   console.log(value);
    // },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    submit (){
      this.$store.commit("SET_REGISTRATION", this.password);
      console.log('console password :', JSON.stringify(this.password))
      // this.$router.push("/signUp2");
    }
  }
};
</script>

<style>
.h3 {
  margin-bottom: 10px;
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
  margin-bottom: 10px;
}
.overlay-form,
.custom-size {
  width: 500px;
  height: 300px;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
