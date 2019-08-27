<template>
  <a-layout>
    <a-layout-header style="background: transparent; padding: 0px">
      <a-affix :offsetTop="0">
        <header-layout class="secured-header-layout"></header-layout>
      </a-affix>
    </a-layout-header>
    <a-layout style="height: 100%;margin-bottom: 50px;">
      <a-layout-sider class="secured-sider-layout">
        <profile></profile>
      </a-layout-sider>
      <a-layout-content style="padding: 5px 0;margin-bottom: 35px;">
        <router-view />
      </a-layout-content>
      <a-layout-sider class="secured-acquaintance-layout">
        <acquaintance></acquaintance>
      </a-layout-sider>
    </a-layout>
    <a-layout-footer class="secured-taskbar-layout">
      <a-affix :offsetBottom="33">
        <a-row>
          <a-col :span="22" :offset="1">
            <taskbar></taskbar>
          </a-col>
        </a-row>
      </a-affix>
    </a-layout-footer>
    <a-layout-footer class="secured-layout-footer">
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

<style>
.secured-sider-layout {
  padding: 5px !important;
}

.secured-sider-layout,
.secured-sider-layout ul {
  background: none !important;
  flex: 0 0 250px !important;
  max-width: 250px !important;
  min-width: 250px !important;
}

.secured-footer-layout {
  background: #3c3c3c !important;
  color: #ffffff !important;
  width: 100% !important;
  padding: 5px !important;
  font-weight: bold !important;
}

.secured-layout-footer {
  position: fixed !important;
  background: transparent !important;
  left: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  padding: 0 !important;
  text-align: center;
}

.secured-taskbar-layout {
  background: transparent !important;
  padding: 0px !important;
  position: fixed !important;
  left: 0 !important;
  bottom: 33px !important;
  width: 100% !important;
}

.secured-acquaintance-layout {
  background: none !important;
  flex: 0 0 75px !important;
  max-width: 75px !important;
  min-width: 75px !important;
  width: 75px !important;
  margin: 5px 0px 5px 5px !important;
}

.secured-header-layout {
  background: #fff6e2 !important;
  color: #000000 !important;
  width: 100% !important;
}
</style>
