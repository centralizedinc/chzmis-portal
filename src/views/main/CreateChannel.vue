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
        <a-divider orientation="left">Movies</a-divider>
        <!-- images -->
        <div class="container">
          <div class="arrow-left">
            <i class="icon-angle-left"></i>
          </div>
          <div class="item item-1">
            <div class="body-item">
              <div class="body-item-1"></div>
              <div class="title body-item-2">Breaking Bad</div>
              <div class="properties body-item-3">
                <span class="match">% 98 Match</span>
                <span class="year">2012</span>
                <span class="age-limit">13+</span>
                <span class="time">2h 13m</span>
              </div>
              <p
                class="description body-item-4"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias libero..</p>
            </div>
          </div>

          <div class="item item-2">
            <div class="body-item">
              <div class="body-item-1">
                <!-- <div class="play">
                  <i class="icon-play"></i>
                </div>-->
              </div>
              <div class="title body-item-2">Case de Papel</div>
              <div class="properties body-item-3">
                <span class="match">% 98 Match</span>
                <span class="year">2012</span>
                <span class="age-limit">13+</span>
                <span class="time">2h 13m</span>
              </div>
              <p
                class="description body-item-4"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias libero..</p>
              <!-- <div class="body-item-5">
                <i class="details-icon icon-chevron-down"></i>
              </div>-->
            </div>
          </div>

          <div class="item item-3">
            <div class="body-item">
              <div class="body-item-1">
                <!-- <div class="play">
                  <i class="icon-play"></i>
                </div>-->
              </div>
              <div class="title body-item-2">Black Mirror</div>
              <div class="properties body-item-3">
                <span class="match">% 98 Match</span>
                <span class="year">2012</span>
                <span class="age-limit">13+</span>
                <span class="time">2h 13m</span>
              </div>
              <p
                class="description body-item-4"
              >3rd Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius alias libero..</p>
            </div>
          </div>

          <div class="item item-4">
            <div class="body-item">
              <div class="body-item-1">
                <div class="play">
                  <i class="icon-play"></i>
                </div>
              </div>
              <div class="title body-item-2">Bojark Horseman</div>
              <div class="properties body-item-3">
                <span class="match">% 95 Match</span>
                <span class="year">2013</span>
                <span class="age-limit">18+</span>
                <span class="time">1h 13m</span>
              </div>
              <p
                class="description body-item-4"
              >A humanoid horse, BoJack Horseman -- lost in a sea of self-loathing and...</p>
              <div class="body-item-5">
                <i class="details-icon icon-chevron-down"></i>
              </div>
              <!-- <div class="icon-set body-item-6">
                <i class="icon-thumbs-up"></i>
                <i class="icon-thumbs-down"></i>
                <i class="icon-plus"></i>
              </div>-->
            </div>
          </div>
          <!-- <div class="arrow-right">
            <i class="icon-angle-right"></i>
          </div>-->
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
</style>