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
              <img v-if="avatar" :src="avatar" style="width: 100px;" alt="avatar" />
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
              v-decorator="['category',{rules: [{ required: true, message: 'Please input your category, otherwise choose continue later' }]}]"
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
                        'name.first',
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
                        'name.middle',
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
                        'name.last',
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
                        'name.nickname',
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
                        'phone',
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
                        'email',
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
                v-decorator="['birthdate', {
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
                        'address',
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
      values: {
        avatar: "",
        category: "",
        email: "",
        birthdate: "",
        name:{
          first: "",
          middle: "",
          laste: "",
          nickname: "",
        },
        
        address: ""

      },
      users: [],
      // loading: false,
      // imageUrl: "",
      // modal: false,
      visible: false,
      form: this.$form.createForm(this),
      rules: {
        required: v => {
          return { required: true, message: `${v} is required!` };
        }
      },
      form_data: {}
    };
  },
  // created() {
  //   // console.log("user_info initialized:", this.user_info);
  //   console.log("USER DETAILS STORE:", this.$store.state.accounts.user);
  //   console.log("ACCOUNT DETAILS STORE:", this.$store.state.accounts.account);
  //   // console.log('this.form :', JSON.stringify(this.form));
    // this.avatar = this.$store.state.accounts.user.avatar;
    
      
  // },
  computed: {
    head_style() {
      return { "background-color": "rgb(49, 49, 49)", color: "white" };
    }
  },
  watch: {
    
  },

  created () {
    console.log('USER INFO :', this.$store.state.accounts.user);
    console.log('ACCOUNT INFO :', this.$store.state.accounts.account);
    this.avatar = this.$store.state.accounts.user.avatar;
    // this.id = this.$store.state.accounts.user._id
    this.status = 2;
    this.form_data._id = this.$store.state.accounts.account._id;
    // this.email = this.$store.state.accounts.user.email;
    // this.form.email= this.$store.state.accounts.user.email;
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
      this.mapProps();
      this.$router.push("/");
    },
    mapProps() {
    var data = {};
    data = {
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
        birthdate: this.$form.createFormField({
          value: this.form_data.birthdate 
        })
    }
        
    this.form = this.$form.createForm(this, {
      mapPropsToFields() {
        return data;
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
          this.form_data.status = 2;
          // this.$store.dispatch("UPDATE_PROFILE", { _id: this.form_data._id ,user: this.form_data })
          return this.$router.push("main/setup/connection")
            .then(result => {
              // console.log("result.data.model :", result.data.model);
              // this.loading = false;
            // return this.$store.dispatch("UPDATE_PROFILE", { _id: this.form_data._id , account:{ status: this.form_data.status}})
            // return this.$router.push("main/setup/connection");
            //   console.log('UPDATE PROFILE SUCCESS' );
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
    }
  },
};
</script>

<style>
.cardStyle {
  border-radius: 25px !important;
  box-shadow: 0px 0px 10px 2px #88888847;
}
</style>
