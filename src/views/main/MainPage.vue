<template>
  <a-row>
    <a-col :xs="{ span: 18 }">
      <connections/>
    </a-col>
    <a-col :xs="{ span: 6 }">
      <a-affix :offsetTop="100">
        <channels style="margin-left: 3vh;"/>
      </a-affix>
    </a-col>
  </a-row>
</template>

<script>
import Connections from './Connections';
import Channels from './Channels';

export default {
  components: {
    Connections,
    Channels
  }
};
</script>

<style>
</style>
