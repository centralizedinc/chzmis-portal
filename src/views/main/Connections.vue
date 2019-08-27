<template>
  <a-card
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
            <a-row>
              <a-col :span="hide_msgbox?23:12" style="border-right: 1px solid #eee;">
                <post-section :loading_data="loading_post" public class="messages-content"></post-section>
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
              <a-col :span="12" v-else style="padding: 15px; padding-left: 5px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" style="text-decoration: underline;" @click="hide_msgbox=true">
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
          <a-tab-pane v-for="(item, index) in connections" :key="index">
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
                    <a href="http://www.taobao.com/">Update</a>
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="3">
                    <a href="http://www.taobao.com/">Delete</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
            <a-row>
              <a-col :span="hide_msgbox?23:12" style="border-right: 1px solid #eee;">
                <post-section :loading_data="loading_post" class="messages-content"></post-section>
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
              <a-col :span="12" v-else style="padding: 15px; padding-left: 5px; padding-top: 5px;">
                <a-row>
                  <a-col :span="24" style="text-align: right">
                    <a href="#" style="text-decoration: underline;" @click="hide_msgbox=true">
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

          <a-button slot="tabBarExtraContent" style="margin-right: 10px" @click="newConnection">New <a-icon type="plus-circle" /></a-button>
        </a-tabs>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import PostSection from "./comment/PostSection";

export default {
  components: {
    PostSection
  },
  data() {
    return {
      active_key: -1,
      post_message: "",
      loading_post: false,
      hide_msgbox: false
    };
  },
  computed: {
    connections() {
      return this.$store.state.connections.connections;
    }
  },
  created() {
    this.$store
      .dispatch("GET_CONNECTIONS")
      .then(result => {
        this.active_key = -1;
        console.log("done loading connections");
        console.log("connections :", result);
      })
      .catch(err => {
        console.log("GET_CONNECTIONSerr :", err);
      });
    this.loadPublicPost();
  },
  methods: {
    getConnectionPosts(index) {
      this.active_key = index;
      if (index === -1) this.loadPublicPost();
      else {
        this.loading_post = true;
        this.$store.commit(
          "SET_ACTIVE_CONNECTION",
          this.connections[index]._id
        );
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
      if (this.post_message) {
        var post = {
          id: new Date().getTime(),
          author: "acc1",
          message: this.post_message,
          likes: [],
          dislikes: []
        };
        if (this.active_key === -1) post.is_public = true;
        else post.parent_id = this.connections[this.active_key].id;
        this.$store.dispatch("POST_MESSAGE", post);
        this.post_message = "";
      }
    },
    newConnection(){

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
</style>
