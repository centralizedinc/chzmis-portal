<template>
  <div>
    <!-- <a-button type="primary" block @click="showModal">Create New Connection</a-button> -->
    <a-modal v-model="show_search" title="Create" onOk="handleOk">
      <template slot="footer">
        <a-button key="back" @click="$emit('close')">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
      </template>
      <!-- search -->
      <a-input-search placeholder="Search and Connect with Others" @search="onSearch" enterButton />
      <div>
        <a-list itemLayout="horizontal" :dataSource="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            >
              <a slot="title" href="https://vue.ant.design/">{{item.title}}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
      <a-divider>or</a-divider>
      <a-button type="primary" block @click="show_create">Create My Own Connection</a-button>
      <create-connection :visible="visible" @close="visible = false"></create-connection>
    </a-modal>
  </div>
</template>

<script>
const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];
export default {
  props: {
    show_search: {
      type: Boolean,
      default: false
    },
    components: {
      createConnection: () => import("../views/main/CreateConnection")
    },
    data() {
      return {
        data,
        loading: false,
        show_search: false,
        visible: false
      };
    },
    computed: {
      head_style() {
        return { "background-color": "rgb(49, 49, 49)", color: "white" };
      }
    },
    methods: {
      show_create() {
        this.$router.push("/create/connection");
        this.show_search = false;
      },
      handleOk(e) {
        this.loading = true;
        setTimeout(() => {
          this.show_search = false;
          this.loading = false;
        }, 3000);
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
.global-search-wrapper {
  padding-right: 50px;
}

.global-search {
  width: 100%;
}

.global-search.ant-select-auto-complete .ant-select-selection--single {
  margin-right: -46px;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input:not(:last-child) {
  padding-right: 62px;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix {
  right: 0;
}

.global-search.ant-select-auto-complete
  .ant-input-affix-wrapper
  .ant-input-suffix
  button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.global-search-item-count {
  position: absolute;
  right: 16px;
}
</style>
