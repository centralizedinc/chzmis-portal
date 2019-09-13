<template>
  <a-card :headStyle="main_layout_head_style" :bordered="false" class="cardStyle">
    <a-row slot="title">
      <a-col :span="24">Interest</a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <h4>Popular Categories</h4>
      </a-col>
      <a-row>
        <a-col :span="24">
          <a-button-group>
            <a-button type="primary">Music</a-button>
            <a-button type="primary">Money</a-button>
            <a-button type="primary">Games</a-button>
            <a-button type="primary">Gadget</a-button>
          </a-button-group>
        </a-col>
      </a-row>
      <a-divider></a-divider>
      <h4>Choose your interest from the categories listed</h4>
      <a-select
        mode="tags"
        style="width: 100%"
        @change="handleChange"
        placeholder="Choose from the list or input your own interest"
      >
        <a-select-option v-for="item in items" :key="item.category">{{item.category }}</a-select-option>
      </a-select>
      <a-divider></a-divider>
      <a-row type="flex" align="middle" :gutter="8">
        <a-col :span="6">
          <a-button block type="dashed">Continue Later</a-button>
        </a-col>
        <a-col :span="18">
          <a-button block type="primary">Next</a-button>
        </a-col>
      </a-row>
    </a-row>
  </a-card>
</template>

<script>
export default {
  components: {
    // searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      // loading: false,
      // visible: false,
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
    handleChange(value) {
      console.log(`selected ${value}`);
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