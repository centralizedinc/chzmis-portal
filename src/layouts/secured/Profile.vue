<template>
  <a-card style="margin: 10px; border-radius: 25px;">
    <p>
      <a-avatar :size="100" shape="circle" :src="user.avatar"></a-avatar>
      <br />
      <span class="profile-name">{{user.full_name}}</span>
      <br />
      <span>{{subscribers_count}} subscribers</span>
      <br />
      <span>{{active_channels_count}} active channels</span>
      <br />
      <span>{{connections_count}} connections</span>
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
    }
  }
};
</script>

<style>
.profile-items {
  font-weight: bold;
  text-align: left;
  font-size: 16px;
}

.profile-items i {
  padding-right: 5px;

}

.profile-name {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
}
</style>
