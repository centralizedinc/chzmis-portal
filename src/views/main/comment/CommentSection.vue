<template>
  <div>
    <a-comment v-for="(comment, index) in comments_by_post.comments" :key="index">
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

      <a-avatar
        slot="avatar"
        :src="getUsers(comment.author).avatar"
      >{{getUsers(comment.author, "initial")}}</a-avatar>

      <div slot="content">
        <p>{{comment.message}}</p>
        <a-row
          v-if="comment.uploads.length"
          type="flex"
          align="middle"
          justify="space-around"
          class="upload-items"
        >
          <a-col
            v-for="i in (comment.uploads.length <= 4 ? comment.uploads.length : 3)"
            :key="i"
            :span="5"
          >
            <img
              :src="comment.uploads[i - 1].location"
              :alt="comment.uploads[i - 1].location"
              width="100"
              @click="viewMoreAttachment(comment.author, comment.uploads, i-1)"
            />
          </a-col>
          <a-col :span="5" v-if="comment.uploads.length > 4" class="post-more-attachments">
            <img
              :src="comment.uploads[3].location"
              :alt="comment.uploads[3].location"
              width="100"
              @click="viewMoreAttachment(comment.author, comment.uploads, 3)"
            />
            <div class="more-bg" @click="viewMoreAttachment(comment.author, comment.uploads, 3)"></div>
            <span
              class="more-label"
              @click="viewMoreAttachment(comment.author, comment.uploads, 3)"
            >{{`+${comment.uploads.length - 3}`}}</span>
          </a-col>
        </a-row>
      </div>

      <a-tooltip
        v-if="comment.date_created"
        slot="datetime"
        :title="formatDate(comment.date_created)"
      >
        <span>{{moment(comment.date_created).fromNow()}}</span>
      </a-tooltip>
    </a-comment>
    <a-skeleton :loading="loading" active avatar :paragraph="{rows: 2}" />
    <div style="text-align: center; padding-bottom: 5px;" v-if="!loading && !comments_by_post.busy">
      <span
        class="link-label"
        @click="loadComments(true)"
      >Show more comments</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      moment,
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
    comments_by_post() {
      const comments_by_post = this.deepCopy(
        this.$store.state.comments.comments_by_post
      );
      const comments = comments_by_post.find(v => v.key === this.post);
      return comments || { busy: true };
      // if (!this.post) return [];
      // const comments = this.deepCopy(this.$store.state.comments.comments);
      // const filtered_comments = comments.filter(x => x.post_id === this.post);
      // filtered_comments.sort(
      //   (a, b) => new Date(b.date_created) - new Date(a.date_created)
      // );
      // const _comments = filtered_comments.slice(0, this.load_comments);
      // return _comments;
    },
    load_comments() {
      var post = this.$store.state.posts.connection_posts.find(
        x => x._id === this.post
      );
      if (!post) {
        post = this.$store.state.posts.public_post.find(
          x => x._id === this.post
        );
      }
      if (!post) return 0;
      else return post.show_comment;
    },
    is_public() {
      return this.$store.state.connections.active_connection === -1;
    }
  },
  methods: {
    isLike(likes) {
      return likes && likes.includes(this.getLoginAccount().account_id);
    },
    isDislike(dislikes) {
      return dislikes && dislikes.includes(this.getLoginAccount().account_id);
    },
    like(item, type) {
      var remove = false;
      if (item.likes.includes(this.getLoginAccount().account_id)) remove = true;

      var dispatch_name = "LIKE_COMMENT";
      if (type === 0) {
        dispatch_name = "LIKE_POST";
      }
      this.$store.dispatch(dispatch_name, {
        id: item.id,
        account_id: this.getLoginAccount().account_id,
        remove
      });
    },
    dislike(item, type) {
      var remove = false;
      if (item.likes.includes(this.getLoginAccount().account_id)) remove = true;

      var dispatch_name = "DISLIKE_COMMENT";
      if (type === 0) {
        dispatch_name = "DISLIKE_POST";
      }
      this.$store.dispatch(dispatch_name, {
        id: item.id,
        account_id: this.getLoginAccount().account_id,
        remove
      });
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        this.$store.commit("SHOW_COMMENTS", {
          post_id: this.post,
          is_public: this.is_public,
          load_comment: this.load_comments + 5
        });
        this.loading = false;
      }, 1000);
    },
    viewMoreAttachment(author, attachments, current_index) {
      this.$emit("preview", {
        show: true,
        author,
        attachments,
        current_index
      });
    },
    loadComments(load_more) {
      this.loading = true;
      this.$store
        .dispatch("GET_COMMENTS_BY_POST", {
          load_more,
          post_id: this.post
        })
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>