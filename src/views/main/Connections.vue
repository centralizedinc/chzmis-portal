<template>
  <div>
    <a-affix :offsetTop="50">
      <a-card :bodyStyle="{ padding: '1vh' }">
        <a-tabs
          class="connection-tabs"
          v-model="active_key"
          :defaultActiveKey="-1"
          tabPosition="top"
        >
          <a-tab-pane :key="-1" tab="Public" />

          <a-tab-pane v-for="item in connections" :key="item._id">
            <div slot="tab">
              <a-badge :dot="true">
                <a-avatar
                  shape="square"
                  :src="item.avatar ? item.avatar.location: null"
                  size="small"
                >{{item.name[0].toUpperCase()}}</a-avatar>
              </a-badge>
            </div>
          </a-tab-pane>

          <div slot="tabBarExtraContent" class="connection-extra-tabs">
            <a-tooltip>
              <span slot="title">New Connection</span>
              <a-icon type="plus" @click="newConnection" style="cursor: pointer" />
            </a-tooltip>
            <a-tooltip>
              <span slot="title">{{fullscreen?'Exit Fullscreen':'Fullscreen'}}</span>
              <a-icon
                :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'"
                @click="fullscreen=!fullscreen"
              />
            </a-tooltip>
            <a-tooltip>
              <span slot="title">Hide</span>
              <a-icon type="minus" @click="$store.commit('SHOW_PROFILE', false)" />
            </a-tooltip>
          </div>
        </a-tabs>
      </a-card>
    </a-affix>
    <post-section ref="post" class="messages-content" />
    <new-connection />
  </div>
</template>

<script>
import PostSection from "./comment/PostSection";
import NewConnection from "./NewConnection";

export default {
  components: {
    PostSection,
    NewConnection
  },
  data() {
    return {
      user: {
        avatar:
          "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
        full_name: "Cheka Khan"
      },
      visible: false,
      active_key: -1,
      loading: true,
      fullscreen: false
    };
  },
  watch: {
    active_key(val) {
      this.$store.commit("SET_ACTIVE_CONNECTION", val);
      console.log("this.$refs.post.loadPost() :", this.$refs.post.loadPost());
      this.$refs.post.loadPost();
    }
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
    connections() {
      // Remove closed connections
      const connections = this.deepCopy(
        this.$store.state.connections.connections
      ).filter(v => v.display);
      // prior favorite connections
      connections.sort((a, b) => {
        const x = this.checkFavorites(a._id),
          y = this.checkFavorites(b._id);
        return x === y ? 0 : x ? -1 : 1;
      });

      return connections;
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_CONNECTIONS")
      .then(result => {
        this.active_key = -1;
        console.log("done loading connections");
        // this.loadPublicPost();
        this.loading = false;
      })
      .catch(err => {
        console.log("GET_CONNECTIONSerr :", err);
        this.loading = false;
      });
  },
  methods: {
    newConnection() {
      this.$store.dispatch("OPEN_NEW_CONNECTION");
    }
  }
};
</script>

<style>
.connection-extra-tabs i {
  font-size: 3vh;
  margin-right: 1.5vh;
}

.connection-tabs .ant-tabs-bar .ant-tabs-tab {
  margin: 0;
  padding: 1vh 1.2vh;
}

.connection-tabs .ant-tabs-bar {
  margin: 0;
}

.messages-content {
  margin-top: 2vh;
}

.messages-content .ant-comment-inner {
  padding: 0px;
}

/* .messages-content {
  max-height: 400px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
} */

/* .messages-content::-webkit-scrollbar {
  display: none;
} */

.underline-on-hover:hover {
  text-decoration: underline;
}

.preview-uploads-card {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  width: 62px;
  height: 65px;
  float: left;
  margin: 0 3px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-uploads-card-view {
  position: absolute;
  top: 5px;
  width: 85%;
  height: 85%;
  text-align: center;
  color: black;
  font-weight: bold;
  background: #aaa;
  opacity: 0;
  cursor: pointer;
}

.preview-uploads-card-view:hover {
  opacity: 0.8;
}

.preview-uploads-card-close {
  position: absolute;
  right: -5px;
  top: -5px;
  color: red;
  cursor: pointer;
}

.preview-uploads-card-close:hover {
  font-size: 18px;
  font-weight: bold;
}

.modal-preview-image .ant-modal-body {
  padding: 0px !important;
}

.modal-preview-image img {
  height: 100%;
  width: 100%;
}

.tabs-title {
  text-align: center;
  font-weight: bold;
  background: #333;
  color: white;
}
</style>
