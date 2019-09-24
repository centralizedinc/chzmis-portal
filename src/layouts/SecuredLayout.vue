<template>
  <a-layout>
    <a-layout-header
      style="background: transparent; padding: 0px; height: 50px; line-height: 45px;"
    >
      <a-affix :offsetTop="0">
        <header-layout class="secured-header-layout"></header-layout>
      </a-affix>
    </a-layout-header>
    <a-layout-content>
      <a-row style="margin: 8vh; margin-bottom: 15vh;">
        <a-col :sm="0" :md="{span: 4}">
          <a-affix :offsetTop="100">
            <profile />
          </a-affix>
        </a-col>
        <a-col :xs="24" :md="{span: 20}">
          <router-view />
        </a-col>
      </a-row>
    </a-layout-content>
    <!-- <a-layout style="height: 100%;margin-bottom: 50px;padding: 50px;">
      <a-layout-sider class="secured-sider-layout">
        <profile />
      </a-layout-sider>
      <a-layout-content style="margin: 0 12px;">
      </a-layout-content>
    </a-layout> -->
    <a-layout-footer class="secured-taskbar-layout">
      <a-affix :offsetBottom="33">
        <taskbar></taskbar>
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
  },
  created() {
    this.$store.commit("SETUP", this.$store.state.accounts.token);
  }
};
</script>

<style>
/* .secured-sider-layout {
  padding: 5px !important;
} */

.secured-sider-layout,
.secured-sider-layout ul {
  margin: 0 12px;
  background: none !important;
  flex: 0 0 216px !important;
  max-width: 216px !important;
  min-width: 216px !important;
  width: 216px !important;
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
