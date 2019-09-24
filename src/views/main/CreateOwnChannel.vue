<template>
  <a-form :form="form">
    <a-card :headStyle="main_layout_head_style" :bordered="false" class="cardStyle">
      <a-row slot="title">
        <a-col :span="23">Create Own Channel</a-col>
        <a-col :span="1" style="text-align: center">
          <a-icon large type="question-circle" @click="showDrawer" />
          <a-drawer
            title="Help Tips"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
          >
            <p>Choosing Interest helps you to optimize searches on channels ek ek</p>
            <p>To find a smaller and more focused channel that matches your interest, choose the ek ek ek</p>
            <p>Here’s how</p>
          </a-drawer>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <h4>Create a New Channel</h4>
        </a-col>
        <a-row>
          <a-col :span="24">
            <a-form-item>
              <a-textarea placeholder="Channel Description" autosize />
            </a-form-item>
            <a-col :span="24">
              <p>Upload your first content</p>
              <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="upload" />
                </p>
                <p class="ant-upload-text">Drag and drop a video you want to upload</p>
                <p class="ant-upload-hint">
                  By submitting your videos to Chzmis, you acknowledge that you agree to the Terms of Service and Community Guidelines.
                  <br />Please be sure not to violate others' copyright or privacy rights.
                </p>
                <br />
                <a-col :span="12" :offset="6">
                  <a-select defaultValue="Public" style="width: 120px" @change="handleChange">
                    <a-select-option value="public">Public</a-select-option>
                    <a-select-option value="private">Private</a-select-option>
                  </a-select>
                </a-col>
              </a-upload-dragger>
            </a-col>
          </a-col>
        </a-row>
      </a-row>
      <br />
      <a-row type="flex" align="middle" :gutter="8">
        <a-col :span="6">
          <a-button block type="dashed" @click="continueLater">Continue Later</a-button>
        </a-col>
        <a-col :span="18">
          <a-button block type="primary" @click="done">Done</a-button>
          <account-ready :acct_ready="modal" @close="modal = false"></account-ready>
        </a-col>
      </a-row>
    </a-card>
  </a-form>
</template>

<script>
export default {
  components: {
    accountReady: () => import("../main/AccountReady")
  },
  data() {
    return {
      visible: false,
      modal: false
    };
  },
  computed: {
    head_style() {
      return {
        "background-color": "rgb(49, 49, 49)",
        color: "white"
      };
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    done() {
      this.modal = true;
    }
  }
};
</script>

<style scoped>
.cardStyle {
  /* border-radius: 25px !important; */
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>