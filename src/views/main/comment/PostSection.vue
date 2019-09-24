<template>
  <div>
    <div
      v-infinite-scroll="handleLoadingPost"
      :infinite-scroll-disabled="active_connection_posts.busy"
      :infinite-scroll-distance="5"
    >
      <a-card v-for="(item, index) in active_connection_posts.post" :key="index" 
        :bodyStyle="{ padding: '3vh' }"
        style="margin-bottom: 1vh">
        <a-comment style="margin-bottom: 5px;">
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

          <a-avatar
            slot="avatar"
            :src="getUsers(item.author).avatar"
          >{{getUsers(item.author, "initial")}}</a-avatar>

          <div slot="content">
            <p>{{item.message}}</p>
            <a-row
              v-if="item.uploads.length"
              type="flex"
              align="middle"
              justify="space-around"
              class="upload-items"
            >
              <a-col
                v-for="index in (item.uploads.length <= 4 ? item.uploads.length : 3)"
                :key="index"
                :span="5"
              >
                <img
                  :src="item.uploads[index - 1].location"
                  :alt="item.uploads[index - 1].location"
                  width="100"
                  @click="viewMoreAttachment(true, item.author, item.uploads, index-1)"
                />
              </a-col>
              <a-col :span="5" v-if="item.uploads.length > 4" class="post-more-attachments">
                <img
                  :src="item.uploads[3].location"
                  :alt="item.uploads[3].location"
                  width="100"
                  @click="viewMoreAttachment(true, item.author, item.uploads, 3)"
                />
                <div
                  class="more-bg"
                  @click="viewMoreAttachment(true, item.author, item.uploads, 3)"
                ></div>
                <span
                  class="more-label"
                  @click="viewMoreAttachment(true, item.author, item.uploads, 3)"
                >{{`+${item.uploads.length - 3}`}}</span>
              </a-col>
            </a-row>
          </div>

          <a-tooltip
            v-if="item.date_created"
            slot="datetime"
            :title="formatDate(item.date_created)"
          >
            <span>{{moment(item.date_created).fromNow()}}</span>
          </a-tooltip>
          <!-- <a href="#" style="text-decoration: underline">Show Comments</a> -->
          <!-- <comment-section
            :show_comments="show_comments"
            :post="item._id"
            @preview="more_attachments=$event"
          ></comment-section>-->

          <div @click="setActiveComment(item._id)">
            <template v-for="(img, index) in getPreviewImages(item._id)">
              <a-tooltip :key="index">
                <span slot="title">{{img.name}}</span>
                <div class="preview-uploads-card">
                  <a-icon
                    class="preview-uploads-card-close"
                    type="close-circle"
                    @click="removeFileList(item._id, index)"
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
            <a-input placeholder="Write a reply" @keydown.enter="sendReply($event, item._id)">
              <a-upload
                slot="addonAfter"
                :multiple="true"
                :showUploadList="false"
                :beforeUpload="attachFile"
                class="comment-upload-icon"
              >
                <a-icon type="upload" />
              </a-upload>
            </a-input>
          </div>
        </a-comment>
      </a-card>
      <a-card :bodyStyle="{ padding: '1vh' }">
        <a-skeleton style="padding: 20px" :loading="loading" active avatar :paragraph="{rows: 3}" />
        <div v-if="!loading && active_connection_posts.busy" class="done-loading-post">
          Done loading. Try to
          <a href="#" @click="loadPost(true)">refresh</a> for new updates.
        </div>
      </a-card>
    </div>
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
    <a-modal
      v-if="more_attachments.show"
      :visible="more_attachments.show"
      :footer="null"
      @cancel="viewMoreAttachment(false)"
    >
      <div slot="title">
        <a-avatar
          :src="getUsers(more_attachments.author).avatar"
        >{{getUsers(more_attachments.author, "initial")}}</a-avatar>
        <span style="margin-left: 10px">{{getUsers(more_attachments.author, "fullname")}}</span>
      </div>
      <a-carousel arrows ref="carousel">
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 5px;zIndex: 1">
          <a-icon type="left-circle" class="arrow" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 20px;">
          <a-icon type="right-circle" class="arrow" />
        </div>
        <div v-for="index in more_attachments.attachments.length" :key="index" class="carousel-img">
          <img
            width="400"
            :src="more_attachments.attachments[index-1].location"
            :alt="more_attachments.attachments[index-1].location"
          />
        </div>
      </a-carousel>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import CommentSection from "./CommentSection";

