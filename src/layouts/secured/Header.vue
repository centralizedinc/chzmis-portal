<template>
  <a-row type="flex" align="middle" style="height: 50px">
    <a-col :md="3" :xs="12" class="header-title">
      <a href="/" class="router-link-active" id="logo">
        <img alt="logo" height="40" :src="headerIcon" />
      </a>
    </a-col>
    <a-col :md="{ span: 4, offset: 14}" :xs="0">
      <!-- <a-input placeholder="Search"></a-input> -->
      <a-input-search placeholder="Search" @search="onSearch" enterButton />
    </a-col>
    <a-col :md="{ span: 2, offset: 1}" :xs="0">
      <a-dropdown placement="bottomRight">
        <a-menu slot="overlay" @click="handleAccMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />Account
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />Settings
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upowser"/>Logout
          </a-menu-item>
        </a-menu>
        <a-button style="background: transparent; border: none;font-size: 20px;box-shadow: none">
          <a-avatar
            shape="circle"
            :size="36"
            :src="getLoginUser().avatar"
          >{{getLoginUser("initial")}}</a-avatar>
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script>
import headerIcon from "../../assets/Chzmis.png";
export default {
  data() {
    return {
      headerIcon,
      user: {
        avatar:
          "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
        full_name: "Cheka"
      }
    };
  },
  methods: {
    handleAccMenuClick(e) {
      console.log("key :", e);
      if(e.key === "3"){
        this.logout()
      }
    },
    onSearch(value) {
      console.log("Search for :", value);
    },
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    }
  }
};
</script>

<style>
.header-title {
  /* color: #ffffff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px #000000;
  background-color: #fff6e2; */
  padding: 0px 0px 0px 20px !important;
}
</style>
