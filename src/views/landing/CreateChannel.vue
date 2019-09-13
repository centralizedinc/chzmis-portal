<template>
  <a-layout>
    <a-layout-header>
      <a-row type="flex" align="middle">
        <a-col :md="3" :xs="12" class="header-title">
          <a href="/" class="router-link-active" id="logo">
            <img alt="logo" height="50" :src="headerIcon" />
          </a>
        </a-col>
      </a-row>
    </a-layout-header>

    <!-- BG -->
    <div>
      <div class="bg_landing">
        <a-row style="height:80vh" type="flex" justify="start" :gutter="1"></a-row>
      </div>
    </div>
  </a-layout>
</template>

<script>
export default {};
</script>

<style>
</style>