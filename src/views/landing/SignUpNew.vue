<template>
  <div align="middle">
    <h3>Please confirm your registration below</h3>
    <a-form :form="form">
      <a-form-item>
        <a-select
          v-model="form.category"
          labelInValue
          :defaultValue="{ key: '0' }"
          style="width: 120px"
          @change="handleChange"
        >
          <a-select-option value="0">Individual</a-select-option>
          <a-select-option value="1">Corporate</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <br />
    <i>Select approriate account type before proceeding</i>
  </div>
</template>

<script>
export default {
  props: ["form"],
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
    second() {
      this.$store.commit("SET_REGISTRATION", this.category.label);
      console.log("console category :", JSON.stringify(this.category.label));
      this.$router.push("/signUp2");
    }
  }
};
</script>

<style>
.h3 {
  margin-bottom: 10px;
}
.ant-steps {
  margin-bottom: 10px;
}
.ant-select {
  margin-bottom: 65px;
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
