<template>
  <div>
    <a-drawer
      title="Profile"
      :width="320"
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-card
        style="border: 0px solid rgba(0,0,0,.4); width: 240px;"
        :headStyle="main_layout_head_style"
      >
        <p style="text-align: center">
          <a-avatar
            :size="100"
            style="font-size: 50px;font-weight: bold;"
            shape="circle"
            :src="getLoginUser().avatar"
          >{{getLoginUser("initial")}}</a-avatar>
          <br />
          <span class="profile-name">{{getLoginUser("fullname")}}</span>
          <br />
          <span style="font-size: 12px">{{subscribers_count}} subscribers</span>
          <br />
          <span style="font-size: 12px">{{active_channels_count}} active channels</span>
          <br />
          <span style="font-size: 12px">{{connections_count}} connections</span>
        </p>
      </a-card>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
        visible: false,
    };
  },
  computed:{
      visible() {
      // return this.$store.state.active_user;
      console.log("active_user account :", account);
      if (this.$store.state.users.active_user) {
        return this.getUsers(account);
      } else {
        this.getLoginUser();
      }
    }
  },
  methods: {
    showProfile(account_id) {
      console.log("console active_user :", account_id);
      this.$store.commit("ACTIVE_PROFILE", account_id);
    },
    hideProfile(account_id) {
      console.log("console active_user :", account_id);
      this.$store.commit("REMOVE_ACTIVE_PROFILE", account_id);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>
