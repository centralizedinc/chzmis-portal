<template>
  <a-card
    :headStyle="main_layout_head_style"
    :bodyStyle="{'max-height': '350px', 'text-align': 'left'}"
    style="border-radius: 0px 0px 25px 25px;"
  >
    <a-row slot="title" >
      <a-col :span="23">Connections</a-col>
      <a-col :span="1" style="text-align: right">
        <a-icon type="close" @click="$store.commit('SHOW_PROFILE', false)" />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <div style="border-right: 1px solid #eee;min-height: 190px;">
          <a-tabs
            type="card"
            tabPosition="top"
          >
            <!-- Public Connections -->
            <!-- <a-tab-pane
              class="messages-content"
              :key="-1"
              tab="Public"
            >
              <template v-if="public_posts.length">
                <comment-section
                  v-for="(item, index) in public_posts"
                  :key="index"
                  :author="item.author"
                  :avatar="item.avatar"
                  :content="item.content"
                  :likes="item.likes.length"
                  :dislikes="item.dislikes.length"
                  @like="like(item.id)"
                  @dislike="dislike(item.id)"
                  @comment="comment"
                  :action="getUserAction(item)"
                  :datetime="item.datetime"
                  :postid="item.id"
                  :groupid="item.group"
                  show-comment
                >
                  <comment-section
                    slot="comment"
                    v-for="(comment_item, comment_index) in item.comments"
                    :key="comment_index"
                    :author="comment_item.author"
                    :avatar="comment_item.avatar"
                    :content="comment_item.content"
                    :likes="comment_item.likes.length"
                    :dislikes="comment_item.dislikes.length"
                    @like="like(comment_item.id)"
                    @dislike="dislike(comment_item.id)"
                    :postid="item.id"
                    :action="getUserAction(comment_item)"
                    :datetime="comment_item.datetime"
                  ></comment-section>
                </comment-section>
              </template>
              <span class="no-data-message" v-else>No Post.</span>
            </a-tab-pane> -->



            <!-- Private Connections -->
            <a-tab-pane
              class="messages-content"
              v-for="(item, index) in groups"
              :key="index"
            >
              <span slot="tab">
                {{item.title}}
                <a-dropdown placement="bottomRight" style="margin-right: 0; margin-left: 8px">
                  <a-icon type="ellipsis"/>
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
                <!-- <a-tooltip placement="topLeft">
                  <template slot="title">
                    <span>{{item.favorite ? 'Remove from favorites' : 'Add to favorites'}}</span>
                  </template>
                  <a-button class="btn-icon-only" @click="setFavorite(index)">
                    <a-icon
                      type="star"
                      :theme="item.favorite ? 'filled' : 'outlined'"
                      :class="item.favorite && 'favorite-tab'"
                    />
                  </a-button>
                </a-tooltip>
                <a-tooltip placement="topLeft">
                  <template slot="title">
                    <span>Close</span>
                  </template>
                  <a-button class="btn-icon-only" @click="setActiveConnection(item, false)">
                    <a-icon type="close" style="margin: 0" />
                  </a-button>
                </a-tooltip> -->
              </span>
              <span class="no-data-message" v-if="isEmptyMessages(item.id)">No Post.</span>
              <comment-section
                v-for="(item, index) in getPostMessages(item.id)"
                :key="index"
                :author="item.author"
                :avatar="item.avatar"
                :content="item.content"
                :likes="item.likes.length"
                :dislikes="item.dislikes.length"
                @like="like(item.id)"
                @dislike="dislike(item.id)"
                @comment="comment"
                :action="getUserAction(item)"
                :datetime="item.datetime"
                :postid="item.id"
                :groupid="item.group"
                show-comment
              >
                <comment-section
                  slot="comment"
                  v-for="(comment_item, comment_index) in item.comments"
                  :key="comment_index"
                  :author="comment_item.author"
                  :avatar="comment_item.avatar"
                  :content="comment_item.content"
                  :likes="comment_item.likes.length"
                  :dislikes="comment_item.dislikes.length"
                  @like="like(comment_item.id)"
                  @dislike="dislike(comment_item.id)"
                  :postid="item.id"
                  :action="getUserAction(comment_item)"
                  :datetime="comment_item.datetime"
                ></comment-section>
              </comment-section>
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-col>
      <a-col :span="12">
        <a-row>
          <a-col :span="2">
            <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-col>
          <a-col :span="22">
            <a-textarea v-model="post_message" placeholder="Post a message" :rows="3" />
            <a-row type="flex" justify="space-between" style="padding: 10px;">
              <a-col :span="3">
                <a-tag @click="attachFile">Photo/Video</a-tag>
              </a-col>
              <a-col :span="4">
                <!-- <a-button type="primary" size="small" block @click="send_message">SEND</a-button> -->
                <a-dropdown>
                  <a-menu slot="overlay" @click="send_message">
                    <a-menu-item v-for="group in groups" :key="group.id">{{group.title}}</a-menu-item>
                  </a-menu>
                  <a-button block type="primary" size="small">
                    SEND
                    <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row style="text-align: center">
          <a-col
            style="padding: 2px 0"
            :xs="{ span: 24 }"
            :md="{ span: 12 }"
            :lg="{ span: 8 }"
            v-for="(item, index) in groups"
            :key="index"
          >
            <a-button
              :type="item.favorite ? 'primary': 'default'"
              @click="setActiveConnection(item)"
            >{{item.title}}</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import CommentSection from "./CommentSection";
