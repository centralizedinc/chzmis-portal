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
            <div class="steps-content" v-if="current == 0" v-show="true">
              {{steps[current].content}}
              <firstStep :form="user_info"></firstStep>
            </div>
            <div class="steps-content" v-if="current == 1" v-show="true">
              {{steps[current].content}}
              <secondStep :form="user_info"></secondStep>
            </div>
            <div class="steps-content" v-if="current == 2" v-show="true">
              {{steps[current].content}}
              <thirdStep :form="user_info"></thirdStep>
            </div>

            <div class="steps-action">
              <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
              <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="submit($message.success('Please confirm your account through your email'))"
              >Done</a-button>
              <a-button v-if="current>0" style="margin-left: 8px" @click="prev">Previous</a-button>
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
import SignUpNew from "./SignUpNew";
import SignUp2 from "./SignUp2";
import SignUp3 from "./SignUp3";

export default {
  components: {
    firstStep: () => ({
      component: import("./SignUpNew")
    }),
    secondStep: () => ({
      component: import("./SignUp2")
    }),
    thirdStep: () => ({
      component: import("./SignUp3")
    })
  },
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
      // user_info:[],
      user_info: {
        category: "",
        email: "",
        name: {
          first: "",
          middle: "",
          last: ""
        },
        bday: "",
        password: ""
      }
    };
  },
  created() {
    console.log("user_info initialized:", this.user_info);
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
    init() {
      // this.user_info = JSON.parse(JSON.stringify(this.$store.state.third_party_libraries.facebook_details));
      // Facebook Details
      this.user_info.email = this.$store.state.third_party_libraries.facebook_details._json.email;
      this.user_info.name.first = this.$store.state.third_party_libraries.facebook_details._json.first_name;
      this.user_info.name.middle = this.$store.state.third_party_libraries.facebook_details._json.middle_name;
      this.user_info.name.last = this.$store.state.third_party_libraries.facebook_details._json.last_name;

      //Google Details
      this.user_info.email = this.$store.state.third_party_libraries.google_details._json.email;
      this.user_info.name.first = this.$store.state.third_party_libraries.google_details._json.first_name;
      this.user_info.name.middle = this.$store.state.third_party_libraries.google_details._json.middle_name;
      this.user_info.name.last = this.$store.state.third_party_libraries.google_details._json.last_name;
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    submit() {
      this.$store.dispatch("CREATE_ACCOUNT", this.user_info);
      console.log("console user information:", JSON.stringify(this.user_info));
      // console.log('username :', username);
      this.$router.push("/");
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
.steps-action {
  margin-top: 10px;
}
</style>