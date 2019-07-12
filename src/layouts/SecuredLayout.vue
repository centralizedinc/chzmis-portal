<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout>
      <a-layout-sider></a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-sider></a-layout-sider>
    </a-layout>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
export default {};
</script>

<style>
</style>
