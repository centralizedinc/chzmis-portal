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
            <a-steps :current="2" size="small">
              <a-step title="First" />
              <a-step title="Second" />
              <a-step title="Third" />
            </a-steps>
          </div>
          <div align="middle">
            <h3>Create your password</h3>
          </div>
          <div align="left">
            <i>Remember that your password must:  
                - Have atleast six (6) characters 
                - Include at least one (1) letter and one (1) number
            </i>
          </div>
          <div id="components-form-demo-vuex">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="password">
        <a-input v-decorator="['password',{
              rules: [{ required: true, message: 'Password is required!' }],
            }]"/>
      </a-form-item>
      <a-form-item label="confirmPassword">
        <a-input v-decorator="['confirmPassword',{
              rules: [{ required: true, message: 'Password is required!' }],
            }]"/>
      </a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form>
  </div>
          
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
    onChange(date, dateString) {
      console.log(date, dateString);
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
