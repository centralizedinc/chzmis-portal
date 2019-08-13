<template>
  <a-card
    title="Connections"
    headStyle="padding: 0px; padding-left: 10px; 
        font-weight: bold; text-align: left; min-height: 0px;
        background: #3c3c3c; font-size: 18px; color: white;"
    bodyStyle="max-height: 350px; text-align: left !important;"
    style="border-radius: 0px 0px 25px 25px;"
  >
    <a-row>
      <a-col :span="12">
        <div style="border: 1px solid">
          <a-tabs type="card" tabPosition="top">
            <a-tab-pane class="messages-content" v-for="(item, index) in groups" :key="index">
              <span slot="tab">
                {{item.title}}
                <a-tooltip placement="topLeft">
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
              </span>
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
                    <a-menu-item v-for="group in items" :key="group.id">{{group.title}}</a-menu-item>
                  </a-menu>
                  <a-button block type="primary" ghost size="small">
                    SEND
                    <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </a-col>
            </a-row>
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
      current_post_id: 5
    };
  },
  methods: {
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
          author: "Mark",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
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
          author: "Mark",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: this.post_message,
          likes: [],
          dislikes: [],
          datetime: new Date(),
          group: e.key
        });
        this.current_post_id++;
        this.post_message = "";
      }
    }
  }
};
</script>

<style>
.messages-content {
  max-height: 230px;
  overflow-y: scroll;
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

button.btn-icon-only:hover {
  color: yellow !important;
}

.favorite-tab {
  color: yellow !important;
}
</style>