export default {
  props: {
    reload_new_post: {
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
      loading: false,
      more_attachments: {
        show: false,
        author: "",
        attachments: [],
        current_index: 0
      },
      active_comment: "",
      post_file_list: [],
      post_file_images: [],
      preview_file_list: {},
      loading_reply: false
    };
  },
  computed: {
    active_connection() {
      return this.$store.state.connections.active_connection;
    },
    active_connection_posts() {
      const connection_posts = this.deepCopy(
        this.$store.state.posts.connection_posts
      );
      const connection = connection_posts.find(
        c => c.key === this.active_connection
      );
      return connection || { busy: true };
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
    sendReply(event, post_id) {
      this.loading_reply = true;
      const message = event.target.value;
      var form_data = null;
      const file_index = this.post_file_list.findIndex(x => x.id === post_id);
      if (file_index !== -1 && this.post_file_list[file_index].items.length) {
        form_data = new FormData();
        this.post_file_list[file_index].items.forEach(file => {
          form_data.append("files", file, file.name);
        });
      }
      this.$store
        .dispatch("SEND_COMMENT", { comment: { message, post_id }, form_data })
        .then(result => {
          event.target.value = "";
          this.post_file_list = [];
          this.post_file_images = [];
          this.preview_file_list = {};
          this.loading_reply = false;
        })
        .catch(err => {
          console.log("err :", err);
          this.loading_reply = false;
        });
    },
    handleLoadingPost() {
      if (!this.active_connection_posts.busy) {
        this.loadPost(false, true);
      }
    },
    loadPost(refresh, load_more) {
      this.loading = true;
      this.$store
        .dispatch("GET_CONNECTION_POSTS", { refresh, load_more })
        .then(result => {
          console.log("done loading connection post");
          this.loading = false;
        })
        .catch(err => {
          console.log("reload connection err :", err);
          this.loading = false;
        });
    },
    showComments(post_id) {
      this.show_comments = true;
      setTimeout(() => {
        this.$store.commit("SHOW_COMMENTS", {
          post_id,
          is_public: this.is_public,
          load_comment: 5
        });
        this.show_comments = false;
      }, 1000);
    },
    hideComments(post_id) {
      this.$store.commit("SHOW_COMMENTS", {
        post_id,
        is_public: this.is_public,
        load_comment: 0
      });
    },
    viewMoreAttachment(show, author, attachments, current_index) {
      this.more_attachments = {
        show,
        author,
        attachments,
        current_index
      };
      this.$refs.carousel.goTo(current_index, false);
    },
    setActiveComment(id) {
      // Setting active comment for uploading files
      this.active_comment = id;
    },
    attachFile(file) {
      // add file to post_file_list in specified id *[{id: <post_id>, items: [<Uploaded Files>]}]*
      const file_index = this.post_file_list.findIndex(
        x => x.id === this.active_comment
      );
      // check if the active_comment(post_id) exist in post_file_list
      if (file_index === -1) {
        // if not, push files together with id in post_file_list
        this.post_file_list.push({ id: this.active_comment, items: [file] });
      } else {
        // else if it is, push files in specified id
        this.post_file_list[file_index].items = [
          ...this.post_file_list[file_index].items,
          file
        ];
      }

      // add images to post_file_images in specified id *[{id: <post_id>, items: [<Uploaded Images>]}]* using Base64
      this.getBase64(file, imageUrl => {
        const image_index = this.post_file_images.findIndex(
          x => x.id === this.active_comment
        );
        if (image_index === -1) {
          // if not, push images together with id in post_file_images
          this.post_file_images.push({
            id: this.active_comment,
            items: [{ imageUrl, name: file.name }]
          });
        } else {
          // else if it is, push images in specified id
          this.post_file_images[image_index].items = [
            ...this.post_file_images[image_index].items,
            { imageUrl, name: file.name }
          ];
        }
      });
    },
    removeFileList(id, i) {
      const file_index = this.post_file_list.findIndex(x => x.id === id),
        image_index = this.post_file_images.findIndex(x => x.id === id);
      if (file_index !== -1) this.post_file_list[file_index].items.splice(i, 1);
      if (image_index !== -1)
        this.post_file_images[image_index].items.splice(i, 1);
    },
    getPreviewImages(id) {
      const file_index = this.post_file_images.findIndex(x => x.id === id);
      return file_index === -1 ? [] : this.post_file_images[file_index].items;
    },
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    }
  },
  created() {
    this.loadPost();
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

.upload-items {
  border: 1px solid #d9d9d9;
  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 2px 2px #d9d9d9;
}

.upload-items .ant-col-5 {
  height: 106px;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-box-align: center;
}

.upload-items img {
  width: 100%;
}

.upload-items img:hover,
.upload-items .more-bg:hover {
  cursor: pointer;
  box-shadow: 1px 1px;
}

.upload-items .more-bg {
  position: absolute;
  background: #d9d9d9;
  opacity: 0.5;
  height: 100%;
  width: 100%;
}

.upload-items .more-label {
  position: absolute;
  font-size: 20px;
  font-weight: bold;
}

.ant-carousel .slick-dots li button,
.ant-carousel .slick-dots li.slick-active button {
  background: black !important;
  border: 1px solid #fff;
}

.carousel-img {
  height: 500px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.carousel-img img {
  width: 100% !important;
}

.arrow {
  color: black;
  font-size: 35px;
  border: 1px solid #fff;
  border-radius: 20px;
}

.comment-upload-icon {
  cursor: pointer;
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
</style>