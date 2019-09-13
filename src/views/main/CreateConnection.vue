<template>
  <a-card class="cardStyle" :headStyle="main_layout_head_style" :bordered="false">
    <a-row slot="title">
      <a-col :span="24">Create Connection</a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <h4>Add New Connection</h4>
      </a-col>
      <a-row>
        <a-col :span="24">
          <a-form :layout="formLayout">
            <a-form-item label="Create a Name">
              <a-input placeholder />
            </a-form-item>
          </a-form>
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
            <a-button type="dashed" block @click="show_search">Search and Connect with Others</a-button>
            <search-connection :show_search="modal" @close="modal = false"></search-connection>
          </a-row>
        </a-col>
      </a-row>
    </a-row>
  </a-card>
</template>

<script>
export default {
  components: {
    searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
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
.cardStyle {
  border-radius: 25px !important;
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>
