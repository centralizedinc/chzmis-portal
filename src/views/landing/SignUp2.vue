<template>
  <div align="left">
    <h4>Please confirm your registration below</h4>
    <!-- <a-form :form="details" @submit="handleSubmit">
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
              </a-form-item>
    </a-form>-->

    <a-form :form="form">
      <!-- email -->
      <a-form-item>
        <a-input
          placeholder="Email Address"
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: 'Email Address is required!' }],
            }
          ]"
        />
      </a-form-item>
      <!-- name -->
      <a-form-item>
        <a-input
          placeholder="First name"
          v-decorator="[
            'first',
            {
              rules: [{ required: true, message: 'Please input your first name!' }],
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="Last Name"
          v-decorator="[
            'last',
            {
              rules: [{ required: true, message: 'Please input your last name!' }],
            }
          ]"
        />
      </a-form-item>
      <a-form-item
      v-model="form.bday"
      v-bind="formItemLayout"
      
    >
      <a-date-picker placeholder="Birthday" v-decorator="['date-picker', config]" />
    </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form"],
  // computed: {
  //   username() {
  //     return this.$store.state.username;
  //   }
  // },
  // watch: {
  //   username(val) {
  //     console.log("this.$store.state.username: ", val);
  //     this.form.setFieldsValue({ username: val });
  //   }
  // },
  created() {
    this.form = this.$form.createForm(this, {
      onFieldsChange: (_, changedFields) => {
        this.$emit("change", changedFields);
      },
      mapPropsToFields: () => {
        return {
          email: this.$form.createFormField({
            value: this.email
          }),
          first: this.$form.createFormField({
            value: this.first
          }),
          last: this.$form.createFormField({
            value: this.last
          })
        };
      },
      onValuesChange: (_, values) => {
        console.log(values);
        // Synchronize to vuex store in real time
        // this.$store.commit('update', values)
      }
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          this.$store.commit("update", values);
        }
      });
    }
  }
  // methods: {
  //   handleChange(value) {
  //     console.log(value);
  //   },
  //   handleSubmit (e) {
  //     e.preventDefault();
  //     this.form.validateFields((err, values) => {
  //       if (!err) {
  //         console.log('Received values of form: ', values);
  //       }
  //     });
  //   },
  //   onChange(date, dateString) {
  //     console.log(date, dateString);
  //     // this.$router.push("/views/landing/signUp3");
  //   },
  //   third(){
  //     this.$store.commit("SET_REGISTRATION", this.user_details);
  //     console.log('console user details :', JSON.stringify(this.user_details))
  //     // console.log('username :', username);
  //     this.$router.push("/signUp3");
  //   }

  // }
};
</script>

<style>
.h4 {
  margin-bottom: 5px;
}
.ant-card {
  margin-bottom: 10px;
}
.card-container {
  /* background: #f5f5f5; */
  overflow: hidden;
  padding: 10px;
  /* text-align: center !important; */
}
.overlay-form {
  /* position: absolute; */
  border-radius: 0px;
  top: 0px;
  background: transparent;
}
.overlay-form,
.custom-size {
  width: 800px;
  height: 600px;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
