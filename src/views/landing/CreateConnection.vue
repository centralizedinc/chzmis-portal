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

    <div>
      <div class="bg_landing">
        <a-row style="height:80vh" type="flex" justify="start" :gutter="1">
          <!-- card -->
          <a-col :push="4" :span="8" style="margin-top:5vh">
            <div style="width: 110vh">
              <a-card title="Create Connection" :bordered="false" :headStyle="head_style">
                <div>
                  <span>"Connection" is created for an organization or business to promote activities and to discuss anything under the sun. Users/Contacts may ask to join or must be invited to join a specific connection. Members can post their thoughts on the wall and interact with other members through discussion threads.</span>
                  <a-divider></a-divider>
                  <div>
                    <a-button type="primary" block @click="showModal">Create My Connection</a-button>
                    <a-modal v-model="visible" title="Add New Connection" onOk="handleOk">
                      <template slot="footer">
                        <!-- <span style="font-style: italic; padding-right: 100px">
                        <a href="/#/search/connection">or search and connect with others</a>
                        </span>-->
                        <search-connection :visible="modal"></search-connection>
                        <a-button key="back" @click="handleCancel">Cancel</a-button>
                        <a-button
                          key="submit"
                          type="primary"
                          :loading="loading"
                          @click="handleOk"
                        >Create</a-button>
                      </template>

                      <template>
                        <!-- own connection -->
                        <div>
                          <a-form :layout="formLayout">
                            <a-form-item label="Create a Name">
                              <a-input placeholder />
                            </a-form-item>
                          </a-form>
                        </div>
                        <!-- Add contacts -->
                        <p>Then add members from your social media contact list (optional)</p>
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

                          <a-divider>or</a-divider>
                          <a-button
                            type="link"
                            block
                            @click="show_search"
                          >Search and Connect with Others</a-button>
                        </a-row>

                        <!-- modal -->
                        <search-connection :show_search="modal" @close="modal = false"></search-connection>
                      </template>
                    </a-modal>
                  </div>
                </div>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-layout>
</template>

<script>
import headerIcon from "../../assets/Chzmis.png";

export default {
  components: {
    searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      headerIcon,
      loading: false,
      visible: false,
      modal: false
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
    show_search() {
      this.modal = true;
      this.visible = false;
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
</style>