import comments from "./comments.json";
import groups from "./groups.json";

export default {
  components: {
    CommentSection
  },
  data() {
    return {
      post_message: "",
      groups,
      comments,
      current_post_id: 5,
      active_groups: [],
      active_key: 0
    };
  },
  created() {
    this.active_groups = [];
    this.post_message = "";
    this.active_key = 0;
  },
  methods: {
    changeTab(e) {
      console.log("e :", e);
      console.log("this.active_groups.length :", this.active_groups.length);
      this.active_key = e;
      if (this.active_key >= this.active_groups.length) {
        this.active_key = this.active_groups.length - 1;
      }
      console.log("this.active_key :", this.active_key);
    },
    setActiveConnection(item, bool) {
      var index = this.groups.findIndex(x => x.id === item.id);
      if (index === -1) {
        console.log("invalid index");
        return;
      }
      if (bool !== null && bool !== undefined) {
        this.groups[index].favorite = bool;
      } else {
        this.groups[index].favorite = !this.groups[index].favorite;
      }
      var key = -1;
      if (this.groups[index].favorite) {
        this.active_groups.push(this.groups[index]);
      } else {
        for (let i = 0; i < this.active_groups.length; i++) {
          var group = this.active_groups[i];
          if (group.id === this.groups[index].id) {
            this.active_groups.splice(i, 1);
            key = i;
            break;
          }
        }
      }

      if (key < 0) {
        var active_key = this.active_groups.findIndex(
          x => x.id === this.groups[index].id
        );
        this.changeTab(active_key);
      } else {
        this.changeTab(key);
      }
    },
    isEmptyMessages(group_id) {
      if (!group_id) return true;
      var comments = this.comments.find(x => x.group === group_id);
      return !comments;
    },
    getPostMessages(group_id) {
      var post_messages = [];
      this.deepCopy(this.comments).forEach(message => {
        if (message.group === group_id) {
          if (message.post_id) {
            // comments from post
            var index = post_messages.findIndex(x => x.id === message.post_id);
            if (index >= 0) {
              if (post_messages[index].comments) {
                post_messages[index].comments.push(message);
              } else {
                post_messages[index].comments = [message];
              }
            }
          } else {
            // new post
            message.showcomment = false;
            post_messages.push(message);
          }
        }
      });
      // sort date
      post_messages.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime);
      });
      return post_messages;
    },
    openCommentBox(post_id) {
      var index = this.comments.findIndex(x => x.id === post_id);
      if (index > -1) this.comments[index].showcomment = true; // Let say that 8 is the current user id
      console.log("item :", this.comments[index]);
    },
    callback(key) {
      console.log(key);
    },
    setFavorite(index) {
      console.log("item :", index);
      this.groups[index].favorite = !this.groups[index].favorite;
      this.groups.sort(function(x, y) {
        return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
      });
    },
    getUserAction(item) {
      return item.likes.includes(8) ? 1 : item.dislikes.includes(8) ? 0 : null;
    },
    attachFile() {},
    like(post_id) {
      var index = this.comments.findIndex(x => x.id === post_id);
      if (index > -1 && !this.comments[index].likes.includes(8)) {
        this.comments[index].likes.push(8); // Let say that 8 is the current user id
        var index2 = this.comments[index].dislikes.findIndex(x => x === 8);
        if (index2 > -1) {
          this.comments[index].dislikes.splice(index2, 1);
        }
      }
    },
    dislike(post_id) {
      var index = this.comments.findIndex(x => x.id === post_id);
      if (index > -1 && !this.comments[index].dislikes.includes(8)) {
        this.comments[index].dislikes.push(8); // Let say that 8 is the current user id
        var index2 = this.comments[index].likes.findIndex(x => x === 8);
        if (index2 > -1) {
          this.comments[index].likes.splice(index2, 1);
        }
      }
    },
    comment(reply) {
      console.log("this.comments :", this.comments);
      if (reply.message) {
        this.comments.push({
          id: this.current_post_id.toString(),
          author: "Cheka Khan",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
          content: reply.message,
          likes: [],
          dislikes: [],
          datetime: new Date(),
          post_id: reply.post_id,
          group: reply.group_id
        });
        this.current_post_id++;
      }
      console.log("this.messages2 :", this.comments);
    },
    send_message(e) {
      if (this.post_message) {
        this.comments.push({
          id: this.current_post_id.toString(),
          author: "Cheka Khan",
          avatar:
            "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
          content: this.post_message,
          likes: [],
          dislikes: [],
          datetime: new Date(),
          group: e.key
        });
        var connection = this.groups.find(x => x.id === e.key);
        this.setActiveConnection(connection, true)
        this.current_post_id++;
        this.post_message = "";
      }
    }
  }
};
</script>

<style>
.no-data-message {
  font-size: 24px;
  color: #ddd;
  font-style: italic;
  font-weight: bold;
}

.messages-content {
  max-height: 230px;
  overflow-y: scroll;
  padding-right: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.messages-content::-webkit-scrollbar {
  display: none;
}

.btn-icon-only {
  background: none !important;
  border: none !important;
  padding: 0 0 0 5px !important;
}
/* 
button.btn-icon-only:hover {
  color: yellow !important;
} */

.favorite-tab {
  color: yellow !important;
}
</style>
