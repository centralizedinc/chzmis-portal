<template>
  <a-form :form="form">
    <a-card :headStyle="main_layout_head_style" :bordered="false" class="cardStyle">
      <a-row slot="title">
        <a-col :span="23">Interest</a-col>
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
          <h4>Popular Categories</h4>
        </a-col>
        <a-row>
          <a-col :span="24">
            <a-tag color="#f50">Music</a-tag>
            <a-tag color="#2db7f5">Money</a-tag>
            <a-tag color="#87d068">Games</a-tag>
            <a-tag color="#108ee9">Gadget</a-tag>
          </a-col>
        </a-row>
        <a-divider></a-divider>
        <h4>Choose your interest from the categories listed</h4>
        <a-form-item>
          <a-select
            v-decorator="['interest', {rules: [{ required: true, message: 'Please select at least one from the categories to proceed, otherwise choose continue later' }]}   ]"
            mode="tags"
            style="width: 100%"
            @change="handleChange"
            placeholder="Choose from the list or input your own interest"
          >
            <a-select-option v-for="item in items" :key="item.category">{{item.category }}</a-select-option>
          </a-select>
        </a-form-item>
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
    // searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      // loading: false,
      form: this.$form.createForm(this),
      visible: false,
      items: [
        {
          category: "Music"
        },
        {
          category: "Movies"
        },
        {
          category: "Gadget"
        },
        {
          category: "Games"
        },
        {
          category: "Arts"
        },
        {
          category: "Photography"
        },
        {
          category: "Fashion"
        },
        {
          category: "Animals"
        },
        {
          category: "Cooking"
        },
        {
          category: "Cars"
        },
        {
          category: "Sports"
        }
      ]
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
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    continueLater() {
      this.$router.push("channel");
    },
    next() {
      this.form.validateFields(err => {
        if (!err) {
          console.info("success");
          this.$router.push("channel");
        }
      });
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
