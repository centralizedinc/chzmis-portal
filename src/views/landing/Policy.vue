<template>
  <div class="card-container" align="center">
        
          <!-- policy -->
          <i>Our privacy policy explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that Google can use such data in accordance with our privacy policy. You and Google also agree to the Google Ads Controller-Controller Data Protection Terms.
You will ensure that at all times you use the Services, the Properties have a clearly labeled and easily accessible privacy policy that provides end users with clear and comprehensive information about cookies, device-specific information, location information and other information stored on, accessed on, or collected from end users' devices in connection with the Services, including, as applicable, information about end users' options for cookie management.  You will use commercially reasonable efforts to ensure that an end user gives consent to the storing and accessing of cookies, device-specific information, location information, or other information on the end user's device in connection with the Services where such consent is required by law.</i>
  <br>
  <br>
<a-button @click="decline" type="primary">Decline</a-button>
  <br>
  <br>
  <a-button @click="proceed" type="primary">Proceed</a-button>
  </div>
</template>
<script>

export default {
  
 
  methods: {
    decline() {
      this.current++;
    },
    proceed() {
      this.$router.push("/newAccount");
    },
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #fafafa;
  /* min-height: 200px; */
  text-align: center;
  padding-top: 10px;
  background: transparent;
}
.steps-action {
  margin-top: 10px;
}
</style>