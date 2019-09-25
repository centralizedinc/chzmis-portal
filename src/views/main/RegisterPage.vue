<template>
  <a-row>
    <div>
      <setup-profile v-show="this.show_profile"/>
      <!-- <connections style="max-height: 400px; margin-top: 20px;" v-show="this.show_connections_channels"/>
      <channels style="margin-top: 20px;" v-show="this.show_connections_channels"/> -->
    </div>
    <!-- <a-col :xs="{ span: 18 }">
      <connections/>
    </a-col>
    <a-col :xs="{ span: 6 }">
      <a-affix :offsetTop="100">
        <channels style="margin-left: 3vh;"/>
      </a-affix>
    </a-col> -->
  </a-row>
</template>

<script>
import SetupProfile from './ProfileSetup'

export default {
  data() {
    return {
      show_profile: null,
      show_connections_channels: null,
    }
  },
  components: {
    SetupProfile,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$store.state.accounts.account.status === 0) {
        return this.show_profile = true 
       
        
      } else if (this.$store.state.accounts.account.status === 1) {
        return this.$router.push("/main");
        
      } else {
        console.log("No status");
      }
    }
  }
};
</script>

<style>
</style>
