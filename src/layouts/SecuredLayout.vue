<template>
  <a-layout>
    <a-layout-header style="background: transparent; padding: 0px">
      <a-affix :offsetTop="0">
        <header-layout class="secured-header-layout"></header-layout>
      </a-affix>
    </a-layout-header>
    <a-layout style="height: 525px;">
      <a-layout-sider class="secured-sider-layout" style="width: 220px">
        <profile></profile>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-sider class="secured-activities-layout">
        <acquaintance></acquaintance>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer class="secured-taskbar">
      <a-affix :offsetBottom="10">
        <taskbar></taskbar>
      </a-affix>
    </a-layout-footer>
    <a-layout-footer class="secured-footer-layout">
      <a-affix :offsetBottom="1">
        <footer-layout></footer-layout>
      </a-affix>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderLayout from "./secured/Header";
import FooterLayout from "./secured/Footer";
import Profile from "./secured/Profile";
import Acquaintance from "./secured/Acquaintance";
import Taskbar from "./secured/Taskbar";

export default {
  components: {
    HeaderLayout,
    FooterLayout,
    Profile,
    Acquaintance,
    Taskbar
  }
};
</script>

<style lang="less">
.secured-sider-layout,
.secured-sider-layout ul {
  background: none !important;
  border: none !important;
}

.secured-footer-layout {
  background: #3c3c3c !important;
  color: #ffffff !important;
  height: 50px !important;
}

.secured-taskbar {
  background-color: #023b75;
  // opacity: 0.6;
  // filter: alpha(opacity=60);
}

.secured-activities-layout {
  flex: 0 0 250px !important;
  max-width: 250px !important;
  width: 200px !important;
  background: none !important;
}

.secured-header-layout {
  background: #fff6e2 !important;
  color: #000000 !important;
  width: 100% !important;
}
</style>
