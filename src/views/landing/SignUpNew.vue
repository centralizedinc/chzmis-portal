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
            <a-steps :current="0" size="small">
              <a-step title="First" />
              <a-step title="Second" />
              <a-step title="Third" />
            </a-steps>
          </div>
          <div align="middle"> 
              <h3>Please confirm your registration below</h3>
              <a-select v-model="category" labelInValue :defaultValue="{ key: '0' }" style="width: 120px" @change="handleChange" >
    <a-select-option value="0">Individual</a-select-option>
    <a-select-option value="1">Corporate</a-select-option>
  </a-select>
          </div>
          <div align="middle">
              <i>Select approriate account type before proceeding</i>
              <a-button type="primary" @click="second" block>Continue</a-button>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  // props: ['form'],
  data: () => ({
    category: 0
  }),
    methods: {
    handleChange(value) {
      console.log(value);
    },
    second(){
      this.$store.commit("SET_REGISTRATION", this.category);
      console.log('console category :', JSON.stringify(this.category.label))
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
