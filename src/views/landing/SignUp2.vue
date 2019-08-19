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
          :headStyle="{'font-weight': 'bold', 'font-size':'20px','text-align': 'middle', color: 'black', 'border-bottom':'1px solid black'}"
          :bordered="false"
        >
          <div>
            <a-steps :current="1" size="small">
              <a-step title="First" />
              <a-step title="Second" />
              <a-step title="Third" />
            </a-steps>
          </div>
          <div align="middle">
            <h3>Please confirm your registration below</h3>
          </div>
          <!-- <div align="left">
            <a-input placeholder="Username/Email Address" />
          </div>
          <div>
            <a-input placeholder="First Name" />
          </div>
          <div>
            <a-input placeholder="Last Name" />
          </div>
          <div>
            <a-date-picker @change="onChange" placeholder="Birthday" />
          </div> -->
          <div align="middle" id="components-form-demo-vuex">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item> 
                <a-input
                  v-decorator="['username', { rules: [{ required: true, message: 'New password is required!' }] }]"
                  placeholder="Username/Email Address"
                >
                  <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-input
                  v-decorator="['fname', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                  placeholder="First Name"
                >
                  <a-icon slot="prefix" type="idcard" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-input
                  v-decorator="['lname', { rules: [{ required: true, message: 'Please input your username!' }] }]"
                  placeholder="Last Name"
                >
                  <a-icon slot="prefix" type="idcard" style="color: rgba(0,0,0,.25)" />
                </a-input>
                <a-date-picker @change="onChange" placeholder="Birthday" />
                <a-button type="primary" @click="third" block>Continue</a-button>
                <!-- <a-button type="primary" html-type="submit">Submit</a-button> -->
              </a-form-item>
            </a-form>
          </div>
          <!-- <div align="middle">
            <a-button type="primary" block>Continue</a-button>
          </div> -->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
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
      this.$router.push("/signUp3");
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
.ant-card {
  margin-bottom: 20px;
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
