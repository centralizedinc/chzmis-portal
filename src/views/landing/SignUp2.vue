<template>
          <div align="middle" id="components-form-demo-vuex">
            <h4>Please confirm your registration below</h4>
            <a-form>
              <a-form-item> 
                <a-input
                  v-model="form.email"
                  v-decorator="['email', { rules: [{ required: true, message: 'New email is required!' }] }]"
                  placeholder="Email Address"
                  
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-input
                  v-decorator="['fname', { rules: [{ required: true, message: 'Please input your first name!' }] }]"
                  placeholder="First Name"
                  v-model="form.name.first"
                >
                  <a-icon slot="prefix" type="idcard" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-input
                  v-decorator="['lname', { rules: [{ required: true, message: 'Please input your last name!' }] }]"
                  placeholder="Last Name"
                  v-model="form.name.last"
                >
                  <a-icon slot="prefix" type="idcard" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-date-picker v-model="form.bday" @change="onChange" placeholder="Birthday" />
                <!-- <a-button type="primary" @click="third" block>Continue</a-button> -->
                <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
              </a-form-item>
            </a-form>
          </div>
</template>

<script>
export default {
  props: ['form'],
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    onChange(date, dateString) {
      console.log(date, dateString);
      // this.$router.push("/views/landing/signUp3");
    },
    third(){
      this.$store.commit("SET_REGISTRATION", this.user_details);
      console.log('console user details :', JSON.stringify(this.user_details))
      // console.log('username :', username);
      this.$router.push("/signUp3");
    }

  }
};
</script>

<style>
.h4 {
  margin-bottom: 5px;
}
.ant-card {
  margin-bottom: 20px;
}
.card-container {
  /* background: #f5f5f5; */
  overflow: hidden;
  padding: 10px;
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
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
