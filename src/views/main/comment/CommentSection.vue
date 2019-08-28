<template>
  <div>
    <a-comment v-for="(comment, index) in comments" :key="index">
      <template slot="actions">
        <span>
          <a-tooltip title="Like">
            <a-icon
              type="like"
              :theme="isLike(comment.likes) ? 'filled' : 'outlined'"
              @click="like(comment, 1)"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">{{comment.likes.length}}</span>
        </span>
        <span>
          <a-tooltip title="Dislike">
            <a-icon
              type="dislike"
              :theme="isDislike(comment.dislikes) ? 'filled' : 'outlined'"
              @click="dislike(comment, 1)"
            />
          </a-tooltip>
          <span style="padding-left: '8px';cursor: 'auto'">{{comment.dislikes.length}}</span>
        </span>
        <span>Comment</span>
      </template>

      <a
        slot="author"
      >{{getAuthorName(comment.author).first}} {{getAuthorName(comment.author).last}}</a>

      <a-avatar slot="avatar" :src="getAuthorAvatar(comment.author)" />

      <p slot="content">{{comment.message}}</p>

      <a-tooltip
        v-if="comment.date_created"
        slot="datetime"
        :title="moment(comment.date_created).format('YYYY-MM-DD HH:mm:ss')"
      >
        <span>{{moment(comment.date_created).fromNow()}}</span>
      </a-tooltip>
    </a-comment>
    <div
      style="text-align: center; padding-bottom: 5px;"
      v-if="load_comments > 0 && load_comments <= comments.length"
    >
      <a href="#" style="text-decoration: underline;" @click="loadMore">Show more comments</a>
    </div>
    <div v-if="show_comments || loading" class="demo-loading-container">
      <a-spin />
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      moment,
      is_public: false,
      loading: false
    };
  },
  props: {
    post: {
      type: String
    },
    show_comments: {
      type: Boolean
    }
  },
  computed: {
    comments() {
      if (!this.post) return [];
      const comments = this.deepCopy(this.$store.state.comments.comments);
      const filtered_comments = comments.filter(x => x.post_id === this.post);
      const _comments = filtered_comments.slice(0, this.load_comments);
      return _comments;
    },
    load_comments() {
      var post = this.$store.state.posts.connection_posts.find(
        x => x._id === this.post
      );
      if (!post) {
        post = this.$store.state.posts.public_post.find(
          x => x._id === this.post
        );
        this.is_public = true;
      } else this.is_public = false;
      if (!post) return 0;
      else return post.show_comment;
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
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.$store.commit("SHOW_COMMENTS", {
          post_id: this.post,
          is_public: this.public,
          load_comment: this.load_comments + 5
        });
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style>
</style>