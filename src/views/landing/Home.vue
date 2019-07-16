<template>
  <div class="card-container">
    <!-- <a-card bodyStyle="padding-bottom: 0px;" style="margin-bottom: 10px;"> -->
    <a-row type="flex" style="height 500px" align="middle">
      <a-col :span="6" :offset="5">
        <a-card style="height: 250px">
          <a-input v-model="username" placeholder="Username or Email"></a-input>
          <br>
          <br>
          <a-input v-model="password" placeholder="Password"></a-input>

          <br><br><br><a-button type="primary">login</a-button>
          <br />
          <a @click="forgotPass">Forgot your password?</a>
        </a-card>
      </a-col>
      <a-col :span="6" :offset="2">
        <a-card style="height: 500px">
          <h1>First time on CHZMIS?</h1>
          <br />
          <h3>
            <br />Sign up
          </h3>
          <a-input v-model="first_name" placeholder="First Name"></a-input>
          <br>
          <br>
          <a-input v-model="last_name" placeholder="Last Name"></a-input>

          <p>
            <br />Birthday
          </p>

          <a-date-picker @change="onChange" />
          <br />

          <p>
            <br />Gender
          </p>

            <a-radio-group name="radioGroup" :defaultValue="1">
              <a-radio :value="1">Male</a-radio>
              <a-radio :value="2">Female</a-radio>
            </a-radio-group>
            <br>
            <br>
            <br>
          
          <a-button type="primary">Sign up</a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

          </a-card>
        </a-col>
      </a-row>
    <!-- </a-card> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      gender: ""
    };
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    }
  }
};
</script>

<style>
</style>

