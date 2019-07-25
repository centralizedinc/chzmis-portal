<template>
  <a-layout>
    <a-layout-header style="background: transparent; padding: 0px">
      <a-affix :offsetTop="0">
        <header-layout class="secured-header-layout"></header-layout>
      </a-affix>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="secured-sider-layout">
        <profile></profile>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-sider class="secured-activities-layout">
        <acquaintance></acquaintance>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer style="background: transparent; padding: 0px">
      <a-affix :offsetBottom="33">
        <taskbar></taskbar>
      </a-affix>
    </a-layout-footer>
    <a-layout-footer style="background: transparent; padding: 0px">
      <a-affix :offsetBottom="0">
        <div class="secured-footer-layout">Copyright @ 2019 Chzmis</div>
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
  flex: 0 0 300px !important;
  max-width: 300px !important;
  min-width: 300px !important;
  width: 300px !important;
}

.secured-footer-layout {
  background: #3c3c3c !important;
  color: #ffffff !important;
  width: 100% !important;
  padding: 5px !important;
  font-weight: bold !important;
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
