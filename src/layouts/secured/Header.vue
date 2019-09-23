<template>
  <a-row type="flex" align="middle" style="height: 50px">
    <a-col :md="3" :xs="12" class="header-title">
      <a href="/" class="router-link-active" id="logo">
        <img alt="logo" height="40" :src="headerIcon" />
      </a>
    </a-col>
    <a-col :md="{ span: 4, offset: 14}" :xs="0">
      <a-input-search placeholder="Search" @search="onSearch" enterButton />
    </a-col>
    <a-col :md="{ span: 2, offset: 1}" :xs="0">
      <a-dropdown placement="bottomRight">
        <a-menu slot="overlay" @click="handleAccMenuClick">
          <a-menu-item key="1" @click="showModal">
            <a-icon type="user" />Account
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="user" />Settings
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upowser" />Logout
          </a-menu-item>
        </a-menu>
        <a-button style="background: transparent; border: none;font-size: 20px;box-shadow: none">
          <a-avatar
            shape="circle"
            :size="36"
            :src="getLoginUser().avatar"
          >{{getLoginUser("initial")}}</a-avatar>
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </a-col>
    <div class="account-modal">
      <a-modal v-model="visible" title="My Account" onOk="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">Return</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Submit</a-button>
        </template>
        <a-card style="border: 0px solid rgba(0,0,0,.4);" :headStyle="main_layout_head_style">
          <p style="text-align: center">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item class="align-items-middle">
                <a-upload
                  listType="picture-card"
                  class="avatar-profile"
                  :showUploadList="false"
                  :beforeUpload="uploadAvatar"
                  @change="handleChangeAvatar"
                >
                  <img v-if="avatar" :src="avatar" :alt="avatar" />
                  <div v-else>
                    <a-icon v-if="loading_avatar" type="loading" />
                    <div class="ant-upload-text" v-else>Upload Avatar</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Fullname">
                <a-input
                  v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input your fullname', whitespace: true }]
          }
        ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Address">
                <a-input
                  v-decorator="[
          'address',
          {
            rules: [{ required: true, message: 'Please input your address', whitespace: true }]
          }
        ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Birthday">
                <a-date-picker
                  @change="onChange"
                  v-decorator="[
          'birthday',
          {
            rules: [{ required: true, message: 'Please select your birthday', whitespace: true }]
          }
        ]"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Phone Number">
                <a-input
                  v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          }
        ]"
                  style="width: 100%"
                >
                  <a-select
                    slot="addonBefore"
                    v-decorator="[
            'prefix',
            { initialValue: '63' }
          ]"
                    style="width: 70px"
                  >
                    <a-select-option value="63">+63</a-select-option>
                    <a-select-option value="87">+87</a-select-option>
                  </a-select>
                </a-input>
              </a-form-item>
            </a-form>
          </p>
        </a-card>
      </a-modal>
    </div>
  </a-row>
</template>

<script>
import headerIcon from "../../assets/Chzmis.png";
export default {
  data() {
    return {
      headerIcon,
      users: [],
      name: "",
      loading: false,
      visible: false,
      user: {
        avatar:
          "https://www.birthdaymessagesstatus.com/wp-content/uploads/2018/08/Stylish-Attitude-Girl-Images-for-FB-Profile-Pic-300x291.jpg",
        full_name: "Cheka"
      },
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 14,
            offset: 5
          }
        }
      },
      form: this.$form.createForm(this),
      loading_avatar: false,
      // avatar: {
      //   imageUrl: "",
      //   form_data: null
      // }
      avatar: null
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.profile();
    this.avatar = this.$store.state.accounts.user.avatar;
  },
  computed: {
    user_details() {
      console.log('user details :', this.$store.state.accounts.user);
      return this.$store.state.accounts.user;
    },
    account_details() {
      console.log('account details :', this.$store.state.accounts.account);
      return this.$store.state.accounts.account;
    }
  },
  watch: {
    user_details(val) {
      var _form = this.$form,
        _self = this;
      if (val)
        if (this.user_details) {
          this.users = this.user_details.users;
          this.form = this.$form.createForm(this, {
            mapPropsToFields() {
              return {
                name: _form.createFormField({
                  value: _self.user_details.name
                })
              };
            }
          });
        } else {
          this.profile();
        }
    }
  },
  methods: {
    profile() {
      this.users = [];
      this.loading = false;
      var _form = this.$form;
      this.form = this.$form.createForm(this, {
        mapPropsToFields() {
          return {
            users: _form.createFormField({
              value: []
            })
          };
        }
      });
    },
    init() {
      console.log(
        "accounts details :",
        this.$store.state.accounts.account
      );
      console.log(
        "users details :",
        this.$store.state.accounts.user
      );
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
            body = {
              id: this.selected_connection._id,
              connection: { name: connection.name, members: this.members }
            };
          }
          this.$store
            .dispatch(action, { body, form_data: this.avatar })
            .then(result => {
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
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 500);
      this.$message.success("Profile Update Successfull");
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleAccMenuClick(e) {
      console.log("key :", e);
      if (e.key === "3") {
        this.logout();
      }
    },
    onSearch(value) {
      console.log("Search for :", value);
    },
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    handleWebsiteChange(value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = [".com", ".org", ".net"].map(
          domain => `${value}${domain}`
        );
      }
      this.autoCompleteResult = autoCompleteResult;
    },
    uploadAvatar(file) {
      var avatar = new FormData();
      avatar.append("avatar", file, file.name);
      this.avatar = avatar;
      this.getBase64(file, avatar => {
        this.avatar = avatar;
        this.loading_avatar = false;
      });
    }
  }
};
</script>

<style>
.header-title {
  /* color: #ffffff;
  font-size: 48px;
  font-weight: bold;
  text-shadow: 2px 2px #000000;
  background-color: #fff6e2; */
  padding: 0px 0px 0px 20px !important;
}

.ant-card-body {
  padding: 0px;
  zoom: 1;
}

.avatar-profile .ant-upload.ant-upload-select-picture-card,
.avatar-profile img {
  border-radius: 50%;
}

.avatar-profile img {
  width: 110px;
}

.account-modal .ant-modal-header {
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #40a9ff !important;
  color: #1890ff !important;
  border-bottom: 1px solid #1890ff !important;
}
</style>
