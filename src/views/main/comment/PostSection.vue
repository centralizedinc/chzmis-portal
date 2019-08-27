<template>
  <div>
    <span class="no-data-message" v-if="!loading && !loading_data && !posts.length">No Post.</span>
    <div
      class="post-container"
      v-infinite-scroll="handleLoadingPost"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="5"
    >
      <a-comment v-for="(item, index) in posts" :key="index" style="margin-bottom: 5px;">
        <template slot="actions">
          <span>
            <a-tooltip title="Like">
              <a-icon
                type="like"
                :theme="isLike(item.likes) ? 'filled' : 'outlined'"
                @click="like(item, 0)"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{item.likes.length}}</span>
          </span>
          <span>
            <a-tooltip title="Dislike">
              <a-icon
                type="dislike"
                :theme="isDislike(item.dislikes) ? 'filled' : 'outlined'"
                @click="dislike(item, 0)"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{item.dislikes.length}}</span>
          </span>
          <span>Comment</span>
          <span @click="showComments(item._id)" v-if="item.show_comment<=0">
            <a-icon type="double-right" />Show Comments
          </span>
          <span @click="hideComments(item._id)" v-else>
            <a-icon type="double-left" />Hide Comments
          </span>
        </template>

        <a slot="author">{{getAuthorName(item.author).first}} {{getAuthorName(item.author).last}}</a>

        <a-avatar slot="avatar" :src="getAuthorAvatar(item.author)" />

        <p slot="content">{{item.message}}</p>

        <a-tooltip
          v-if="item.date_created"
          slot="datetime"
          :title="moment(item.date_created).format('YYYY-MM-DD HH:mm:ss')"
        >
          <span>{{moment(item.date_created).fromNow()}}</span>
        </a-tooltip>
        <!-- <a href="#" style="text-decoration: underline">Show Comments</a> -->
        <comment-section :show_comments="show_comments" :post="item._id"></comment-section>

        <a-input placeholder="Write a reply" @keydown.enter="sendReply($event, item.id)"></a-input>
      </a-comment>
      <div v-if="!loading && !loading_data && (busy || !posts.length)" class="done-loading-post">
        Done loading. Try to
        <a href="#" @click="reloadPost">refresh</a> for new updates.
      </div>
      <div v-else-if="loading_data || (loading && !busy)" class="demo-loading-container">
        <a-spin />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import CommentSection from "./CommentSection";

export default {
  props: {
    public: {
      type: Boolean,
      default: false
    },
    loading_data: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CommentSection
  },
  data() {
    return {
      moment,
      reply_message: "",
      busy: false,
      loading: false,
      load_count: 5,
      show_comments: false
    };
  },
  computed: {
    post_data() {
      var posts = [];
      if (this.public)
        posts = this.deepCopy(this.$store.state.posts.public_post);
      else posts = this.deepCopy(this.$store.state.posts.connection_posts);
      return posts;
    },
    posts() {
      var _posts = this.post_data.slice(0, this.load_count);
      return _posts;
    }
  },
  methods: {
    isLike(likes) {
      return likes && likes.includes(this.account_id);
    },
    isDislike(dislikes) {
      return dislikes && dislikes.includes(this.account_id);
    },
    like(item, type) {
      var remove = false;
      if (item.likes.includes(this.account_id)) remove = true;

      var dispatch_name = "LIKE_COMMENT";
      if (type === 0) {
        dispatch_name = "LIKE_POST";
      }
      this.$store.dispatch(dispatch_name, {
        id: item.id,
        account_id: this.account_id,
        remove
      });
    },
    dislike(item, type) {
      var remove = false;
      if (item.likes.includes(this.account_id)) remove = true;

      var dispatch_name = "DISLIKE_COMMENT";
      if (type === 0) {
        dispatch_name = "DISLIKE_POST";
      }
      this.$store.dispatch(dispatch_name, {
        id: item.id,
        account_id: this.account_id,
        remove
      });
    },
    sendReply(event, post_id) {
      console.log("this.reply_message :", this.reply_message);
      this.$emit("comment", {
        group_id: this.groupid,
        post_id: this.postid,
        message: this.reply_message
      });
      this.reply_message = "";
    },
    handleLoadingPost() {
      if (!this.busy) {
        this.loading = true;
        setTimeout(() => {
          this.load_count += 5;
          if (this.load_count >= this.post_data.length) {
            this.load_count = this.post_data.length;
            this.busy = true;
          }
          this.loading = false;
        }, 1000);
      }
    },
    reloadPost() {
      this.busy = false;
      this.loading = true;
      this.load_count = 0;
      if (this.public) {
        this.$store
          .dispatch("GET_PUBLIC_POSTS", { refresh: true })
          .then(result => {
            this.loading = false;
          })
          .catch(err => {
            console.log("reload connection err :", err);
            this.loading = false;
          });
      } else {
        this.$store
          .dispatch("GET_CONNECTION_POSTS", { refresh: true })
          .then(result => {
            this.loading = false;
          })
          .catch(err => {
            console.log("reload connection err :", err);
            this.loading = false;
          });
      }
    },
    showComments(post_id) {
      this.show_comments = true;
      setTimeout(() => {
        this.$store.commit("SHOW_COMMENTS", {
          post_id,
          is_public: this.public,
          load_comment: 5
        });
        this.show_comments = false;
      }, 1000);
    },
    hideComments(post_id) {
      this.$store.commit("SHOW_COMMENTS", {
        post_id,
        is_public: this.public,
        load_comment: 0
      });
    }
  }
};
</script>

<style>
.ant-comment-actions li:nth-of-type(4) {
  float: right;
}

.ant-comment-actions li:nth-of-type(4) span {
  color: blue;
}

.ant-comment-actions li:nth-of-type(4) span:hover {
  text-decoration: underline;
}

.post-container {
  overflow: auto;
  max-height: 300px;
  min-height: 250px;
  padding: 0 10px;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.done-loading-post {
  text-align: center;
  margin: 5px;
}

.done-loading-post a {
  text-decoration: underline;
}

.no-data-message {
  font-size: 36px;
  font-style: italic;
  color: #aaa;
  margin: 20px;
  font-variant: petite-caps;
}
</style>