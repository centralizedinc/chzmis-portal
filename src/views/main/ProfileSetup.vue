<template>
  <a-form :form="form">
    <a-card class="cardStyle" :headStyle="main_layout_head_style" :bordered="false">
      <a-row slot="title">
        <a-col :span="23">Create Profile</a-col>
        <a-col :span="1" style="text-align: center">
          <a-icon large type="question-circle" @click="showDrawer" />
          <a-drawer
            title="Help Tips"
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="visible"
          >
            <!-- <p>Connection" is created for an organization or business to promote activities and to discuss anything under the sun.</p>
            <p>Users/Contacts may ask to join or must be invited to join a specific connection.</p>
            <p>Members can post their thoughts on the wall and interact with other members through discussion threads.</p>-->
          </a-drawer>
        </a-col>
      </a-row>
      <a-row type="flex">
        <a-col :span="8" justify="space-around" align="middle">
          <a-form-item>
            <a-upload
              name="avatar"
              listType="picture-card"
              class="avatar-profile"
              :showUploadList="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              @change="handleChange"
            >
              <img v-if="avatar" :src="values.avatar" style="width: 100px;" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <h4>Select your Account Category</h4>
          <a-form-item>
            <a-select
              v-decorator="['values.category',{rules: [{ required: true, message: 'Please input your category, otherwise choose continue later' }]}]"
              placeholder="Select your category"
            >
              <a-select-option value="individual">Individual</a-select-option>
              <a-select-option value="corporate">Corporate</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <!-- <a-divider>or</a-divider> -->
        <!-- <a-button type="secondary" block @click="show_search">Search and Connect with Others</a-button>
        <search-connection :show_search="modal" @close="modal = false"></search-connection>-->
      </a-row>
      <a-row>
        <a-col :span="24">
          <h4>Account Information</h4>
        </a-col>
        <a-row :gutter="12">
          <a-col :span="10">
            <a-form-item>
              <a-input
                placeholder="First name"
                v-decorator="[
                        'values.name.first',
                        {
                          rules: [rules.required('First Name')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input
                placeholder="Middle name"
                v-decorator="[
                        'values.name.middle',
                        {
                          rules: [rules.required('Middle Name')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-input
                placeholder="Last Name"
                v-decorator="[
                        'values.name.last',
                        {
                          rules: [rules.required('Last Name')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :span="6">
            <a-form-item>
              <a-input
                placeholder="Nickname"
                v-decorator="[
                        'values.nickname',
                        {
                          rules: [rules.required('Nickname')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item>
              <a-input
                placeholder="Phone number"
                v-decorator="[
                        'values.phone',
                        {
                          rules: [rules.required('Phone Number')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item>
              <a-input
                placeholder="Email Address"
                v-decorator="[
                        'values.email',
                        {
                          rules: [rules.required('Email Address')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item>
              <a-date-picker
                placeholder="Birthdate"
                v-decorator="['values.birthdate', {
                      rules: [rules.required('Date of Birth')]
                    }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-form-item>
              <a-input
                placeholder="Address"
                v-decorator="[
                        'values.address',
                        {
                          rules: [rules.required('Address')]
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
        </a-row>

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
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  components: {
    // searchConnection: () => import("@/components/SearchConnection")
  },
  data() {
    return {
      users: [],
      // loading: false,
      imageUrl: "",
      // modal: false,
      visible: false,

      avatar: null,
      values: {
        category: "",
        email: "",
        avatar: "",
        name: {
          first: "",
          middle: "",
          last: ""
        },
        bday: ""
      },
      form: this.$form.createForm(this),
      rules: {
        required: v => {
          return { required: true, message: `${v} is required!` };
        }
      },
      form_data: {}
    };
  },
  created() {
    // console.log("user_info initialized:", this.user_info);
    console.log("USER DETAILS STORE:", this.$store.state.accounts.user);
    console.log("ACCOUNT DETAILS STORE:", this.$store.state.accounts.account);
    // console.log('this.form :', JSON.stringify(this.form));
    // this.avatar = this.$store.state.accounts.user.avatar;
    // this.email = this.$store.state.accounts.user.email;
    // this.name.first = this.$store.state.accounts.user.name.first;
    // this.name.last = this.$store.state.accounts.user.name.last;
    this.form=this.$form.createForm(this, {
      onFieldsChange: (_, changeFields) => {
        this.$emit('change', changeFields);
      },
      mapPropsToFields: () => {
        return {
          username: this.$form.createFormField({
            value: this.values,
          }),
        };
      },
      onValuesChange: (_, values) =>{
        console.log(values);
        // Synchronize to vuex store in real time 
        // this.$store.commit('update', values)
      },
    })
    this.init();
  },
  computed: {
    head_style() {
      return { "background-color": "rgb(49, 49, 49)", color: "white" };
    },
    active_user() {
      // return this.$store.state.active_user;
      console.log("active_user account :", account);
      if (this.$store.state.users.active_user) {
        return this.getUsers(account);
      } else {
        this.getLoginUser();
      }
    },
    values() {
      return this.$store.state.account
    }
  },
  watch: {
    values (val) {
      console.log('this.$store.state.account: ', val);
      this.form.setFieldsValue({
        values: val
      })
    }
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    // show_search() {
    //   this.modal = true;
    //   // this.visible = false;
    // },
    continueLater() {
      this.$router.push("/");
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
          this.$store
            .dispatch("CREATE_ACCOUNT", { account: this.avatar.form_data })
            .then(result => {
              console.log("result.data.model :", result.data.model);
              this.loading = false;
              this.$router.push("main/setup/connection");
            })
            .catch(err => {
              console.log("err :", err);
              this.loading = false;
            });
        }
      });
    },

    // AVATAR
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, avatar => {
          this.avatar = avatar;
          this.loading = false;
        });
      }
    },
    init() {
      console.log("USER :", JSON.stringify(this.$store.state.accounts.account));
      // this.avatar = this.$store.state.accounts.user.avatar;
      // this.form_data.email = JSON.stringify(this.$store.state.accounts.account.email);
      // this.name.first = this.$store.state.accounts.user.name.first;
      // this.name.last = this.$store.state.accounts.user.name.last;
    }
  },

  // Methods Copy

  showProfile() {
    this.$refs.form.validate();
    if (this.valid) {
      this.show_profile = true;
    } else {
      this.$notifyError([{ message: "Please fill-up required fields" }]);
    }
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
  // compareToFirstPassword(rule, value, callback) {
  //   const form = this.form;
  //   if (value && value !== form.getFieldValue("password")) {
  //     callback("Two passwords that you enter is inconsistent!");
  //   } else {
  //     callback();
  //   }
  // },
  // validateToNextPassword(rule, value, callback) {
  //   const form = this.form;
  //   if (value && this.confirmDirty) {
  //     form.validateFields(["confirm"], { force: true });
  //   }
  //   callback();
  // },

  handleChange(info) {
    if (info.file.status === "uploading") {
      this.loading = true;
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.avatar = imageUrl;
        this.loading = false;
      });
    }
  },
  beforeUpload(file) {
    var avatar = null;
    if (this.post_file_list.length) {
      form_data = new FormData();
      form_data.append("avatar", file, file.name);
    }
  },

  //  profile() {
  //   this.users = [];
  //   this.loading = false;
  //   var _form = this.$form;
  //   this.form = this.$form.createForm(this, {
  //     mapPropsToFields() {
  //       console.log('this.form :', this.form);
  //       return {
  //         users: _form.createFormField({
  //           value: []
  //         })
  //       };
  //     }
  //   });
  // },

  mapProps() {
    var data = {};
    data = {
      avatar: this.$form.createFormField({
        value: this.form_data.avatar
      }),
      category: this.$form.createFormField({
        value: this.form_data.category
      }),
      email: this.$form.createFormField({
        value: this.form_data.email
      }),
      "name.first": this.$form.createFormField({
        value: this.form_data.name.first
      }),
      "name.last": this.$form.createFormField({
        value: this.form_data.name.last
      }),
      bday: this.$form.createFormField({
        value: this.form_data.birthdate
      })
    };
    this.form = this.$form.createForm(this, {
      mapPropsToFields() {
        return data;
      }
    });
  }
};
</script>

<style>
.cardStyle {
  border-radius: 25px !important;
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>
