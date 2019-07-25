<template>
  <a-row type="flex" align="middle">
    <a-col :md="3" :xs="12" class="header-title">
      <a href="/" class="router-link-active" id="logo">
        <img alt="logo" height="60" :src="headerIcon" />
      </a>
    </a-col>
    <a-col :md="{ span: 4, offset: 13}" :xs="0">
      <!-- <a-input placeholder="Search"></a-input> -->
      <a-input-search placeholder="Search" @search="onSearch" enterButton/>
    </a-col>
    <a-col :md="{ span: 3, offset: 1}" :xs="0">
      <a-dropdown>
        <a-menu slot="overlay" @click="handleAccMenuClick">
          <a-menu-item key="1">
            <a-icon type="user" />Account
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />Settings
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upowser" />Logout
          </a-menu-item>
        </a-menu>
        <a-button style="background: transparent; border: none;font-size: 20px;box-shadow: none">
          <a-avatar shape="circle" :size="36" :src="user.avatar"/>
          <span style="vertical-align: middle; padding-left: 10px">{{user.full_name}}</span>
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
        avatar: "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
        full_name: "Cheka"
      }
    };
  },
  methods: {
    handleAccMenuClick(key) {
      console.log("key :", key);
    },
    onSearch(value){
      console.log('Search for :', value);
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
