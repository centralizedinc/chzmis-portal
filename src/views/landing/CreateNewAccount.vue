<template>
  <div class="card-container bg_landing">
    <a-row type="flex" align="middle" style="height: 100%;">
      <a-col
        :xs="24"
        :sm="{span: 20, offset: 2}"
        :md="{span: 14, offset: 5}"
        :lg="{span: 10, offset: 7}"
        style="position: relative; font-weight: bold"
      >
        <div class="rounded-corners-transparent custom-size"></div>
        <a-card
          class="overlay-form"
          :headStyle="{'font-weight': 'bold', 'font-size':'20px','text-align': 'middle', color: 'black', 'border-bottom':'1px solid black'}"
          :bordered="false"
        >
          <!-- <div>
            <a-steps :current="0" size="small">
              <a-step title="First" />
              <a-step title="Second" />
              <a-step title="Third" />
            </a-steps>
          </div>-->

          <a-steps :current="current">
            <a-step size="small" v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div>
            <div class="steps-content" v-if="current == 0">
              {{steps[current].content}}
              <!-- <firstStep :form="form"></firstStep> -->
              <div align="middle">
                <h3>Please confirm your registration below</h3>
                <a-form :form="form">
                  <a-form-item>
                    <a-select
                      v-decorator="['category',{
                        rules: [rules.required('Category')],
                        initialValue: '0'
                      }]"
                      style="width: 120px"
                    >
                      <a-select-option value="0">Individual</a-select-option>
                      <a-select-option value="1">Corporate</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-form>
                <br />
                <i>Select approriate account type before proceeding</i>
              </div>
            </div>
            <div class="steps-content" v-else-if="current == 1">
              {{steps[current].content}}
              <!-- <secondStep :form="form"></secondStep> -->

              <div align="middle">
                <h4>Please confirm your registration below</h4>
                <a-form :form="form">
                  <a-form-item>
                    <a-upload
                      name="avatar"
                      listType="picture-card"
                      class="avatar-uploader"
                      :showUploadList="false"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :beforeUpload="beforeUpload"
                      @preview="handlePreview"
                      @change="handleChange"
                    >
                      <img v-if="avatar" :src="avatar" style="width: 100px;" alt="avatar" />
                      <div v-else>
                        <a-icon :type="loading ? 'loading' : 'plus'" />
                        <div class="ant-upload-text">Upload</div>
                      </div>
                    </a-upload>
                  </a-form-item>

                  <!-- email -->
                  <a-form-item>
                    <a-input
                      placeholder="Email Address"
                      v-decorator="[
                        'email',
                        {
                          rules: [rules.required('Email Address')]
                        }
                      ]"
                    />
                  </a-form-item>
                  <!-- name -->
                  <a-form-item>
                    <a-input
                      placeholder="First name"
                      v-decorator="[
                        'name.first',
                        {
                          rules: [rules.required('First Name')]
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-input
                      placeholder="Last Name"
                      v-decorator="[
                        'name.last',
                        {
                          rules: [rules.required('Last Name')]
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item>
                    <a-date-picker
                      placeholder="Birthdate"
                      v-decorator="['birthdate', {
                      rules: [rules.required('Date of Birth')]
                    }]"
                    />
                  </a-form-item>
                </a-form>
              </div>
            </div>
            <div class="steps-content" v-else-if="current == 2">
              {{steps[current].content}}
              <!-- <thirdStep :form="form"></thirdStep> -->
              <a-form :form="form">
                <a-form-item>
                  <a-input
                    placeholder="Create new password"
                    v-decorator="[
                      'password',
                      {
                        rules: [[rules.required('Password')], {
                          validator: validateToNextPassword,
                        }],
                      }
                    ]"
                    type="password"
                  />
                </a-form-item>
                <a-form-item>
                  <a-input
                    placeholder="Confirm new password"
                    v-decorator="[
                      'confirm_password',
                      {
                        rules: [[rules.required('Confirm Password')], {
                          validator: compareToFirstPassword,
                        }],
                      }
                    ]"
                    type="password"
                    @blur="handleConfirmBlur"
                  />
                </a-form-item>
              </a-form>
            </div>
            <div class="steps-action">
              <a-button
                v-if="current>0"
                :disabled="loading"
                style="margin-left: 8px"
                @click="prev"
              >Previous</a-button>

              <a-button
                :loading="loading"
                v-if="current === 2"
                type="primary"
                @click="submit($message.success('Please confirm your account through your email'))"
              >Done</a-button>
              <a-button v-else type="primary" @click="next" :loading="loading">Next</a-button>
            </div>
          </div>

          <!-- <div align="middle">
              <i>Select approriate account type before proceeding</i>
              <a-button type="primary" @click="second" block>Continue</a-button>
          </div>-->
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      avatar: null,
      // previewVisible: false,
      // previewImage: "",
      // fileList: [{}],

      current: 0,
      steps: [
        {
          title: "Category",
          //   content: import("./SignUpNew")
          content: ""
        },
        {
          title: "User details"
          //   content: import("./SignUp2")
          //   content: "Second-content"
        },
        {
          title: "Password"
          //   content: import("./SignUp3")
          //   content: "Last-content"
        }
      ],
      values: {
        category: "",
        email: "",
        avatar: "",
        name: {
          first: "",
          middle: "",
          last: ""
        },
        bday: "",
        password: "",
        method: "",
        google_id: "",
        facebook_id: ""
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
    console.log(
      "user_info STORE:Facebook",
      this.$store.state.third_party_libraries.facebook_details
    );
    console.log(
      "user_info STORE:Google",
      this.$store.state.third_party_libraries.google_details
    );

    //   this.init();
  },
  methods: {
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

    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, imageUrl => {
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
    }
  },

  init() {
  },
  next() {
    console.log("this.form_data :", this.form_data);
    this.form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        Object.keys(data).forEach(key => {
          this.form_data[key] = data[key];
        });
        // this.mapProps()
        this.current++;
      }
    });
  },
  prev() {
    console.log("this.form_data :", this.form_data);
    this.mapProps();
    this.current--;
  },
  mapProps() {
    var data = {};
    if (this.current === 1) {
      data = {
        category: this.$form.createFormField({
          value: this.form_data.category
        })
      };
    } else if (this.current === 2) {
      data = {
        email: this.$form.createFormField({
          value: this.form_data.email
        }),
        "name.first": this.$form.createFormField({
          value: this.form_data.name.first
        }),
        "name.last": this.$form.createFormField({
          value: this.form_data.name.last
        }),
        birthdate: this.$form.createFormField({
          value: this.form_data.birthdate
        })
      };
    }
    this.form = this.$form.createForm(this, {
      mapPropsToFields() {
        return data;
      }
    });
  },

  submit() {
    this.loading = true;
    this.form.validateFieldsAndScroll((err, data) => {
      if (!err) {
        Object.keys(data).forEach(key => {
          this.form_data[key] = data[key];
        });
        console.log("Received data of form: ", this.form_data);
        // this.$store.commit("update", values);
        this.form_data.avatar = this.avatar;
        this.$store
          .dispatch("CREATE_ACCOUNT", {account: this.avatar.form_data})
          .then(result => {
            console.log("result.data.model :", result.data.model);
            this.loading = false;
            this.$router.push("/");
          })
          .catch(err => {
            console.log("err :", err);
            this.loading = false;
          });
        // console.log("console user information:", JSON.stringify(this.values));
        // // console.log('username :', username);
      }
    });
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #fafafa;
  /* min-height: 200px; */
  text-align: center;
  padding-top: 10px;
  background: transparent;
}
/* avatar style */

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.custom-size {
  width: 800px;
  height: 550px;
}
/* .avatar-uploader > .ant-upload {
  width: 100px;
  height: 100px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
} */

/* .steps-action {
  margin-top: 10px;
} */
</style>