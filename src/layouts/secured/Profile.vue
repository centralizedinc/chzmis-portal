<template>
  <a-card class="profile-style" 
    :headStyle="main_layout_head_style"
    :bodyStyle="{padding: '10px'}">
    <!-- <div slot="title">
      <a-icon type="minus" style="float: right; margin-right: 5px;" @click="$store.commit('SHOW_PROFILE', false)" />
    </div>-->
    <p style="text-align: center">
      <a-avatar
        :size="80"
        style="font-size: 50px;font-weight: bold;     border: 3px solid #fff;"
        shape="circle"
        :src="getLoginUser().avatar"
      >{{getLoginUser("initial")}}</a-avatar>
      <br />
      <br />
      <span class="profile-name">{{getLoginUser("fullname")}}</span>
      <br />
      <span style="font-size: 12px">{{subscribers_count}} subscribers</span>
      <br />
      <span style="font-size: 12px">{{active_channels_count}} active channels</span>
      <br />
      <span style="font-size: 12px">{{connections_count}} connections</span>
    </p>
    <p v-for="(item, index) in items" :key="index" class="profile-items">
      <a-icon :type="item.icon" />
      {{item.title}}
    </p>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        avatar:
          "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
        full_name: "Cheka Khan"
      },
      items: [
        {
          title: "Profile",
          icon: "user"
        },
        {
          title: "Groups",
          icon: "team"
        },
        {
          title: "Subscribers",
          icon: "heart"
        },
        {
          title: "Photos",
          icon: "picture"
        },
        {
          title: "Videos",
          icon: "video-camera"
        },
        {
          title: "Channels",
          icon: "desktop"
        }
      ]
    };
  },
  computed: {
    subscribers_count() {
      return 10000;
    },
    active_channels_count() {
      return 2;
    },
    connections_count() {
      return 20;
    },
    active_user() {
      // return this.$store.state.active_user;
      console.log("active_user account :", account);
      if (this.$store.state.users.active_user) {
        return this.getUsers(account);
      } else {
        this.getLoginUser();
      }
    }
  }
};
</script>

<style>
.profile-style {
  /* border: 1px solid rgba(0,0,0,.4); width: 216px; */
  /* width: 216px;
  border-radius: 25px !important; */
  margin-right: 3vh !important;
  box-shadow: 0px 0px 10px 2px #88888847;
  background-image: linear-gradient(
    to bottom,
    #0450a0 0%,
    #fff7e2 45%,
    #fff 50%
  ) !important;
  border: none !important;
}
.profile-items {
  font-weight: bold;
  text-align: left;
  /* font-size: 12px; */
}

.profile-items i {
  padding-right: 5px;
}

.profile-name {
  font-size: 15px;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
