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
          style="font-weight: bold; padding-top: 100px; padding-bottom: 100px"
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
                      <div>
                        <a-form :layout="formLayout">
                          <a-form-item label="Name of Connection">
                            <a-input placeholder />
                          </a-form-item>
                        </a-form>
                      </div>
                    </template>
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
const CollectionCreateForm = {
  props: ["visible"],
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  template: `
    <a-modal
      :visible="visible"
      title='Create a new collection'
      okText='Create'
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='Title'>
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: 'Please input the title of collection!' }],
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='Description'>
          <a-input
            type='textarea'
            v-decorator="['description']"
          />
        </a-form-item>
        <a-form-item class='collection-create-form_last-form-item'>
          <a-radio-group
            v-decorator="[
              'modifier',
              {
                initialValue: 'private',
              }
            ]"
          >
              <a-radio value='public'>Public</a-radio>
              <a-radio value='private'>Private</a-radio>
            </a-radio-group>
        </a-form-item>
      </a-form>
    </a-modal>
  `
};

export default {
  components: { CollectionCreateForm },
  data() {
    return {
      headerIcon,
      visible: false
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
    handleCancel() {
      this.visible = false;
    },
    handleCreate() {
      const form = this.$refs.collectionForm.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        console.log("Received values of form: ", values);
        form.resetFields();
        this.visible = false;
      });
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
</style>
