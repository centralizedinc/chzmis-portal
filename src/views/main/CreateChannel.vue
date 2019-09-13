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

    <!-- BG -->

    <div>
      <div class="bg_landing">
        <a-row style="height:100vh" type="flex" justify="start" :gutter="1">
          <!-- cards -->
          <a-col :push="2" :span="12" style="margin-top:10vh">
            <div style="width: 160vh">
              <a-card title="Create Channel" :bordered="false" :headStyle="head_style">
                <div style="padding-bottom: 6px">
                  <span style="font-weight:bold">Choose a channel that interest you</span>
                </div>
                <a-row :gutter="16" type="flex" align="middle" style="margin-top:3vh">
                  <a-col :span="6">
                    <a-card hoverable style="width: 200px">
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        slot="cover"
                      />
                      <template class="ant-card-actions" slot="actions">
                        <!-- <span>Games</span> -->
                        <a-icon type="plus" />
                      </template>
                      <!-- <a-card-meta title="Games"></a-card-meta> -->
                    </a-card>
                  </a-col>

                  <a-col :span="6">
                    <a-card hoverable style="width: 200px">
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        slot="cover"
                      />
                      <template class="ant-card-actions" slot="actions">
                        <a-icon type="plus" />
                      </template>
                    </a-card>
                  </a-col>

                  <a-col :span="6">
                    <a-card hoverable style="width: 200px">
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        slot="cover"
                      />
                      <template class="ant-card-actions" slot="actions">
                        <a-icon type="plus" />
                      </template>
                    </a-card>
                  </a-col>

                  <a-col :span="6">
                    <a-card hoverable style="width: 200px">
                      <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        slot="cover"
                      />
                      <template class="ant-card-actions" slot="actions">
                        <a-icon type="plus" />
                      </template>
                    </a-card>
                  </a-col>
                </a-row>

                <a-divider style="font-weight:bold">or</a-divider>
                <a-button type="primary" block>Create my Own Channel</a-button>

                <a-divider></a-divider>
                <a-row>
                  <a-col :span="24">
                    <a-button-group>
                      <a-button type="link">Continue Later</a-button>
                      <a-button type="primary">Next Step</a-button>
                    </a-button-group>
                  </a-col>
                </a-row>
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    head_style() {
      return {
        "background-color": "rgb(49, 49, 49)",
        color: "white"
      };
    }
  }
};
</script>

<style>
</style>