<template>
  <a-modal v-model="acct_ready" onOk="handleOk">
    <a-row justify="center" align="middle">
      <a-col :span="12" :offset="8">
        <a-icon style="font-size: 20vh ; color:primary" type="wechat" />
      </a-col>
      <a-col :span="24">
        <h1 style="text-align: center" :user="user">{{user}}, your account is ready!</h1>
        <h3 style="text-align: center">
          Head on to your timeline to start the Chzmis!
          <br />Happy Chzmisan!
        </h3>
      </a-col>
    </a-row>
    <template slot="footer">
      <a-button block type="primary" @click="goToTimeline">Go to My Timeline</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: {
    acct_ready: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: "Wan"
    };
  },
  computed: {
    head_style() {
      return {
        "background-color": "rgb(49, 49, 49)",
        color: "white"
      };
    }
  },
  methods: {
    goToTimeline() {
      this.$router.push("/");
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.show_search = false;
        this.loading = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.cardStyle {
  /* border-radius: 25px !important; */
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>
