<template>
  <div class="main-layout">
    <div class="background-layout"></div>
    <div class="item-layout">
      <a-row type="flex" align="middle" style="height: 100%">
        <a-col :span="1">
          <a-tooltip placement="top">
            <template slot="title">
              <span>My Profile</span>
            </template>
            <img :src="profileIcon" class="cursor-pointer" width="40px" alt />
          </a-tooltip>
        </a-col>
        <a-col :span="1">
          <a-tooltip placement="top">
            <template slot="title">
              <span>Connections</span>
            </template>
            <img :src="groupIcon" class="cursor-pointer" width="40px" alt />
          </a-tooltip>
        </a-col>
        <a-col :span="1">
          <a-tooltip placement="top">
            <template slot="title">
              <span>My Channels</span>
            </template>
            <img :src="channelsIcon" class="cursor-pointer" width="40px" alt />
          </a-tooltip>
        </a-col>
        <a-col :span="1">
          <a-tooltip placement="top">
            <template slot="title">
              <span>Friends</span>
            </template>
            <img :src="messageIcon" class="cursor-pointer" width="40px" alt />
          </a-tooltip>
        </a-col>
        <a-divider type="vertical" style="height: 3em" />
        <a-tooltip placement="top">
          <template slot="title">
            <span>Previous</span>
          </template>
          <a-button
            type="ghost"
            icon="left"
            style="height: 80%; padding-left: 5px; padding-right: 5px;"
          />
        </a-tooltip>
        <a-col :span="1" v-for="(item, index) in 18" :key="index">
          <a-tooltip placement="top">
            <template slot="title">
              <span>Item {{item}}</span>
            </template>
            <a-avatar
              class="cursor-pointer"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Facebook_Messenger_4_Logo.svg/600px-Facebook_Messenger_4_Logo.svg.png"
            ></a-avatar>
          </a-tooltip>
        </a-col>
        <a-tooltip placement="top">
          <template slot="title">
            <span>Next</span>
          </template>
          <a-button
            type="ghost"
            icon="right"
            style="height: 80%; padding-left: 5px; padding-right: 5px;"
          />
        </a-tooltip>
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
.cursor-pointer {
  cursor: pointer;
}

.main-layout {
  position: relative !important;
  max-height: 55px !important;
}

.item-layout {
  position: absolute;
  top: 0 !important;
  width: 100% !important;
  height: 100% !important;
  padding-left: 15px !important;
}

.cursor-pointer:hover {
  height: 110% !important;
  width: 110% !important;
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes bounce {
  0%, 100% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-5px);
  }
}
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.cursor-pointer:hover {
  -webkit-animation-name: bounce;
  animation-name: bounce;
}

.background-layout {
  background: #023b75 !important;
  opacity: 0.6 !important;
  height: 55px !important;
  border-radius: 25px 0 25px 0 !important;
}
</style>
