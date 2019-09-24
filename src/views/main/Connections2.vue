<template>
  <a-card
    :loading="loading"
    :headStyle="main_layout_head_style"
    :bodyStyle="{'text-align': 'left', padding: '0', 'padding-top': '2px'}"
    class="connection-card border-layout"
  >
    <a-row>
      <a-col :span="24">
        <a-tabs
          class="connection-tabs"
          v-model="active_key"
          :defaultActiveKey="-1"
          tabPosition="top"
        >
          <!-- Public Connections -->
          <a-tab-pane :key="-1" style="color: #333" tab="Public">
            <div v-if="loading_submit" class="demo-loading-container">
              <a-spin />
            </div>
            <a-row>
              <a-col :span="hide_msgbox?23:14" style="border-right: 1px solid #eee;">
                <a-skeleton
                  style="padding: 20px"
                  :loading="loading_post"
                  active
                  avatar
                  :paragraph="{rows: 3}"
                />
                <post-section
                  v-if="!loading_post"
                  :reload_new_post="loading_submit"
                  public
                  class="messages-content"
                ></post-section>
              </a-col>
              <a-col :span="1" v-if="hide_msgbox" class="cons-icon">
                <p>
                  <a-tooltip placement="left">
                    <template slot="title">
                      <span>Show</span>
                    </template>
                    <a-icon type="left-circle" @click="hide_msgbox=false" />
                  </a-tooltip>
                </p>
              </a-col>
              <a-col :span="10" v-else style="padding: 15px; padding-left: 10px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" class="underline-on-hover" @click="hide_msgbox=true">
                      Hide
                      <a-icon type="right-circle" />
                    </a>
                  </a-col>
                  <a-col :span="2">
                    <a-avatar :src="getLoginUser().avatar">{{getLoginUser("initial")}}</a-avatar>
                  </a-col>
                  <a-col :span="21" :offset="1">
                    <a-textarea
                      v-model="post_message"
                      @keypress.enter="send_message"
                      placeholder="Post a message"
                      :rows="3"
                    />
                    <a-row type="flex" justify="space-between" style="padding: 10px;">
                      <a-col :span="3">
                        <a-upload
                          :multiple="true"
                          :showUploadList="false"
                          :beforeUpload="attachFile"
                        >
                          <a-button
                            type="default"
                            :loading="loading_submit"
                            size="small"
                          >Photo / Video</a-button>
                        </a-upload>
                      </a-col>
                      <a-col :span="4">
                        <a-button
                          @click="send_message"
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
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- Private Connections -->
          <a-tab-pane v-for="item in connections" :key="item._id">
            <div slot="tab">
              <a-dropdown placement="bottomCenter">
                <a-avatar
                  :src="item.avatar ? item.avatar.location: null"
                  size="small"
                >{{item.name[0].toUpperCase()}}</a-avatar>
                <a-menu slot="overlay">
                  <a-menu-item key="0" disabled class="tabs-title">{{item.name}}</a-menu-item>
                  <a-menu-item
                    key="1"
                    v-if="checkFavorites(item._id)"
                    @click="removeFromFavorites(item._id)"
                  >Remove from Favorites</a-menu-item>
                  <a-menu-item key="2" v-else @click="addToFavorites(item._id)">Add to Favorites</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3" @click="updateConnection(item)">Update</a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="4" @click="closeConnection(item._id)">Close</a-menu-item>
                  <!-- <a-menu-divider /> 
                  <a-menu-item key="3">
                    <a href="http://www.taobao.com/">Delete</a>
                  </a-menu-item>-->
                </a-menu>
              </a-dropdown>
            </div>
            <div v-if="loading_submit" class="demo-loading-container">
              <a-spin />
            </div>
            <a-row>
              <a-col :span="hide_msgbox?23:14" style="border-right: 1px solid #eee;">
                <a-skeleton
                  style="padding: 20px"
                  :loading="loading_post"
                  active
                  avatar
                  :paragraph="{rows: 3}"
                />
                <post-section
                  v-if="!loading_post"
                  :reload_new_post="loading_submit"
                  class="messages-content"
                ></post-section>
              </a-col>
              <a-col :span="1" v-if="hide_msgbox" class="cons-icon">
                <p>
                  <a-tooltip placement="left">
                    <template slot="title">
                      <span>Show</span>
                    </template>
                    <a-icon type="left-circle" @click="hide_msgbox=false" />
                  </a-tooltip>
                </p>
              </a-col>
              <a-col :span="10" v-else style="padding: 15px; padding-left: 10px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" class="underline-on-hover" @click="hide_msgbox=true">
                      Hide
                      <a-icon type="right-circle" />
                    </a>
                  </a-col>
                  <a-col :span="2">
                    <a-avatar :src="getLoginUser().avatar">{{getLoginUser("initial")}}</a-avatar>
                  </a-col>
                  <a-col :span="21" :offset="1">
                    <a-textarea
                      v-model="post_message"
                      @keypress.enter="send_message"
                      placeholder="Post a message"
                      :rows="3"
                    />
                    <a-row type="flex" justify="space-between" style="padding: 10px;">
                      <a-col :span="3">
                        <a-upload
                          :multiple="true"
                          :showUploadList="false"
                          :beforeUpload="attachFile"
                        >
                          <a-button
                            type="default"
                            :loading="loading_submit"
                            size="small"
                          >Photo / Video</a-button>
                        </a-upload>
                      </a-col>
                      <a-col :span="4">
                        <a-button
                          @click="send_message"
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
                  <a-col :span="24">
                    <a href="#" class="underline-on-hover">Members({{item.members.length}}):</a>
                  </a-col>
                  <a-col :span="24">
                    <a-tooltip v-for="(member, i) in item.members" :key="i">
                      <span
                        slot="title"
                      >{{getAuthorName(member.account_id).first}} {{getAuthorName(member.account_id).last}}</span>
                      <a-avatar
                        :src="getAuthorAvatar(member.account_id)"
                      >{{getAuthorName(member.account_id).first ? getAuthorName(member.account_id).first[0].toUpperCase() : "?"}}</a-avatar>
                    </a-tooltip>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
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
        <new-connection></new-connection>
      </a-col>
    </a-row>
  </a-card>
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
      loading_post: false,
      hide_msgbox: false,
      loading: true,
      loading_submit: false,
      post_file_list: [],
      post_file_images: [],
      preview_file_list: {},
      fullscreen: false
    };
  },
  computed: {
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
  watch: {
    active_connection(val) {
      this.active_key = val;
    },
    active_key(val) {
      console.log("active_key(val) :", val);
      this.getConnectionPosts(val);
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_CONNECTIONS")
      .then(result => {
        this.active_key = -1;
        console.log("done loading connections");
        this.loadPublicPost();
        this.loading = false;
      })
      .catch(err => {
        console.log("GET_CONNECTIONSerr :", err);
        this.loading = false;
      });
  },
  methods: {
    getConnectionPosts(active_key) {
      // this.active_key = active_key;
      this.post_file_images = [];
      this.post_file_list = [];
      this.preview_file_list = {};
      console.log("active_key :", active_key);
      if (active_key === -1) {
        this.$store.commit("SET_ACTIVE_CONNECTION", -1);
        this.loadPublicPost();
      } else {
        this.loading_post = true;
        this.$store.commit("SET_ACTIVE_CONNECTION", active_key);
        this.$store
          .dispatch("GET_CONNECTION_POSTS", { refresh: true })
          .then(result => {
            console.log("done loading private post");
            this.loading_post = false;
          })
          .catch(err => {
            console.log("GET_CONNECTION_POSTSerr :", err);
            this.loading_post = false;
          });
      }
    },
    loadPublicPost() {
      this.loading_post = true;
      this.$store
        .dispatch("GET_PUBLIC_POSTS")
        .then(result => {
          console.log("done loading public post", result);
          this.loading_post = false;
        })
        .catch(err => {
          console.log("GET_PUBLIC_POSTSerr :", err);
          this.loading_post = false;
        });
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
    send_message() {
      this.loading_submit = true;
      if (this.post_message) {
        var post = {
          message: this.post_message
        };
        var connection_id = this.active_key;
        if (this.active_key === -1) {
          connection_id = "";
          post.is_public = true;
        } else post.parent_id = this.active_key;

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
            upload_data: { connection_id, form_data },
            post
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
    newConnection() {
      this.$store.dispatch("OPEN_NEW_CONNECTION");
    },
    updateConnection(connection) {
      this.$store.dispatch("OPEN_CREATE_CONNECTION", connection);
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    addToFavorites(parent_id) {
      this.$store.dispatch("ADD_TO_FAVORITES", { type: 0, parent_id });
    },
    removeFromFavorites(parent_id) {
      this.$store.dispatch("REMOVE_FROM_FAVORITES", { parent_id });
    },
    closeConnection(parent_id) {
      const index = this.connections.findIndex(x => x._id === parent_id);
      const active_key =
        this.active_key === parent_id
          ? index !== -1
            ? this.connections[index + 1]
              ? this.connections[index + 1]._id
              : this.connections[index - 1]
              ? this.connections[index - 1]._id
              : -1
            : -1
          : this.active_key;
      this.$store.commit("ADD_RECENTS", { type: 0, parent_id });
      this.$store.commit("OPEN_CONNECTION", { parent_id, show: false });
      this.active_key = active_key;
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

.messages-content {
  max-height: 400px;
  overflow-y: scroll;
  padding-right: 2px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.messages-content::-webkit-scrollbar {
  display: none;
}

.ant-tabs-bar {
  margin: 0;
}

.cons-icon {
  text-align: center;
  margin-top: 5px;
}

.cons-icon i {
  font-size: 24px;
  color: blue;
  cursor: pointer;
}

.cons-icon i:hover {
  font-size: 30px;
}

.connection-card {
  max-height: 400px;
}

.new-button {
  margin-right: 10px;
}

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
