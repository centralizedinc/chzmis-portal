<template>
  <div class="card-container">
    <a-card :bodyStyle="{'padding-bottom': '0px'}" style="margin-bottom: 10px;">
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
    </a-card>
    <a-tabs type="card" tabPosition="top">
      <a-tab-pane v-for="(item, index) in items" :key="index">
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
</template>

<script>
import CommentSection from "./CommentSection";
import messages from "./messages.json";
import items from "./items.json";

export default {
  components: {
    CommentSection
  },
  data() {
    return {
      post_message: "",
      items,
      messages,
      current_post_id: 5
    };
  },
  created() {
    this.items.sort(function(x, y) {
      return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
    });
  },
  methods: {
    getPostMessages(group_id) {
      var post_messages = [];
      this.deepCopy(this.messages).forEach(message => {
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
      var index = this.messages.findIndex(x => x.id === post_id);
      if (index > -1) this.messages[index].showcomment = true; // Let say that 8 is the current user id
      console.log("item :", this.messages[index]);
    },
    callback(key) {
      console.log(key);
    },
    setFavorite(index) {
      console.log("item :", index);
      this.items[index].favorite = !this.items[index].favorite;
      this.items.sort(function(x, y) {
        return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
      });
    },
    getUserAction(item) {
      return item.likes.includes(8) ? 1 : item.dislikes.includes(8) ? 0 : null;
    },
    attachFile() {},
    like(post_id) {
      var index = this.messages.findIndex(x => x.id === post_id);
      if (index > -1 && !this.messages[index].likes.includes(8)) {
        this.messages[index].likes.push(8); // Let say that 8 is the current user id
        var index2 = this.messages[index].dislikes.findIndex(x => x === 8);
        if (index2 > -1) {
          this.messages[index].dislikes.splice(index2, 1);
        }
      }
    },
    dislike(post_id) {
      var index = this.messages.findIndex(x => x.id === post_id);
      if (index > -1 && !this.messages[index].dislikes.includes(8)) {
        this.messages[index].dislikes.push(8); // Let say that 8 is the current user id
        var index2 = this.messages[index].likes.findIndex(x => x === 8);
        if (index2 > -1) {
          this.messages[index].likes.splice(index2, 1);
        }
      }
    },
    comment(reply) {
      console.log("this.messages :", this.messages);
      if (reply.message) {
        this.messages.push({
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
      console.log("this.messages2 :", this.messages);
    },
    send_message(e) {
      if (this.post_message) {
        this.messages.push({
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
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
  text-align: left !important;
  border-radius: 25px !important;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  /* height: 120px; */
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
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
