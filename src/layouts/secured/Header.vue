<template>
  <a-row type="flex" align="middle" style="height: 40px">
    <a-col :md="3" :xs="12" class="header-title">
      <a href="/" class="router-link-active" id="logo">
        <img alt="logo" height="30" :src="headerIcon" />
      </a>
    </a-col>
    <a-col :md="{ span: 4, offset: 14}" :xs="0">
      <a-input-search placeholder="Search" @search="onSearch" enterButton size="small" />
    </a-col>
    <a-col :md="{ span: 2, offset: 1}" :xs="0">
      <a-dropdown placement="bottomRight">
        <a-menu slot="overlay" @click="handleAccMenuClick">
          <a-menu-item key="1" @click="showModalAccounts">
            <a-icon type="user" />Account
          </a-menu-item>
          <a-menu-item key="2" @click="showModalSettings">
            <a-icon type="user" />Settings
          </a-menu-item>
          <a-menu-item key="3"> 
            <a-icon type="upowser" />Logout
          </a-menu-item>
        </a-menu>
        <a-button style="background: transparent; border: none;font-size: 20px;box-shadow: none">
          <a-avatar shape="circle" :src="getLoginUser().avatar">{{getLoginUser("initial")}}</a-avatar>
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </a-col>
    <div>
      <a-modal class="account-modal" v-model="visible" title="My Account" onOk="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">Return</a-button>
          <a-button key="submit
          " type="primary" :loading="loading" @click="next()">Submit</a-button>
        </template>
        <a-card style="border: 0px solid rgba(0,0,0,.4);" :headStyle="main_layout_head_style">
          <p style="text-align: center">
            <a-form :form="form" @submit="handleSubmit" class="custom-textarea">
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
              <a-form-item v-bind="formItemLayout" label="First name">
                <a-input placeholder="First name" v-model="user_profile.name.first" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Middle name">
                <a-input placeholder="Middle name" v-model="user_profile.name.middle" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Last name">
                <a-input placeholder="Last Name" v-model="user_profile.name.last" />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Birthday">
                <a-date-picker
                  style="width: 100%"
                  @change="onChange"
                  placeholder="Birthdate"
                  v-model="user_profile.birthdate"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Phone Number">
                <a-input
                  placeholder="Phone number"
                  v-model="user_profile.phone"
                  style="width: 100%"
                ></a-input>
              </a-form-item>
            </a-form>
          </p>
        </a-card>
      </a-modal>
    </div>
    <div>
      <a-modal
        class="password-modal"
        v-model="visibleSettings"
        title="Change Password"
        onOk="changePassword"
      >
        <template slot="footer">
          <a-button
            key="Change Password"
            type="primary"
            :loading="loading"
            @click="changePassword"
          >Change Password</a-button>
        </template>
        <a-card style="border: 0px solid rgba(0,0,0,.4);" :headStyle="main_layout_head_style">
          <p style="text align-center">
            <a-form :form="form" @submit="handleSubmit">
              <a-form-item v-bind="formItemLayout" label="Current password">
                <a-input
                  v-decorator="[
          'current_password',
          { 
            rules: [{ required: true, message: 'Please input your old password!', whitespace: true }]
          }       
        ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="New Password">
                <a-input
                  v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your new password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
                  type="password"
                />
              </a-form-item>
              <a-form-item v-bind="formItemLayout" label="Confirm Password">
                <a-input
                  v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
                  type="password"
                  @blur="handleConfirmBlur"
                />
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
      account: [],
      name: "",
      loading: false,
      visible: false,
      visibleSettings: false,
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
      avatar: null,
      rules: {
        required: v => {
          return { required: true, message: `${v} is required!` };
        }
      },
      form_data: {},
      values: {
        avatar: "",
        name: {
          first: "",
          middle: "",
          last: ""
        },
        bday: "",
        phone: ""
      },

      // new data properties
      user_profile: {}
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.profile();
    this.user_profile = this.$store.state.accounts.user;
    this.avatar = this.$store.state.accounts.user.avatar;
    // this.name.first = this.$store.state.accounts.user.name.first;
    // this.name.last = this.$store.state.accounts.user.name.last;
    // console.log("ACCOUNT DETAILS:", this.$store.state.accounts.account);
  },
  computed: {
    user_details() {
      console.log("user details :", this.$store.state.accounts.user);
      return this.$store.state.accounts.user;
    },
    account_details() {
      console.log("account details :", this.$store.state.accounts.account);
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
                "name.first": _form.createFormField({
                  value: _self.user_details.name.first
                }),
                "name.middle": _form.createFormField({
                  value: _self.user_details.name.middle
                }),
                "name.last": this.$form.createFormField({
                  value: this.form_data.name.last
                }),
                birthdate: this.$form.createFormField({
                  value: this.form_data.birthdate
                })
              };
            }
          });
        } else {
          this.profile();
        }
    },
    account_details(val) {
      var _form = this.$form,
        _self = this;
      if (val)
        if (this.account_details) {
          this.users = this.account_details.account;
          this.form = this.$form.createForm(this, {
            mapPropsToFields() {
              return {
                name: _form.createFormField({
                  value: _self.account_details.name
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
      this.account = [];
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
    handleChangeAvatar() {},
    mapProps() {
      var data = {};
      data = {
        "name.first": this.$form.createFormField({
          value: this.form_data.name.first
        }),
        "name.middle": _form.createFormField({
          value: _self.user_details.name.middle
        }),
        "name.last": this.$form.createFormField({
          value: this.form_data.name.last
        }),
        birthdate: this.$form.createFormField({
          value: this.form_data.birthdate
        })
      };

      this.form = this.$form.createForm(this, {
        mapPropsToFields() {
          return data;
        }
      });
    },
    init() {
      console.log("accounts details :", this.$store.state.accounts.account);
      console.log("users details :", this.$store.state.accounts.user);
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
    next() {
      this.form.validateFieldsAndScroll((err, data) => {
        if (!err) {
          Object.keys(data).forEach(key => {
            this.form_data[key] = data[key];
          });
          console.log("Received data of form: ", this.form_data);
          // this.$store.commit("update", values);
          this.form_data.avatar = this.avatar;
          this.form_data.account_id;
          this.$store
            .dispatch("UPDATE_PROFILE", {
              account: this.form_data.account_id,
              user: this.form_data
            })
            .then(result => {
              console.log("result.data.model :", result.data.model);
              this.loading = false;
              this.$router.push("/");
              this.loading = true;
              setTimeout(() => {
                this.visible = false;
                this.visibleSettings = false;
                this.loading = false;
              }, 500);
              this.$message.success("Profile Update Successfull");
            })
            .catch(err => {
              console.log("err :", err);
              this.loading = false;
            });
        }
      });
    },
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    showModalAccounts() {
      this.visible = true;
    },
    showModalSettings() {
      this.visibleSettings = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.visibleSettings = false;
        this.loading = false;
      }, 500);
      this.$message.success("Profile Update Successfull");
      // this.$router.push('/')
    },
    changePassword() {
      this.loading = true;
      var current_password = this.form.getFieldValue("current_password");
      var new_password = this.form.getFieldValue("new_password");
      var confirm_password = this.form.getFieldValue("confirm_password");

      console.log(
        "check field current password: " +
          this.form.getFieldValue("current_password")
      );
      console.log(
        "users active user data: " +
          JSON.stringify(this.$store.state.accounts.user)
      );
      console.log(
        "account data: " +
          JSON.stringify(this.$store.state.accounts.account.email)
      );
      var email = this.$store.state.accounts.account.email;
      console.log("email checked: " + email);
      this.$store.dispatch("CHECK_EMAIL", email).then(result => {
        console.log("confirmed account result: " + JSON.stringify(result));
      });
      var password = {
       current_password: this.form.getFieldValue('current_password'),
       new_password: this.form.getFieldValue('password'),
       confirm_password: this.form.getFieldValue('confirm')
      }
      console.log("check field current password: " + this.form.getFieldValue('current_password'))
      console.log("users active user data: " + JSON.stringify(password))
      console.log("account data: " + JSON.stringify(this.$store.state.accounts.account.account_id))
      var id = this.$store.state.accounts.account.account_id
      console.log("email checked: " + id)
      this.$store.dispatch("CHANGE_PASSWORD", {id, password}).then((result)=>{
        console.log("confirmed account result: " + JSON.stringify(result))
      })

      setTimeout(() => {
        this.visible = false;
        this.visibleSettings = false;
        this.loading = false;
      }, 500);
      // this.$router.push('/')
    },
    handleCancel(e) {
      this.visible = false;
      this.visibleSettings = false;
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

.password-modal .ant-modal-header {
  padding: 16px 24px;
  border-radius: 4px 4px 0 0;
  background: #40a9ff !important;
  color: #1890ff !important;
  border-bottom: 1px solid #1890ff !important;
}

.custom-textarea .ant-input {
  height: 4vh !important;
}
</style>
