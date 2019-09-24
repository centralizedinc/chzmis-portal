<template>
  <a-card
    title="Channels"
  >
    <!-- <div slot="title" class="title-head-style">
      <a-icon type="close" @click="$store.commit('SHOW_PROFILE', false)" />
    </div>
    <a-row type="flex" :gutter="18">
      <a-col :span="2" style="text-align: center">
        <p style="max-width: 60px">
          <a-tooltip placement="left">
            <template slot="title">
              <span>New Post</span>
            </template>
            <a-icon type="plus-circle" class="channel-item channel-add-item"></a-icon>
          </a-tooltip>
        </p>
        <p v-for="(channel, index) in channels" :key="index" style="max-width: 60px">
          <a-tooltip placement="left">
            <template slot="title">
              <span>{{channel.name}}</span>
            </template>
            <a-avatar
              :size="50"
              :src="channel.avatar"
              @click="showVideos(channel.id)"
              class="channel-item"
            ></a-avatar>
          </a-tooltip>
        </p>
      </a-col>
      <a-col
        :span="18"
        style="border-left: 1px solid #eee;border-right: 1px solid #eee;min-height: 200px;"
      >
        <a-row type="flex" :gutter="12">
          <a-col :span="24" v-if="selected_video">
            <span class="selected-video-title">{{selected_video.title}}</span>
          </a-col>
          <a-col :span="24">
            <video
              v-if="selected_video"
              :src="selected_video.uploads[0]"
              style="width: 100%; height: 100%;"
              controls
            >Your browser does not support the video tag.</video>
            <span v-else>No selected video</span>
          </a-col>
          <a-col :span="24" v-if="selected_video">
            
            <br />
            <span style="font-weight: bold">Description:</span>
            <p class="selected-video-description">{{selected_video.message}}</p>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="4">
        <p v-for="(video, index) in related_videos" :key="index">
          <a-tooltip placement="left">
            <template slot="title">
              <div style="background: white; padding: 10px; color: black;">
                <span style="font-weight: bold; font-size: 18px;">{{video.title}}</span>
                <br />
                <span style="color: #ddd;">{{parseWithComma(video.views)}} views</span>
                <p style="max-height: 70px;">{{textEllipse(video.message)}}</p>
              </div>
            </template>
            <img
              @mouseover="thumbnails[index] = true"
              @mouseout="thumbnails[index] = false"
              :src="video.uploads[2]"
              @click="selectVideo(video)"
              class="video-thumbnail"/>
          </a-tooltip>
        </p>
      </a-col>
    </a-row> -->
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      selected_video: null,
      thumbnails: []
    };
  },
  created() {
    this.$store.dispatch("GET_CHANNELS", {
      account_id: "acc1"
    });
  },
  watch: {
    thumbnails(val){
      console.log('val :', val);
    }
  },
  computed: {
    channels() {
      return this.$store.state.channels.channels;
    },
    related_videos() {
      var related_videos = [];
      if (this.selected_video)
        related_videos = this.videos.filter(
          x => x.id !== this.selected_video.id
        );
      this.thumbnails = related_videos.map(x => false);
      console.log('this.thumbnails :', this.thumbnails);
      return related_videos;
    },
    videos() {
      return this.$store.state.channel_posts.posts;
    }
  },
  methods: {
    showVideos(channel_id) {
      this.$store.dispatch("GET_POSTS_BY_CHANNEL", {
        channel_id
      });
      this.selected_video = this.videos.length > 0 ? this.videos[0] : null;
    },
    selectVideo(video) {
      this.selected_video = video;
    }
  }
};
</script>

<style>
.channel-add-item {
  font-size: 50px;
  border-radius: 50%;
}

.channel-item {
  cursor: pointer;
  border: 3px solid transparent;
}

.channel-item:hover {
  cursor: pointer;
  border: 3px solid blue;
}

.video-thumbnail {
  width: 100%;
  height: 100px;
  cursor: pointer;
  border: 3px solid transparent;
}

.video-thumbnail:hover {
  border: 3px solid blue;
}

.selected-video-title {
  font-weight: bold;
  font-size: 20px;
  padding: 20px 0;
}

</style>
