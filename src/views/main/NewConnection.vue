<template>
  <div>
    <a-modal
      title="Search Connection"
      :visible="show"
      @cancel="close"
      class="modal-search-connection"
    >
      <div v-if="loading || fetching_data" class="demo-loading-container">
        <a-spin />
      </div>
      <div v-else>
        <p>
          <a-input placeholder="Search Connection by name or id" v-model="search"></a-input>
        </p>
        <div style="width: 100%; max-height: 200px; overflow-y: scroll; border: 1px solid black;">
          <a-list size="small" bordered :dataSource="search_connections">
            <a-list-item slot="renderItem" slot-scope="item">
              <span style="font-weight: bold;">{{item.name}}</span>
              <span slot="actions" v-if="item.connected">Connected</span>
              <a slot="actions" class="connect-action" v-else @click="connect(item._id)">Connect</a>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <template slot="footer">
        <a-divider style="font-style: italic; color: #aaa;">OR</a-divider>
        <div style="padding: 0 16px">
          <a-button type="primary" block @click="createConnection">Create New Connection</a-button>
        </div>
      </template>
    </a-modal>
    <a-modal
      v-model="show_create_connection"
      :title="update_connection ? 'Update Connection': 'Add New Connection'"
      :closable="false"
    >
      <template slot="footer">
        <a-button key="back" @click="close" :disabled="loading">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="submit">Submit</a-button>
      </template>

      <template>
        <!-- own connection -->
        <a-form :form="form">
          <a-form-item label="Connection Name">
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: 'Please input the connection name' }]}
              ]"
              placeholder="Please enter the connection name"
            />
          </a-form-item>
          <a-form-item label="Members">
            <a-select
              v-decorator="['members']"
              mode="multiple"
              placeholder="Add a member"
              :filterOption="false"
              @search="v => search_user=v"
              notFoundContent="No Result"
            >
              <a-select-option
                v-for="item in users"
                :key="item.account_id"
              >{{item.name.first}} {{item.name.last}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <!-- Add contacts -->
        <p>Or add members from your social media contact list (optional)</p>
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
      </template>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      search_user: "",
      loading: false,
      reload_connection: false,
      form: this.$form.createForm(this)
    };
  },
  created() {
    console.log('this :', this.$form);
  },
  computed: {
    show() {
      return this.$store.state.connections.show_new_connection;
    },
    show_create_connection() {
      return this.$store.state.connections.show_create_connection;
    },
    update_connection() {
      return this.$store.state.connections.update_connection;
    },
    fetching_data() {
      return this.$store.state.connections.fetching_data;
    },
    search_connections() {
      var data = this.deepCopy(
        this.$store.state.connections.search_connections
      );
      return this.search
        ? data.filter(x => this.compareSearch([x._id, x.name], this.search))
        : [];
    },
    users() {
      var data = this.deepCopy(this.$store.state.users.users);
      return this.search_user
        ? data.filter(x =>
            this.compareSearch(
              [x.account_id, x.name.first, x.name.middle, x.name.last],
              this.search_user
            )
          )
        : [];
    },
    connections() {
      return this.$store.state.connections.connections;
    }
  },
  watch: {
    show_create_connection(val) {
      console.log('this.$form :', this.$form);
      if (val) {
        console.log('this.update_connection :', this.update_connection);
        if (this.update_connection) {
          var connection = this.connections.find(
            x => x._id.toString() === this.update_connection
          );
          this.form = this.$form.createForm(this, {
            mapPropsToFields() {
              return {
                name: this.$form.createFormField({
                  value: connection.name
                }),
                members: this.$form.createFormField({
                  value: connection.members
                })
              };
            }
          });
        } else {
          this.form = this.$form.createForm(this);
        }
      }
    }
  },
  methods: {
    compareSearch(sources, search_key) {
      if (!search_key) return false;
      if (Array.isArray(sources)) sources = [sources];
      console.log("sources :", sources);
      console.log("search_key :", search_key);
      return (
        sources.findIndex(
          v =>
            v
              .toString()
              .toLowerCase()
              .indexOf(search_key.toLowerCase()) > -1
        ) > -1
      );
    },
    close() {
      if (this.reload_connection) {
        this.$store.dispatch("GET_CONNECTIONS", { refresh: true });
        this.reload_connection = false;
      }
      this.$store.commit("SHOW_NEW_CONNECTION", false);
      this.$store.commit("SHOW_CREATE_CONNECTION", false);
    },
    connect(connection) {
      this.loading = true;
      this.$store
        .dispatch("CONNECT_TO_CONNECTION", { connection })
        .then(result => {
          this.$store.commit("CONNECT", { connection });
          this.loading = false;
          this.reload_connection = true;
        })
        .catch(err => {
          console.log("connect err :", err);
          this.loading = false;
        });
    },
    createConnection() {
      this.close();
      this.$store.dispatch("OPEN_CREATE_CONNECTION");
    },
    submit(e) {
      this.loading = true;
      e.preventDefault();
      this.form.validateFields((err, connection) => {
        if (!err) {
          console.log("Received values of form: ", connection);
          this.$store
            .dispatch("CREATE_CONNECTION", connection)
            .then(result => {
              console.table([result.data.model]);
              this.reload_connection = true;
              this.loading = false;
              this.close();
            })
            .catch(err => {
              console.log("CREATE_CONNECTION err :", err);
              this.loading = false;
            });
        } else {
          console.log("err :", err);
          this.loading = false;
        }
      });
    }
  }
};
</script>

<style>
.connect-action {
  border: 1px solid;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
}

.connect-action:hover {
  background: #1890ff;
  color: white;
}

.modal-search-connection .ant-modal-footer {
  border: none;
  padding: 10px 0;
}

.modal-search-connection .ant-modal-body {
  padding-bottom: 0px;
}

.modal-search-connection .ant-modal-header {
  text-align: center;
}
</style>