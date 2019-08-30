<template>
  <!-- <div align="middle">
      <h3>Create your password</h3>
  </div>-->
  <!-- <div align="left">
      <i>
        Remember that your password must:
        <br />Have atleast six (6) characters,
        <br />Include at least one (1) letter and one (1) number.
      </i>
  </div>-->

  <a-form :form="form">
    <a-form-item v-bind="formItemLayout">
      <a-input
        placeholder="Create new password"
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout">
      <a-input
        placeholder="Confirm new password"
        v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>
  </a-form>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["form"],
  data() {
    return {
      confirmDirty: false,
      form: this.$form.createForm(this)
    };
  },
  // created() {
  //   var formdata = {};
  //   Object.keys(this.formdata).forEach(d => {
  //     formdata[d] = this.$form.createFormField({
  //       value: this.formdata[d]
  //     });
  //   });
  //   this.form = this.$form.createForm(this, {
  //     mapPropsToFields: () => {
  //       return formdata;
  //     }
  //   });
  // },
  methods: {
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
    // handleWebsiteChange(value) {
    //   let autoCompleteResult;
    //   if (!value) {
    //     autoCompleteResult = [];
    //   } else {
    //     autoCompleteResult = [".com", ".org", ".net"].map(
    //       domain => `${value}${domain}`
    //     );
    //   }
    //   this.autoCompleteResult = autoCompleteResult;
    // }
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
  padding: 10px;
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
  width: 600px;
  height: 400px;
}
.ant-layout {
  font-size: small;
}
/* .header-style {
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  color: black;
} */
</style>
