<template>
  <a-layout>
    <a-layout-header>
      <header-layout></header-layout>
    </a-layout-header>
    <a-layout style="height: 525px;">
      <a-layout-sider class="secured-sider-layout" style="width: 220px">
        <menu-layout></menu-layout>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-sider class="secured-activities-layout">
        <activities-layout></activities-layout>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer>
      <footer-layout></footer-layout>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderLayout from "./secured/Header";
import FooterLayout from "./secured/Footer";
import MenuLayout from "./secured/MenuLayout";
import ActivitiesLayout from "./secured/ActivitiesLayout";

export default {
  components: {
    HeaderLayout,
    FooterLayout,
    MenuLayout,
    ActivitiesLayout
  }
};
</script>

<style lang="less">
.secured-sider-layout,
.secured-sider-layout ul {
  background: none !important;
  border: none !important;
}

.ant-layout-footer {
  background: #3c3c3c !important;
  color: #ffffff !important;
}

.secured-activities-layout {
  flex: 0 0 250px !important;
  max-width: 250px !important;
  width: 200px !important;
  background: none !important;
}
</style>
