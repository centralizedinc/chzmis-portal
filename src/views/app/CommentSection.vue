<template>
  <a-comment>
    <template slot="actions">
      <span>
        <a-tooltip title="Like">
          <a-icon type="like" :theme="action === 1 ? 'filled' : 'outlined'" @click="$emit('like')" />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">{{likes}}</span>
      </span>
      <span>
        <a-tooltip title="Dislike">
          <a-icon
            type="dislike"
            :theme="action === 0 ? 'filled' : 'outlined'"
            @click="$emit('dislike')"
          />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">{{dislikes}}</span>
      </span>
      <span @click="$emit('requestcomment')">Comment</span>
    </template>

    <a slot="author" v-if="!author">
      <slot name="author"></slot>
    </a>
    <a slot="author" v-else>{{author}}</a>

    <a-avatar slot="avatar" :src="avatar" :alt="author" />

    <p slot="content" v-if="!content">
      <slot name="content"></slot>
    </p>
    <p slot="content" v-else>{{content}}</p>

    <a-tooltip v-if="datetime" slot="datetime" :title="moment(datetime).format('YYYY-MM-DD HH:mm:ss')">
      <span>{{moment(datetime).fromNow()}}</span>
    </a-tooltip>

    <slot name="comment"></slot>

    <a-input 
      v-if="showComment" 
      placeholder="Write a reply" 
      v-model="reply_message" 
      @keydown.enter="sendReply">
    </a-input>
  </a-comment>
</template>

<script>
import moment from "moment";

export default {
  props: {
    author: {
      type: String
    },
    content: {
      type: String
    },
    avatar: {
      type: String
    },
    datetime: {
      type: String
    },
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    },
    action: {
      type: Number
    },
    postid: {
      type: String
    },
    showComment: {
      type: Boolean
    },
    groupid: {
      type: String
    }
  },
  data() {
    return {
      moment,
      reply_message: ""
    };
  },
  methods: {
    sendReply() {
      console.log('this.reply_message :', this.reply_message);
      this.$emit("comment", { group_id: this.groupid, post_id: this.postid, message: this.reply_message });
      this.reply_message = "";
    }
  }
};
</script>

<style>
</style>
