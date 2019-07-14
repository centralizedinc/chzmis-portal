
<template>
  <div class="card-container">
    <a-card bodyStyle="padding-bottom: 0px;" style="margin-bottom: 10px;">
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
              <a-button type="primary" size="small" block>SEND</a-button>
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
        <a-comment>
          <span slot="actions">Reply to</span>
          <a slot="author">Han Solo</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
          <p
            slot="content"
          >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
          <a-comment>
            <span slot="actions">Reply to</span>
            <a slot="author">Han Solo</a>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
            <p
              slot="content"
            >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
            <a-comment>
              <span slot="actions">Reply to</span>
              <a slot="author">Han Solo</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <p
                slot="content"
              >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
            </a-comment>
            <a-comment>
              <span slot="actions">Reply to</span>
              <a slot="author">Han Solo</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
              <p
                slot="content"
              >We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).</p>
            </a-comment>
          </a-comment>
        </a-comment>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post_message: "",
      items: [
        {
          title: "Tab Pane 1",
          content: "Content of Tab Pane 1",
          favorite: false
        },
        {
          title: "Tab Pane 2",
          content: "Content of Tab Pane 1",
          favorite: false
        },
        {
          title: "Tab Pane 3",
          content: "Content of Tab Pane 1",
          favorite: false
        }
      ]
    };
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    setFavorite(index) {
      console.log("item :", item);
      this.items[index].favorite = !this.items[index].favorite;
      this.items.sort(function(x, y) {
        return x.favorite === y.favorite ? 0 : x.favorite ? -1 : 1;
      });
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
