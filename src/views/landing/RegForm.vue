<template>
    <a-layout>
      <div class="card-container">
      <a-row type="flex" align="middle">
        <a-col class="height: 500px" :span="16" :offset="2">
            <a-form
    :form="form"
    @submit="handleSubmit"
  >
  <h1>Input your personal details!</h1>
  <a-form-item
      v-bind="formItemLayout"
      label="First Name"
    >
      <a-input
        v-decorator="[
          'fname',
          {
            rules: [{
              
              required: true, message: 'Please input your first name!',
            }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Last Name"
    >
      <a-input
        v-decorator="[
          'lname',
          {
            rules: [{
              
              required: true, message: 'Please input your last name!',
            }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Username"
    >
      <a-input
        v-decorator="[
          'Uname',
          {
            rules: [{
              
              required: true, message: 'Please input your username!',
            }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="E-mail"
    >
      <a-input
        v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }]
          }
        ]"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Password"
    >
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item
      v-bind="formItemLayout"
      label="Confirm Password"
    >
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
    <a-form-item
      v-bind="formItemLayout"
    >
      <span slot="label">
        Nickname&nbsp;
        <a-tooltip title="What do you want others to call you?">
          <a-icon type="question-circle-o" />
        </a-tooltip>
      </span>
      <a-input
        v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }]
          }
        ]"
      />
    </a-form-item>
    <!-- <a-form-item
      v-bind="formItemLayout"
      label="Address"
    >
      <a-cascader
        v-decorator="[
          'residence',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          }
        ]"
        :options="residences"
      />
    </a-form-item> -->
    <a-form-item
      v-bind="formItemLayout"
      label="Phone Number"
    >
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
          <a-select-option value="63">
            +63
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    <!-- <a-form-item
      v-bind="formItemLayout"
      label="Website"
    >
      <a-auto-complete
        v-decorator="[
          'website',
          {rules: [{ required: true, message: 'Please input website!' }]}
        ]"
        placeholder="website"
        @change="handleWebsiteChange"
      >
        <template slot="dataSource">
          <a-select-option
            v-for="website in autoCompleteResult"
            :key="website"
          >
            {{ website }}
          </a-select-option>
        </template>
        <a-input />
      </a-auto-complete>
    </a-form-item> -->
    <!-- <a-form-item
      v-bind="formItemLayout"
      label="Captcha"
      extra="We must make sure that your are a human."
    >
      <a-row :gutter="8">
        <a-col :span="12">
          <a-input
            v-decorator="[
              'captcha',
              {rules: [{ required: true, message: 'Please input the captcha you got!' }]}
            ]"
          />
        </a-col>
        <a-col :span="12">
          <a-button>Get captcha</a-button>
        </a-col>
      </a-row>
    </a-form-item> -->
    <a-form-item v-bind="tailFormItemLayout">
      <a-checkbox
        v-decorator="['agreement', {valuePropName: 'checked'}]"
      >
        I have read the <a href="">
          agreement
        </a>
      </a-checkbox>
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button
        type="primary"
        html-type="submit"
      >
        Register
      </a-button>
    </a-form-item>
  </a-form>
            </a-col>
      </a-row>
    </div>
    </a-layout>
</template>

<script>
const residences = [];

export default {
  data () {
    return {
      confirmDirty: false,
      residences,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  created() {
    console.log('this.$route.query.data :', this.$route.query.data);
    var data = new Buffer(this.$route.query.data, 'base64').toString();
    console.log('data :', data);
  },
  methods: {
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleConfirmBlur  (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
    handleWebsiteChange  (value) {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.autoCompleteResult = autoCompleteResult;
    },
  },
};
</script>

<style>
.card-container {
  background: #f5f5f5;
  overflow: hidden;
  padding: 24px;
  text-align: center !important;
}
</style>
