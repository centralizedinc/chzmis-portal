<template>
  <a-row>
    <!-- <div>
      <setup-profile v-show="this.show_profile"/>
      <connections style="max-height: 400px; margin-top: 20px;" v-show="this.show_connections_channels"/>
      <channels style="margin-top: 20px;" v-show="this.show_connections_channels"/>
    </div>-->
    <a-col :xs="{ span: 15 }">
      <connections />
    </a-col>
    <a-col :xs="{ span: 9 }">
      <a-affix :offsetTop="60">
        <channels style="margin-left: 3vh;" />
      </a-affix>
    </a-col>
    <view-profile />
  </a-row>
</template>

<script>
import Connections from "./Connections";
import Channels from "./Channels";
import SetupProfile from "./ProfileSetup";
import ViewProfile from "../../components/ViewProfile";

export default {
  data() {
    return {
      show_profile: null,
      show_connections_channels: null,
      view_profile: null
    };
  },
  components: {
    Connections,
    Channels,
    SetupProfile,
    ViewProfile
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$store.state.accounts.account.status === 0) {
        return (this.show_profile = true);
      } else if (this.$store.state.accounts.account.status === 1) {
        return (this.show_connections_channels = true);
      } else {
        console.log("No status");
      }
    }
  }
};
</script>

<style>
</style>
