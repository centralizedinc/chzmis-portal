<template>
  <a-card :headStyle="main_layout_head_style" :bordered="false" class="cardStyle">
    <a-row slot="title">
      <a-col :span="23">Create Channel</a-col>
      <a-col :span="1" style="text-align: center">
        <a-icon large type="question-circle" @click="showDrawer" />
        <a-drawer
          title="Help Tips"
          placement="right"
          :closable="false"
          @close="onClose"
          :visible="visible"
        >
          <p>Choosing Interest helps you to optimize searches on channels ek ek</p>
          <p>To find a smaller and more focused channel that matches your interest, choose the ek ek ek</p>
          <p>Here’s how</p>
        </a-drawer>
      </a-col>
    </a-row>
    <!-- image slider -->
    <a-row>
      <a-col :span="24">
        <h4>Recommended for you</h4>
      </a-col>
      <a-col :span="24">
        <a-divider orientation="left">Movies</a-divider>
        <!-- images -->
        <div class="row">
          <div class="row__inner">
            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-5.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-6.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-7.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-8.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-9.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/70390/show-10.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Channel Title</div>
                <div class="margin align-item">
                  <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="age-limit">13+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    head_style() {
      return {
        "background-color": "rgb(49, 49, 49)",
        color: "white"
      };
    }
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    }
  }
};
</script>

<style scoped>
.cardStyle {
  border-radius: 25px !important;
  box-shadow: 0px 0px 10px 2px #88888847;
}
body,
html {
  padding: 0 10px;
  margin: 0;
  background: #0e0f11;
  color: #ecf0f1;
  font-family: "Open Sans", sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
* {
  box-sizing: border-box;
}
h1,
p {
  text-align: center;
}
p {
  width: 100%;
  max-width: 500px;
  margin: auto;
}
a:link,
a:hover,
a:active,
a:visited {
  transition: color 150ms;
  color: #95a5a6;
  text-decoration: none;
}
a:hover {
  color: #7f8c8d;
  text-decoration: underline;
}
.contain {
  width: 100%;
}
.row {
  overflow: scroll;
  width: 100%;
}
.row__inner {
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  margin: 20.3125px 0;
  padding-bottom: 10px;
}
.tile {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 140.625px;
  margin-right: 4px;
  font-size: 20px;
  cursor: pointer;
  font-weight: 200;
  transition: 450ms all;
  -webkit-transform-origin: center left;
  transform-origin: center left;
}
.tile__img {
  width: 250px;
  height: 140.625px;
  -o-object-fit: cover;
  object-fit: cover;
}
.tile__details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  font-size: 10px;
  opacity: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.tile:hover .tile__details {
  opacity: 1;
}
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: white;
  font-weight: 500;
  align-self: flex-start;
  font-size: 1.5vw;
  margin-bottom: 1.4vw;
}
.align-item {
  align-self: flex-start;
}
.row__inner:hover {
  -webkit-transform: translate3d(-62.5px, 0, 0);
  transform: translate3d(-62.5px, 0, 0);
}
.row__inner:hover .tile {
  opacity: 0.3;
}
.row__inner:hover .tile:hover {
  -webkit-transform: scale(1.5);
  transform: scale(1.5);
  opacity: 1;
}
.tile:hover ~ .tile {
  -webkit-transform: translate3d(125px, 0, 0);
  transform: translate3d(125px, 0, 0);
}
.margin {
  margin: 1px;
  font-size: 1.35vw;
  position: absolute;
  bottom: 0;
  padding-top: 40px;
  padding-bottom: 1vh;
  color: white;

  /* align-self: flex-start; */
}
.match {
  color: #45af5e;
  font-size: bold;
  margin-left: 1.2vh;
  font-size: 0.9vw;
}

.year {
  font-weight: 300;
  font-size: 0.9vw;
  color: white;
  margin-left: 2px;
}

.age-limit {
  border: 0.1em solid #fff;
  font-weight: 200;
  font-size: 0.9vw;
  margin-left: 7px;
  padding: 0 3px 0 3px;
}
</style>