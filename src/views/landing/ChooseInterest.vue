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
          <a-col :push="6" :span="8" style="margin-top:5vh">
            <div style="width: 110vh">
              <a-card title="Interest" :bordered="false" :headStyle="head_style">
                <div style="padding-bottom: 6px">
                  <span>Choose your interest categories</span>
                  <br />
                </div>
                <a-select
                  mode="tags"
                  style="width: 100%"
                  @change="handleChange"
                  placeholder="Choose from the list or input your own interest"
                >
                  <a-select-option
                    v-for="(item, category) in items"
                    :key="item.category"
                  >{{item.category }}</a-select-option>
                </a-select>
                <a-divider></a-divider>
                <div style="padding-bottom: 6px">
                  <span>Popular Categories</span>
                  <br />
                </div>
                <a-button-group>
                  <a-button type="primary">Music</a-button>
                  <a-button type="primary">Money</a-button>
                  <a-button type="primary">Games</a-button>
                  <a-button type="primary">Gadget</a-button>
                </a-button-group>
                <a-divider></a-divider>
                <a-button type="primary" block>Next</a-button>
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
    // searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      headerIcon,
      loading: false,
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
    handleChange(value) {
      console.log(`selected ${value}`);
    }
  }
};
</script>

<style>
.custom-size {
  width: 800px;
  height: 300px;
}
.card-style {
  overflow: hidden;
  padding: 24px;
}
</style>