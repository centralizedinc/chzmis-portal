<template>
  <a-layout style="height: 100%;">
    <!-- <a-layout-header>
      <header-layout></header-layout>
    </a-layout-header>-->
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer style="background: #313131 !important; color: white;">
      <footer-layout></footer-layout>
    </a-layout-footer>
  </a-layout>
</template>

<script>
// import HeaderLayout from "./main/Header";
import FooterLayout from "./main/Footer";

export default {
  components: {
    // HeaderLayout,
    FooterLayout
  }
};
</script>

<style>
</style>
