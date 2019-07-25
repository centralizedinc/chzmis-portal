<template>
  <div class="main-layout">
    <div class="background-layout"></div>
    <div class="item-layout">
      <a-row type="flex" align="middle" style="height: 100%">
        <a-col :span="1">
          <img :src="profileIcon" width="40px" alt />
        </a-col>
        <a-col :span="1">
          <img :src="groupIcon" width="40px" alt />
        </a-col>
        <a-col :span="1">
          <img :src="channelsIcon" width="40px" alt />
        </a-col>
        <a-col :span="1">
          <img :src="messageIcon" width="40px" alt />
        </a-col>
        <a-col :span="1"><a-divider type="vertical" style="height: 3em"></a-divider></a-col>
        <a-button type="ghost" icon="left" style="height: 80%; padding-left: 5px; padding-right: 5px;"/>
        <a-col :span="1" v-for="(item, index) in 18" :key="index">
          <a-avatar
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Facebook_Messenger_4_Logo.svg/600px-Facebook_Messenger_4_Logo.svg.png"
          ></a-avatar>
        </a-col>
        <a-button type="ghost" icon="right" style="height: 80%; padding-left: 5px; padding-right: 5px;"/>
      </a-row>
    </div>
  </div>
</template>

<script>
import channelsIcon from "../../assets/Channels.png";
import groupIcon from "../../assets/Group.png";
import messageIcon from "../../assets/Message.png";
import profileIcon from "../../assets/MyProfile.png";

export default {
  data() {
    return {
      channelsIcon,
      groupIcon,
      messageIcon,
      profileIcon
    };
  }
};
</script>

<style>
.main-layout {
  position: relative !important;
  max-height: 55px !important;
}

.item-layout {
  position: absolute;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
}

.background-layout {
  background: #023b75 !important;
  opacity: 0.6 !important;
  height: 55px !important;
}
</style>
