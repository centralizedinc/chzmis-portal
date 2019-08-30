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
              <div align="left">
                <h4>Please confirm your registration below</h4>
                <a-form :form="form">
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
              <a-button v-if="current>0" style="margin-left: 8px" @click="prev">Previous</a-button>

              <a-button
                v-if="current === 2"
                type="primary"
                @click="submit($message.success('Please confirm your account through your email'))"
              >Done</a-button>
              <a-button v-else type="primary" @click="next">Next</a-button>
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
      current: 0,
      steps: [
        {
          title: "First",
          //   content: import("./SignUpNew")
          content: ""
        },
        {
          title: "Second"
          //   content: import("./SignUp2")
          //   content: "Second-content"
        },
        {
          title: "Last"
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

    this.init();
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

    init() {
      // signup_method facebook
      console.log(
        "this.$store.state.third_party_libraries.signup_method :",
        this.$store.state.third_party_libraries.signup_method
      );
      this.form_data.method = this.$store.state.third_party_libraries.signup_method;
      if (this.$store.state.third_party_libraries.signup_method == "facebook") {
        const facebook_details = this.deepCopy(
          this.$store.state.third_party_libraries.facebook_details
        );
        console.log("facebook_details :", facebook_details);
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            return {
              email: this.$form.createFormField({
                value: facebook_details.emails[0].value
              }),
              "name.first": this.$form.createFormField({
                value: facebook_details.name.givenName
              }),
              "name.last": this.$form.createFormField({
                value: facebook_details.name.familyName
              })
            };
          }
        });
        this.form_data.facebook_id = facebook_details.id;
      } else if (
        this.$store.state.third_party_libraries.signup_method === "google"
      ) {
        // signup_method google
        const google_details = this.deepCopy(
          this.$store.state.third_party_libraries.google_details._json
        );
        this.form = this.$form.createForm(this, {
          mapPropsToFields: () => {
            console.log(
              "google details :",
              this.$store.state.third_party_libraries.google_details
            );
            return {
              email: this.$form.createFormField({
                value: google_details.email
              }),
              "name.first": this.$form.createFormField({
                value: google_details.given_name
              }),
              "name.last": this.$form.createFormField({
                value: google_details.family_name
              })
            };
          }
        });
        this.form_data.google_id = google_details.sub;
      } else if (
        this.$store.state.third_party_libraries.signup_method === "local"
      ) {
        // local sign up
        this.form = this.$form.createForm(this);
      }

      // this.user_info = JSON.parse(JSON.stringify(this.$store.state.third_party_libraries.facebook_details));
      // Facebook Details

      // this.email.value = this.$store.state.third_party_libraries.facebook_details._json.email;
      // this.name.first.value = this.$store.state.third_party_libraries.facebook_details._json.first_name;
      // this.user_info.name.middle = this.$store.state.third_party_libraries.facebook_details._json.middle_name;
      // this.user_info.name.last = this.$store.state.third_party_libraries.facebook_details._json.last_name;
      // this.user_info.avatar = this.$store.state.third_party_libraries.facebook_details._json.picture.data.url;
      // this.user_info.facebook_id = this.$store.state.third_party_libraries.facebook_details._json.id;
      // this.user_info.method = this.$store.state.third_party_libraries.facebook_details.provider;

      //Google Details

      // this.user_info.email = this.$store.state.third_party_libraries.google_details._json.email;
      // this.user_info.name.first = this.$store.state.third_party_libraries.google_details._json.given_name;
      // this.user_info.name.middle = this.$store.state.third_party_libraries.google_details._json.middle_name;
      // this.user_info.name.last = this.$store.state.third_party_libraries.google_details._json.family_name;
      // this.user_info.avatar = this.$store.state.third_party_libraries.google_details._json.picture;
      // this.user_info.google_id = this.$store.state.third_party_libraries.google_details._json.sub;
      // this.user_info.method = this.$store.state.third_party_libraries.google_details.provider;
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
      this.form.validateFieldsAndScroll((err, data) => {
        if (!err) {
          Object.keys(data).forEach(key => {
            this.form_data[key] = data[key];
          });
          console.log("Received data of form: ", this.form_data);
          // this.$store.commit("update", values);
          this.$store
            .dispatch("CREATE_ACCOUNT", this.form_data)
            .then(result => {
              console.log("result.data.model :", result.data.model);
              this.$router.push("/");
            })
            .catch(err => {
              console.log("err :", err);
            });
          // console.log("console user information:", JSON.stringify(this.values));
          // // console.log('username :', username);
        }
      });
    }
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
/* .steps-action {
  margin-top: 10px;
} */
</style>