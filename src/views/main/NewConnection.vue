<template>
  <div>
    <a-modal
      title="Search Connection"
      :visible="show"
      @cancel="close"
      :footer="loading || fetching_data ? null: undefined"
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
      :title="selected_connection ? 'Update Connection': 'Add New Connection'"
      :footer="loading || fetching_data ? null: undefined"
      :closable="false"
    >
      <div v-if="loading || fetching_data" class="demo-loading-container">
        <a-spin />
      </div>
      <template v-else>
        <!-- own connection -->
        <a-form :form="form">
          <a-form-item class="align-items-middle">
            <a-upload
              listType="picture-card"
              class="avatar-uploader"
              :showUploadList="false"
              :beforeUpload="uploadAvatar"
              @change="handleChangeAvatar"
            >
              <img v-if="avatar.imageUrl" :src="avatar.imageUrl" :alt="avatar.imageUrl" />
              <div v-else>
                <a-icon v-if="loading_avatar" type="loading" />
                <div class="ant-upload-text" v-else>Upload Avatar</div>
              </div>
            </a-upload>
          </a-form-item>
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
            <!-- <template v-for="(item, i) in form.getFieldValue('members')"> -->
            <a-form-item :style="{ display: 'inline-block', width: '75%' }">
              <a-select
                v-decorator="['member_account_id']"
                placeholder="Add a member"
                showSearch
                optionFilterProp="children"
                :filterOption="filterOption"
                @search="v => search_user=v"
                notFoundContent="No Result"
              >
                <a-select-option
                  v-for="item in users"
                  :key="item.account_id"
                >{{item && item.name ? `${item.name.first} ${item.name.last}` : ""}}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :style="{ display: 'inline-block', width: '25%' }">
              <a-select v-decorator="['member_role', { initialValue: '0' }]" placeholder="Role">
                <a-select-option value="0">Member</a-select-option>
                <a-select-option value="1">Admin</a-select-option>
              </a-select>
            </a-form-item>
            <!-- <a-form-item
                :key="`r${i}`"
                :style="{ 'text-align': 'center', display: 'inline-block', width: '5%' }"
              >
                <a-icon
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  @click="() => remove(i)"
                />
              </a-form-item>
            </template>-->
            <!-- <a-form-item v-bind="formItemLayoutWithOutLabel" style="text-align:center">
              <a-button type="dashed" style="width: 60%" @click="addMember">
                <a-icon type="plus" />Add Member
              </a-button>
            </a-form-item>-->
            <a-form-item style="text-align: center">
              <a-button type="primary" style="width: 40%" @click="addMember">Add</a-button>
            </a-form-item>
            <a-form-item>
              <a-select
                @deselect="removeMember"
                v-decorator="['members_index']"
                mode="multiple"
                :open="false"
              >
                <a-select-option v-for="item in members" :key="item.account_id">
                  <!-- {{item.account_id}} -->
                  {{getUsers(item.account_id, "fullname")}}/{{["Member","Admin"][item.role]}}
                </a-select-option>
              </a-select>
            </a-form-item>
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

      <template slot="footer">
        <a-button key="back" @click="close" :disabled="loading">Cancel</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="submit">Submit</a-button>
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
      members: [],
      form: this.$form.createForm(this),
      loading_avatar: false,
      avatar: {
        imageUrl: "",
        form_data: null
      }
    };
  },
  created() {
    this.reset();
  },
  computed: {
    show() {
      return this.$store.state.connections.show_new_connection;
    },
    show_create_connection() {
      return this.$store.state.connections.show_create_connection;
    },
    selected_connection() {
      return this.deepCopy(this.$store.state.connections.selected_connection);
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
        ? data.filter(x => {
            return this.compareSearch(
              [
                x.account_id,
                x.name ? x.name.first : "",
                x.name ? x.name.last : "",
                x.email
              ],
              this.search_user
            );
          })
        : [];
    },
    connections() {
      return this.$store.state.connections.connections;
    }
    // form_accounts() {
    //   var members = this.form.getFieldValue("members");
    //   if (members.length) {
    //     const accounts = members.map(x => x.account_id);
    //     return accounts;
    //   } else return [];
    // }
  },
  watch: {
    show_create_connection(val) {
      var _form = this.$form,
        _self = this;
      if (val)
        console.log("this.selected_connection :", this.selected_connection);
      if (this.selected_connection) {
        this.avatar.imageUrl = this.selected_connection.avatar ? this.selected_connection.avatar.location : null;
        this.members = this.selected_connection.members;
        this.form = this.$form.createForm(this, {
          mapPropsToFields() {
            return {
              name: _form.createFormField({
                value: _self.selected_connection.name
              }),
              members_index: _form.createFormField({
                value: _self.members.map(x => x.account_id)
              })
            };
          }
        });
      } else {
        this.reset();
      }
    }
  },
  methods: {
    reset() {
      this.members = [];
      this.search = "";
      this.avatar.imageUrl = "";
      this.avatar.form_data = null;
      this.search_user = "";
      this.loading = false;
      var _form = this.$form;
      this.form = this.$form.createForm(this, {
        mapPropsToFields() {
          return {
            members: _form.createFormField({
              value: []
            })
          };
        }
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    compareSearch(values, search_key) {
      if (!search_key || !values) return false;
      if (!Array.isArray(values)) values = [values];
      for (let i = 0; i < values.length; i++) {
        if (
          values[i] &&
          values[i]
            .toString()
            .toLowerCase()
            .indexOf(search_key.toLowerCase()) > -1
        )
          return true;
      }
      return false;
      // return (
      //   sources.findIndex(
      //     v =>
      //       v
      //         .toString()
      //         .toLowerCase()
      //         .indexOf(search_key.toLowerCase()) > -1
      //   ) > -1
      // );
    },
    close() {
      this.reset();
      this.$store.commit("SET_SELECTED_CONNECTION", null);
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
        })
        .catch(err => {
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
          var action = "CREATE_CONNECTION",
            body = { name: connection.name, members: this.members };
          if (this.selected_connection) {
            action = "UPDATE_CONNECTION";
            console.log(
              "this.selected_connection._id :",
              this.selected_connection._id
            );
            body = {
              id: this.selected_connection._id,
              connection: {
                name: connection.name,
                members: this.members,
                avatar: this.selected_connection.avatar
              }
            };
          }
          console.log("this.members :", this.members);
          this.$store
            .dispatch(action, { body, form_data: this.avatar.form_data })
            .then(result => {
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
    },
    addMember() {
      // var counts = this.form.getFieldValue("counts");
      // counts++
      // this.form.setFieldsValue({
      //   counts
      // });
      const account_id = this.form.getFieldValue("member_account_id");
      const role = this.form.getFieldValue("member_role");
      this.members.push({ account_id, role });
      this.form.setFieldsValue({
        members_index: this.members.map(x => x.account_id),
        member_account_id: "",
        member_role: "0"
      });
    },
    removeMember(account_id) {
      const i = this.members.findIndex(x => x.account_id === account_id);
      this.members.splice(i, 1);
      this.form.setFieldsValue({
        members_index: this.members.map(x => x.account_id)
      });
    },
    remove(index) {
      var current_members = this.form.getFieldValue("members");
      var members = current_members.filter((v, i) => i !== index);
      this.form.setFieldsValue({
        members
      });
    },
    handleChangeAvatar(info) {
      if (info.file.status === "uploading") {
        this.loading_avatar = true;
        return;
      }
    },
    uploadAvatar(file) {
      var form_data = new FormData();
      form_data.append("avatar", file, file.name);
      this.avatar.form_data = form_data;
      this.getBase64(file, imageUrl => {
        this.avatar.imageUrl = imageUrl;
        this.loading_avatar = false;
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

.dynamic-delete-button {
  cursor: pointer;
  font-size: 10px;
}

.avatar-uploader img {
  width: 110px;
}
</style>