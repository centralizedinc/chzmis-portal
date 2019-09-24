<template>
  <a-form :form="form">
    <a-card class="cardStyle" :headStyle="main_layout_head_style" :bordered="false">
      <a-row slot="title">
        <a-col :span="23">Create Connection</a-col>
        <a-col :span="1" style="text-align: center">
          <a-icon large type="question-circle" @click="showDrawer" />
          <a-drawer
            title="Help Tips"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
          >
            <p>Connection" is created for an organization or business to promote activities and to discuss anything under the sun.</p>
            <p>Users/Contacts may ask to join or must be invited to join a specific connection.</p>
            <p>Members can post their thoughts on the wall and interact with other members through discussion threads.</p>
          </a-drawer>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h4>Add New Connection</h4>
        </a-col>
        <a-row>
          <a-col :span="24">
            <a-form-item>
              <a-input
                style="height:40px"
                v-decorator="['connection', {rules: [{ required: true, message: 'Please input the connection name to proceed, otherwise choose continue later' }]}]"
                placeholder="Connection Name"
              />
            </a-form-item>

            <p>Then add members from your social media contact list (optional)</p>
            <a-row type="flex" align="middle" :gutter="12">
              <a-col :span="12">
                <a-button
                  type="primary"
                  block
                  style="font-size: 18px ; background-color: #3b5998; border-color: #3b5998"
                >
                  <a-icon type="facebook" theme="filled" />
                </a-button>
              </a-col>

              <a-col :span="12">
                <a-button
                  style="font-size: 20px; background-color: #d34836; border-color: #d34836"
                  type="primary"
                  block
                >
                  <a-icon type="google-plus" />
                </a-button>
              </a-col>

              <a-divider>or</a-divider>
              <a-button type="secondary" block @click="show_search">Search and Connect with Others</a-button>
              <search-connection :show_search="modal" @close="modal = false"></search-connection>
            </a-row>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <a-row type="flex" align="middle" :gutter="8">
          <a-col :span="6">
            <a-button block type="dashed" @click="continueLater">Continue Later</a-button>
          </a-col>
          <a-col :span="18">
            <a-button block type="primary" @click="next">Next</a-button>
          </a-col>
        </a-row>
      </a-row>
    </a-card>
  </a-form>
</template>

<script>
export default {
  components: {
    searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      modal: false,
      visible: false,
      form: this.$form.createForm(this)
    };
  },
  computed: {
    head_style() {
      return { "background-color": "rgb(49, 49, 49)", color: "white" };
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    show_search() {
      this.modal = true;
      // this.visible = false;
    },
    continueLater() {
      this.$router.push("interest");
    },
    next() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
          this.$router.push("interest");
        }
      });
    },
    // handleOk(e) {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.visible = false;
    //     this.loading = false;
    //   }, 3000);
    // },
    // handleCancel(e) {
    //   this.visible = false;
    // },
    // onSelect(value) {
    //   console.log("onSelect", value);
    // },
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
  /* border-radius: 25px !important; */
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>
