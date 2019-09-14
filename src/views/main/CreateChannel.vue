<template>
  <a-card :headStyle="main_layout_head_style" :bordered="false" class="cardStyle">
    <a-row slot="title">
      <a-col :span="23">Create Channel</a-col>
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

    <!-- image slider -->
    <a-row>
      <a-col :span="24">
        <a-carousel :afterChange="onChange">
          <!-- thumbnail images below-->
          <a slot="customPaging" slot-scope="props">
            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          </a>
          <!-- preview big image -->

          <div>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
          </div>
          <div>
            <img src="https://cdn.dribbble.com/users/1273066/screenshots/3423517/taxi_app.gif" />
          </div>
        </a-carousel>
      </a-col>
    </a-row>
  </a-card>
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
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    }
  }
};
</script>

<style scoped>
.cardStyle {
  border-radius: 25px !important;
  box-shadow: 0px 0px 10px 2px #88888847;
}
.ant-carousel >>> .slick-dots {
  height: auto;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  width: 100%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -15px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>