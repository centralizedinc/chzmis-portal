<template>
  <div>
    <!-- Connection Tabs -->
    <a-affix :offsetTop="40">
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
    <!-- Connection Details -->
    <a-affix v-if="active_key !== -1" :offsetTop="show_tabs ? 95:40">
      <a-card>
        <div slot="title">
          <span>{{getConnectionById(active_key).name}}</span>
          <div style="float: right;">
            <a-dropdown placement="bottomCenter" :trigger="['click']">
              <a-tooltip>
                <span slot="title">Settings</span>
                <a-icon type="setting" style="cursor: pointer;" />
              </a-tooltip>
              <a-menu slot="overlay">
                <a-menu-item
                  key="0"
                  v-if="checkFavorites()"
                  @click="removeFromFavorites()"
                >Remove from Favorites</a-menu-item>
                <a-menu-item key="1" v-else @click="addToFavorites()">Add to Favorites</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="2" @click="updateConnection()">Update</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="closeConnection()">Close</a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
        </div>
      </a-card>
    </a-affix>
    <!-- Message Box -->
    <a-card>
      <a-row>
        <a-col :span="1">
          <a-avatar :src="getLoginUser().avatar">{{getLoginUser("initial")}}</a-avatar>
        </a-col>
        <a-col :span="22" :offset="1">
          <a-textarea
            v-model="post_message"
            @keypress.enter="sendMessage"
            placeholder="Post a message"
            :rows="3"
          />
          <a-row type="flex" justify="space-between" style="padding: 10px;">
            <a-col :span="3">
              <a-upload :multiple="true" :showUploadList="false" :beforeUpload="attachFile">
                <a-button type="default" :loading="loading_submit" size="small">Photo / Video</a-button>
              </a-upload>
            </a-col>
            <a-col :span="4">
              <a-button
                @click="sendMessage"
                :loading="loading_submit"
                block
                type="primary"
                size="small"
              >SEND</a-button>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="24">
          <template v-for="(img, index) in post_file_images">
            <a-tooltip :key="index">
              <span slot="title">{{img.name}}</span>
              <div class="preview-uploads-card">
                <a-icon
                  class="preview-uploads-card-close"
                  type="close-circle"
                  @click="removeFileList(index)"
                ></a-icon>
                <img :src="img.imageUrl" width="50" />
                <div
                  :key="`preview${index}`"
                  class="preview-uploads-card-view"
                  @click="preview_file_list=img"
                >
                  <span style="line-height: 4;">View</span>
                </div>
              </div>
            </a-tooltip>
          </template>
          <a-modal
            :width="300"
            :visible="preview_file_list.imageUrl && preview_file_list.imageUrl !== ''"
            title="Preview Image"
            :footer="null"
            class="modal-preview-image"
            @cancel="preview_file_list={}"
          >
            <a-tooltip>
              <span slot="title">{{preview_file_list.name}}</span>
              <img :src="preview_file_list.imageUrl" :alt="preview_file_list.name" />
            </a-tooltip>
          </a-modal>
        </a-col>
      </a-row>
    </a-card>
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
      active_key: -1,
      post_message: "",
      loading_submit: false,
      loading: true,
      fullscreen: false,
      show_tabs: false,
      scrollY_value: 0,
      post_file_list: [],
      post_file_images: [],
      preview_file_list: {}
    };
  },
  watch: {
    active_key(key) {
      this.$store.commit("SET_ACTIVE_CONNECTION", key);
      console.log("this.$refs.post.loadPost() :", this.$refs.post.loadPost());
      this.$refs.post.loadPost();
    },
    active_connection(key) {
      this.active_key = key;
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
    },
    active_connection() {
      return this.$store.state.connections.active_connection;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
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
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    newConnection() {
      this.$store.dispatch("OPEN_NEW_CONNECTION");
    },
    handleScroll(e) {
      this.show_tabs = this.scrollY_value > window.scrollY;
      this.scrollY_value = window.scrollY;
    },
    updateConnection() {
      const connection = this.connections.find(v => v._id === this.active_key);
      this.$store.dispatch("OPEN_CREATE_CONNECTION", connection);
    },
    addToFavorites() {
      this.$store.dispatch("ADD_TO_FAVORITES", {
        type: 0,
        parent_id: this.active_key
      });
    },
    removeFromFavorites() {
      this.$store.dispatch("REMOVE_FROM_FAVORITES", {
        parent_id: this.active_key
      });
    },
    closeConnection() {
      const index = this.connections.findIndex(x => x._id === this.active_key);
      const active_key =
        this.active_key === this.active_key
          ? index !== -1
            ? this.connections[index + 1]
              ? this.connections[index + 1]._id
              : this.connections[index - 1]
              ? this.connections[index - 1]._id
              : -1
            : -1
          : this.active_key;
      this.$store.commit("ADD_RECENTS", {
        type: 0,
        parent_id: this.active_key
      });
      this.$store.commit("OPEN_CONNECTION", {
        parent_id: this.active_key,
        show: false
      });
      this.active_key = active_key;
    },
    sendMessage() {
      this.loading_submit = true;
      if (this.post_message || this.post_file_list.length) {
        // if attachment is not null
        var form_data = null;
        if (this.post_file_list.length) {
          form_data = new FormData();
          this.post_file_list.forEach(file => {
            form_data.append("files", file, file.name);
          });
        }
        this.$store
          .dispatch("POST_MESSAGE", {
            form_data,
            message: this.post_message
          })
          .then(result => {
            this.post_message = "";
            this.post_file_list = [];
            this.post_file_images = [];
            this.loading_submit = false;
          })
          .catch(err => {
            console.error(err);
            this.loading_submit = false;
          });
      }
    },
    attachFile(file) {
      this.post_file_list = [...this.post_file_list, file];
      this.getBase64(file, imageUrl => {
        this.post_file_images = [
          ...this.post_file_images,
          { imageUrl, name: file.name }
        ];
      });
    },
    removeFileList(i) {
      this.post_file_list.splice(i, 1);
      this.post_file_images.splice(i, 1);
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
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
