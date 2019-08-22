<template>
  <a-layout>
    <a-layout-header>
      <a-row type="flex" align="middle">
        <a-col :md="3" :xs="12" class="header-title">
          <a href="/" class="router-link-active" id="logo">
            <img alt="logo" height="50" :src="headerIcon" />
          </a>
        </a-col>
      </a-row>
    </a-layout-header>
    <div class="card-container bg_landing">
      <a-row type="flex" align="middle">
        <a-col
          :span="12"
          :offset="7"
          style="font-weight: normal; padding-top: 100px; padding-bottom: 100px"
        >
          <!-- card -->
          <div class="custom-size">
            <a-card title="Create Connection" :bordered="false" :headStyle="head_style">
              <div>
                <span>"Connection" is created for an organization or business to promote activities and to discuss anything under the sun. Users/Contacts may ask to join or must be invited to join a specific connection. Members can post their thoughts on the wall and interact with other members through discussion threads.</span>
                <a-divider></a-divider>
                <div>
                  <a-button type="primary" block @click="showModal">Create New Connection</a-button>
                  <a-modal v-model="visible" title="Create" onOk="handleOk">
                    <template slot="footer">
                      <a-button key="back" @click="handleCancel">Cancel</a-button>
                      <a-button
                        key="submit"
                        type="primary"
                        :loading="loading"
                        @click="handleOk"
                      >Create</a-button>
                    </template>

                    <template>
                      <!-- search -->
                      <div class="global-search-wrapper" style="width: 450px">
                        <a-row type="flex" align="middle">
                          <a-col :span="23" :offset="1">
                            <a-auto-complete
                              class="global-search"
                              size="large"
                              style="width: 100%"
                              @select="onSelect"
                              @search="handleSearch"
                              placeholder="Search and Connect with Others"
                              optionLabelProp="text"
                            >
                              <template slot="dataSource">
                                <a-select-option
                                  v-for="item in dataSource"
                                  :key="item.category"
                                  :text="item.category"
                                >
                                  {{item.query}} A
                                  <a
                                    :href="`https://s.taobao.com/search?q=${item.query}`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >{{item.category}}</a>
                                  BCD
                                  <span
                                    class="global-search-item-count"
                                  >H {{item.count}} EFG</span>
                                </a-select-option>
                              </template>
                              <a-input>
                                <a-button
                                  slot="suffix"
                                  class="search-btn"
                                  size="large"
                                  type="primary"
                                >
                                  <a-icon type="search" />
                                </a-button>
                              </a-input>
                            </a-auto-complete>
                          </a-col>
                        </a-row>
                      </div>
                      <a-divider>or Create Own Connection</a-divider>
                      <!-- own connection -->
                      <div>
                        <a-form :layout="formLayout">
                          <a-form-item label="Name of Connection">
                            <a-input placeholder />
                          </a-form-item>
                        </a-form>
                      </div>
                      <!-- Add contacts -->
                      <p>Add contacts from</p>
                      <a-row type="flex" align="middle" :gutter="12">
                        <a-col :span="12">
                          <a-form-item>
                            <a-button
                              type="primary"
                              block
                              style="font-size: 18px ; background-color: #3b5998; border-color: #3b5998"
                            >
                              <a-icon type="facebook" theme="filled" />
                            </a-button>
                          </a-form-item>
                        </a-col>

                        <a-col :span="12">
                          <a-form-item>
                            <a-button
                              style="font-size: 20px; background-color: #d34836; border-color: #d34836"
                              type="primary"
                              block
                            >
                              <a-icon type="google-plus" />
                            </a-button>
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </template>
                  </a-modal>
                </div>
              </div>
            </a-card>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout>
</template>

<script>
import headerIcon from "../../assets/Chzmis.png";

export default {
  data() {
    return {
      headerIcon,
      loading: false,
      visible: false,
      dataSource: []
    };
  },
  computed: {
    head_style() {
      return { "background-color": "rgb(49, 49, 49)", color: "white" };
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    onSelect(value) {
      console.log("onSelect", value);
    },

    handleSearch(value) {
      this.dataSource = value ? this.searchResult(value) : [];
    },

    getRandomInt(max, min = 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    searchResult(query) {
      return new Array(this.getRandomInt(5))
        .join(".")
        .split(".")
        .map((item, idx) => ({
          query,
          category: `${query}${idx}`,
          count: this.getRandomInt(200, 100)
        }));
    }
  }
};
</script>

<style>
.card-container {
  /* background: #f5f5f5; */
  overflow: hidden;
  padding: 24px;
  /* text-align: center !important; */
}
.header-title {
  /* color: #ffffff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px #000000;
  background-color: #fff6e2; */
  padding: 0px 0px 0px 20px !important;
}
.custom-size {
  width: 500px;
  height: 300px;
}
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete .ant-select-selection--single {
  margin-right: -46px;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 0;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix
  button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-item-count {
  position: absolute;
  right: 16px;
}
</style>
