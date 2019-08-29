<template>
  <a-card
    :loading="loading"
    :headStyle="main_layout_head_style"
    :bodyStyle="{'text-align': 'left', padding: '0', 'padding-top': '2px'}"
    class="connection-card"
  >
    <a-row slot="title">
      <a-col :span="23">Connections</a-col>
      <a-col :span="1" style="text-align: center">
        <a-icon type="minus" @click="$store.commit('SHOW_PROFILE', false)" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-tabs
          @change="getConnectionPosts"
          :activeKey="active_key"
          :defaultActiveKey="-1"
          type="card"
          tabPosition="top"
        >
          <!-- Public Connections -->
          <a-tab-pane :key="-1" tab="Public">
            <div v-if="loading_submit" class="demo-loading-container">
              <a-spin />
            </div>
            <a-row v-else>
              <a-col :span="hide_msgbox?23:12" style="border-right: 1px solid #eee;">
                <a-skeleton
                  style="padding: 20px"
                  :loading="loading_post"
                  active
                  avatar
                  :paragraph="{rows: 3}"
                />
                <post-section v-if="!loading_post" public class="messages-content"></post-section>
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
              <a-col :span="12" v-else style="padding: 15px; padding-left: 10px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" class="underline-on-hover" @click="hide_msgbox=true">
                      Hide
                      <a-icon type="right-circle" />
                    </a>
                  </a-col>
                  <a-col :span="2">
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </a-col>
                  <a-col :span="22">
                    <a-textarea v-model="post_message" placeholder="Post a message" :rows="3" />
                    <a-row type="flex" justify="space-between" style="padding: 10px;">
                      <a-col :span="3">
                        <a-tag @click="attachFile">Photo/Video</a-tag>
                      </a-col>
                      <a-col :span="4">
                        <a-button @click="send_message" block type="primary" size="small">SEND</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- Private Connections -->
          <a-tab-pane v-for="item in connections" :key="item._id">
            <span slot="tab">
              {{item.name}}
              <a-dropdown placement="bottomRight" style="margin-right: 0; margin-left: 8px">
                <a-icon type="caret-down" />
                <a-menu slot="overlay">
                  <a-menu-item key="0">
                    <a href="http://www.alipay.com/">Set as Favorite</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="1">
                    <a href="#" @click="updateConnection(item._id)">Update</a>
                  </a-menu-item>
                  <!-- <a-menu-divider /> 
                  <a-menu-item key="3">
                    <a href="http://www.taobao.com/">Delete</a>
                  </a-menu-item>-->
                </a-menu>
              </a-dropdown>
            </span>
            <div v-if="loading_submit" class="demo-loading-container">
              <a-spin />
            </div>
            <a-row v-else>
              <a-col :span="hide_msgbox?23:12" style="border-right: 1px solid #eee;">
                <a-skeleton
                  style="padding: 20px"
                  :loading="loading_post"
                  active
                  avatar
                  :paragraph="{rows: 3}"
                />
                <post-section v-if="!loading_post" class="messages-content"></post-section>
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
              <a-col :span="12" v-else style="padding: 15px; padding-left: 10px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" class="underline-on-hover" @click="hide_msgbox=true">
                      Hide
                      <a-icon type="right-circle" />
                    </a>
                  </a-col>
                  <a-col :span="2">
                    <a-avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                  </a-col>
                  <a-col :span="22">
                    <a-textarea v-model="post_message" placeholder="Post a message" :rows="3" />
                    <a-row type="flex" justify="space-between" style="padding: 10px;">
                      <a-col :span="3">
                        <a-tag @click="attachFile">Photo/Video</a-tag>
                      </a-col>
                      <a-col :span="4">
                        <a-button @click="send_message" block type="primary" size="small">SEND</a-button>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :span="24">
                    <a href="#" class="underline-on-hover">Members({{item.members.length}}):</a>
                  </a-col>
                  <a-col :span="24">
                    <a-tooltip v-for="(member, i) in item.members" :key="i">
                      <span
                        slot="title"
                      >{{getAuthorName(member.account_id).first}} {{getAuthorName(member.account_id).last}}</span>
                      <a-avatar :src="getAuthorAvatar(member.account_id)" />
                    </a-tooltip>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </a-tab-pane>

          <a-tooltip slot="tabBarExtraContent">
            <span slot="title">New Connection</span>
            <a-button type="primary" class="new-button" @click="newConnection">
              New
              <a-icon type="plus-circle" />
            </a-button>
          </a-tooltip>
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
      loading_submit: false
    };
  },
  computed: {
    connections() {
      return this.$store.state.connections.connections;
    }
  },
  created() {
    this.loading = true;
    this.$store
      .dispatch("GET_CONNECTIONS")
      .then(result => {
        this.active_key = -1;
        console.log("done loading connections");
        this.loading = false;
      })
      .catch(err => {
        console.log("GET_CONNECTIONSerr :", err);
        this.loading = false;
      });
    this.loadPublicPost();
  },
  methods: {
    getConnectionPosts(active_key) {
      this.active_key = active_key;
      if (active_key === -1) this.loadPublicPost();
      else {
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
          console.log("done loading public post");
          this.loading_post = false;
        })
        .catch(err => {
          console.log("GET_PUBLIC_POSTSerr :", err);
          this.loading_post = false;
        });
    },
    attachFile() {},
    send_message() {
      this.loading_submit = true;
      if (this.post_message) {
        var post = {
          author: "3",
          message: this.post_message,
          likes: [],
          dislikes: []
        };
        if (this.active_key === -1) post.is_public = true;
        else post.parent_id = this.active_key;
        this.$store.dispatch("POST_MESSAGE", post);
        this.post_message = "";
        this.loading_submit = false;
      }
    },
    newConnection() {
      this.$store.dispatch("OPEN_NEW_CONNECTION");
    },
    updateConnection(connection_id) {
      this.$store.dispatch("OPEN_CREATE_CONNECTION", {
        connection_id
      });
    }
  }
};
</script>

<style>
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
  border: 1px groove #aaa;
  border-radius: 0px 0px 25px 25px;
  box-shadow: 0px 1px;
  max-height: 400px;
}

.new-button {
  margin-right: 10px;
}

.underline-on-hover:hover {
  text-decoration: underline;
}
</style>
