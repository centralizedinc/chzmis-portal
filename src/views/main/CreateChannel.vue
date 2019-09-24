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
      <!-- channels -->
      <a-col :span="24">
        <a-divider orientation="left">Music</a-divider>
        <!-- images -->
        <div class="row">
          <div class="row__inner">
            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Spotify</div>
                <div class="margin align-item">
                  <!-- <span class="match">% 98 Match</span>
                  <span class="year">2012</span>
                  <span class="subscribe">13+</span>-->
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://cdn.iconscout.com/icon/free/png-512/deezer-461785.png"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Deezer</div>
                <div class="margin align-item">
                  <!-- <span class="match">% 98 Match</span> -->
                  <!-- <span class="year">2012</span>
                  <span class="subscribe">13+</span>-->
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://i.ytimg.com/vi/Oc9zl8GnuPE/maxresdefault.jpg"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Google Music</div>
                <div class="margin align-item">
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://m.pnglot.com/pngfile/small/527-5277532_apple-music-png-svg-apple-music-logo-2019.png"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Apple Music</div>
                <div class="margin align-item">
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://www.thetechcolumn.com/wp-content/uploads/2018/04/home_facebook-37fa5e73bc84126deb6442674a3e15c97be1e4d29eebfd4f2db24bed442de7c6.png"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Napster</div>
                <div class="margin align-item">
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>

            <div class="tile">
              <div class="tile__media">
                <img
                  class="tile__img"
                  src="https://upload.wikimedia.org/wikipedia/en/archive/a/a8/20160507113732%21Tidalhifi.png"
                  alt
                />
              </div>
              <div class="tile__details">
                <div class="tile__title">Tidal</div>
                <div class="margin align-item">
                  <a-button
                    class="subscribe"
                    :size="size"
                    icon="caret-right"
                    type="danger"
                  >subscribe</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-divider></a-divider>
      <a-row type="flex" align="middle" :gutter="8">
        <a-col :span="6">
          <a-button block type="dashed" @click="continueLater">Continue Later</a-button>
        </a-col>
        <a-col :span="12">
          <a-button
            style="color: #2a6aaa; background-color: #fff6e2"
            block
            @click="createOwn"
          >Create my own channel</a-button>
        </a-col>
        <a-col :span="6">
          <a-button block type="primary" @click="next">Next</a-button>
        </a-col>
      </a-row>
    </a-row>
  </a-card>
</template>

<script>
export default {
  data() {
    return {
      size: "small",
      visible: false
    };
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
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    createOwn() {
      this.$router.push("own-channel");
    }
  }
};
</script>

<style scoped>
.cardStyle {
  /* border-radius: 25px !important; */
  box-shadow: 0px 0px 10px 2px #88888847;
}
/* body,
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
} */
/* * {
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
} */
/* a:link,
a:hover,
a:active, */
/* a:visited {
  transition: color 150ms;
  color: #95a5a6;
  text-decoration: none;
} */
/* a:hover {
  color: #7f8c8d;
  text-decoration: underline;
} */
/* .contain {
  width: 100%;
} */

/* scroll */
.row {
  overflow: hidden;
  width: 100%;
  height: 180px;
  /* border: 0px solid #aaa; */
}
.row__inner {
  transition: 450ms -webkit-transform;
  transition: 450ms transform;
  transition: 450ms transform, 450ms -webkit-transform;
  font-size: 0;
  white-space: nowrap;
  /* margin: 8.3125px 0; */
  padding-bottom: 10px;
  margin-right: -50px; /* maximum width of scrollbar */
  padding-right: 50px; /* maximum width of scrollbar */
  overflow-y: scroll;
  height: 40vh;
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
  transition: 550ms all;
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
  /* font-size: 10px; */
  opacity: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.tile:hover .tile__details {
  opacity: 9;
  border: 2px solid #3c3c3c;
}
.tile__title {
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: white;
  font-weight: 500;
  align-self: flex-start;
  font-size: 1.5vw;
  margin-bottom: 1.8vw;
}
.align-item {
  align-self: flex-start;
}
.row__inner:hover {
  /* -webkit-transform: translate3d(-62.5px, 0, 0);
  transform: translate3d(-62.5px, 0, 0); */
  -webkit-transform: translate3d(2.5px, 0, 0);
  transform: translate3d(2.5px, 0, 0);
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

.subscribe {
  /* border: 0.1em solid #fff; */
  /* font-weight: 200; */
  font-size: 0.9vw;
  margin-left: 7px;
  /* padding: 0 3px 0 3px; */
}
</style>