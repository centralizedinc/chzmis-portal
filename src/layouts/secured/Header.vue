<template>
  <a-row type="flex" align="middle">
    <a-col :md="3" :xs="12" class="header-title">CCCI</a-col>
    <a-col :md="{ span: 4, offset: 15}" :xs="0">
      <a-input placeholder="Search"></a-input>
    </a-col>
    <a-col :md="{ span: 1, offset: 1}" :xs="0">
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
        <a-button shape="circle" icon="user" />
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<script>
export default {
  methods: {
    handleAccMenuClick(key) {
      console.log("key :", key);
    }
  }
};
</script>

<style>
.header-title {
  color: #ffffff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px #000000;
}
</style>
