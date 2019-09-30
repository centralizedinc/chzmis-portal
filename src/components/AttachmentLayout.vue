<template>
  <a-row id="attachment-layout" v-if="counts>0">
    <a-col
      :span="orientation === 1 || counts === 1 ? 24 : (orientation === 0 && counts === 2 ? 12 : 17)"
      :class="orientation === 1 && counts > 1 ? 'image-content small-image' : 'image-content full-image'"
      :style="`height: ${orientation === 1 && counts > 2 ? 70 : (orientation === 1 && counts === 2 ? 50 : 100)}%`"
      @click="$emit('view', 0)"
    >
      <img :src="images[0]" alt />
    </a-col>
    <a-col
      v-if="counts > 1 && orientation === 0"
      :span="counts === 2 ? 12 : 7"
      style="height: 100%;"
    >
      <a-row style="height: 100%;">
        <a-col
          :span="24"
          v-for="i in (counts >= 4 ? 3 : (counts - 1))"
          :key="i"
          :class="counts > 2 ? 'image-content small-image' : 'image-content full-image'"
          :style="`height: ${counts === 3 ? 50 : (counts >= 4 ? 33.3 : 100)}%`"
          @click="$emit('view', i)"
        >
          <img :src="images[i]" alt />
          <div v-if="i === 3 && counts > 4" class="more-content">{{`+${counts-3}`}}</div>
        </a-col>
      </a-row>
    </a-col>
    <a-col
      v-else-if="counts > 1 && orientation === 1"
      :span="24"
      :style="`height: ${counts > 2 && orientation === 1 ? 30 : 50}%;`"
    >
      <a-row style="height: 100%;">
        <a-col
          :span="counts === 3 ? 12 : (counts >= 4 ? 8 : 24)"
          v-for="i in (counts >= 4 ? 3 : (counts - 1))"
          :key="i"
          :class="counts > 1 ? 'image-content small-image' : 'image-content full-image'"
          @click="$emit('view', i)"
        >
          <img :src="images[i]" alt />
          <div v-if="i === 3 && counts > 4" class="more-content">{{`+${counts-3}`}}</div>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [
        // "https://chzmis.s3.us-west-2.amazonaws.com/connection/public/156734922454010/1569468720441",
        // "https://chzmis.s3.us-west-2.amazonaws.com/connection/public/156734922454010/1569468720470",
        // "https://chzmis.s3.us-west-2.amazonaws.com/connection/public/156734922454010/1569468720479",
        // "https://d2uqfpnktc64mn.cloudfront.net/uploads/post/image/000/001/879/Image%2Bby%2BMartin%2BHill%2Band%2BPhilippa%2BJones%2BAutumn%2BLeaf%2BCircle%2BMaterials%2BAutumn%2Bleaves%2Bflax%2Btree%2Bbranch%2Blake%2Bmountain%2BLake%2BWanaka%2BNew%2BZealand.jpg",
        // "https://www.lifewire.com/thmb/tJCIpF-chKxWvl0xjy-0ZuEI85E=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/random-numbers-over-blackboard-166043947-57bb63065f9b58cdfd31d1fe.jpg",
        // "https://i1.wp.com/bestlifeonline.com/content/uploads/2018/04/shutterstock_1066778096-1024x682.jpg?resize=1024%2C682&ssl=1"
      ]
    },
    orientation: {
      type: Number,
      default: 0
    }
  },
  computed: {
    counts() {
      return parseInt(this.images.length);
    }
  }
};
</script>

<style>
#attachment-layout {
  height: 100%;
}

#attachment-layout .image-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #222;
  overflow: hidden;
  height: 100%;
  border: 0.2vh solid #fff;
  cursor: pointer;
}

#attachment-layout .full-image img {
  height: 100%;
}

#attachment-layout .small-image img {
  width: 100%;
}

#attachment-layout .more-content {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  font-size: 30px;
  font-weight: bold;
}
</style>