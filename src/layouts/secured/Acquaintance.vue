<template>
  <a-card class="activities-card" :bodyStyle="{padding: '24px 10px', 'text-align': 'center', 'padding-top': '0px'}"
    :headStyle="layout_head_style">
    <div slot="title" class="title-head-style">
      <a-icon type="close" @click="$store.commit('SHOW_SETTINGS', false)" />
    </div>
    <p v-for="(friend, index) in friends" :key="index">
      <a-tooltip placement="left">
        <template slot="title">
          <span>{{friend.name}}</span>
        </template>
        <a-avatar :size="40" :src="friend.avatar" class="friend-avatar"></a-avatar>
      </a-tooltip>
    </p>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      friends: [
        {
          name: "Mark",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg"
        },
        {
          name: "Ariel",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg"
        },
        {
          name: "Kris",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg"
        },
        {
          name: "Godfrey",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg"
        }
      ]
    };
  }
};
</script>

<style>
.friend-avatar {
  cursor: pointer;
}

.friend-avatar:hover {
  height: 105% !important;
  width: 105% !important;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
}
@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: translateY(0);
  }
  50% {
    -webkit-transform: translateY(-5px);
  }
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
.friend-avatar:hover {
  -webkit-animation-name: bounce;
  animation-name: bounce;
}

.activities-card {
  width: 100% !important;
  height: 100% !important;
  border-radius: 25px 0 0 25px !important;
  background: #3c3c3c !important;
}

.activities-card .ant-card-body {
  width: 100% !important;
  height: 100% !important;
}
</style>
