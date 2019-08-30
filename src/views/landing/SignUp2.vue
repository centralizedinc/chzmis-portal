<template>
  <div align="left">
    <h4>Please confirm your registration below</h4>
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
      <a-form-item>
        <a-date-picker placeholder="Birthday" v-decorator="['date-picker', config]" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: ["form"],
  data() {
    return {
      config: {
        rules: [
          { type: "object", required: true, message: "Please select time!" }
        ]
      }
    };
  },
  watch: {
    form(val){
      console.log('val :', val);
    }
  }
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
  // created() {
  //   this.form = this.$form.createForm(this, {
  //     onFieldsChange: (_, changedFields) => {
  //       this.$emit("change", changedFields);
  //     },
  //     mapPropsToFields: () => {
  //       return {
  //         email: this.$form.createFormField({
  //           value: this.email
  //         }),
  //         first: this.$form.createFormField({
  //           value: this.first
  //         }),
  //         last: this.$form.createFormField({
  //           value: this.last
  //         })
  //       };
  //     },
  //     onValuesChange: (_, values) => {
  //       console.log(values);
  //       // Synchronize to vuex store in real time
  //       // this.$store.commit('update', values)
  //     }
  //   });
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