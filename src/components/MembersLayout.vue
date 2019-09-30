<template>
  <a-row type="flex" justify="end">
    <a-col :span="24" style="text-align:right">Members</a-col>
    <a-col :span="4" v-for="(member, i) in members" :key="i" class="member-icon">
      <a-tooltip>
        <span slot="title">{{getUsers(member.account_id, "fullname")}}</span>
        <a-avatar @click="showProfile(member.account_id)" :src="getUsers(member.account_id).avatar">{{getUsers(member.account_id, "initial")}}</a-avatar>
      </a-tooltip>
    </a-col>
  </a-row>
</template>

<script>
export default {
  computed: {
    active_key() {
      return this.deepCopy(this.$store.state.connections.active_connection);
    },
    members() {
        return this.getConnectionById(this.active_key).members;
      // return [
      //   {
      //     account_id: 0,
      //     avatar:
      //       "https://instagram.fmnl4-5.fna.fbcdn.net/vp/0d1ac425c999287e77ba754d5e279870/5E35E9FE/t51.2885-15/sh0.08/e35/p640x640/70063434_103008441056046_420874789796603499_n.jpg?_nc_ht=instagram.fmnl4-5.fna.fbcdn.net&_nc_cat=106 640w,https://instagram.fmnl4-5.fna.fbcdn.net/vp/54276ce93f88ba29d6689cbdbac88db4/5E22DF01/t51.2885-15/sh0.08/e35/p750x750/70063434_103008441056046_420874789796603499_n.jpg?_nc_ht=instagram.fmnl4-5.fna.fbcdn.net&_nc_cat=106 750w,https://instagram.fmnl4-5.fna.fbcdn.net/vp/82facb94ae5293d21f742c6514550126/5E16E138/t51.2885-15/e35/70063434_103008441056046_420874789796603499_n.jpg?_nc_ht=instagram.fmnl4-5.fna.fbcdn.net&_nc_cat=106 1080w"
      //   },
      //   {
      //     account_id: 0,
      //     avatar:
      //       "https://instagram.fmnl4-1.fna.fbcdn.net/vp/7c77b341539cf645076dd4a8448e27d5/5E2E3073/t51.2885-15/sh0.08/e35/p640x640/70600063_506849906545372_2138291694207237861_n.jpg?_nc_ht=instagram.fmnl4-1.fna.fbcdn.net&_nc_cat=104 640w,https://instagram.fmnl4-1.fna.fbcdn.net/vp/a559d7d6021e0d6a62cf0ea4b56c28a9/5E3B8473/t51.2885-15/sh0.08/e35/p750x750/70600063_506849906545372_2138291694207237861_n.jpg?_nc_ht=instagram.fmnl4-1.fna.fbcdn.net&_nc_cat=104 750w,https://instagram.fmnl4-1.fna.fbcdn.net/vp/54bd9c622ff158529c05ff97d6f45f9b/5E1CF485/t51.2885-15/e35/70600063_506849906545372_2138291694207237861_n.jpg?_nc_ht=instagram.fmnl4-1.fna.fbcdn.net&_nc_cat=104 1080w"
      //   },
      //   {
      //     account_id: 0,
      //     avatar:
      //       "https://instagram.fmnl4-6.fna.fbcdn.net/vp/e43a89446a132042fd891033941320d3/5E3A86EA/t51.2885-15/sh0.08/e35/p640x640/69648615_971759483170987_337167060908638502_n.jpg?_nc_ht=instagram.fmnl4-6.fna.fbcdn.net&_nc_cat=107 640w,https://instagram.fmnl4-6.fna.fbcdn.net/vp/e230fbb4a982ba646897d5bf93ac6357/5E277215/t51.2885-15/sh0.08/e35/p750x750/69648615_971759483170987_337167060908638502_n.jpg?_nc_ht=instagram.fmnl4-6.fna.fbcdn.net&_nc_cat=107 750w,https://instagram.fmnl4-6.fna.fbcdn.net/vp/868c6ae688d87458d49bba24dc88046b/5E3D2D2C/t51.2885-15/e35/69648615_971759483170987_337167060908638502_n.jpg?_nc_ht=instagram.fmnl4-6.fna.fbcdn.net&_nc_cat=107 1080w"
      //   },
      //   {
      //     account_id: 0,
      //     avatar:
      //       "https://instagram.fmnl4-4.fna.fbcdn.net/vp/fca466d2526865590fe054821145feaa/5E2F4EC4/t51.2885-15/sh0.08/e35/s640x640/70348606_136547794290170_4535846586459276060_n.jpg?_nc_ht=instagram.fmnl4-4.fna.fbcdn.net&_nc_cat=102 640w,https://instagram.fmnl4-4.fna.fbcdn.net/vp/4f1484ed49d092a8e79c04f10c0f90b8/5E3B13C4/t51.2885-15/sh0.08/e35/s750x750/70348606_136547794290170_4535846586459276060_n.jpg?_nc_ht=instagram.fmnl4-4.fna.fbcdn.net&_nc_cat=102 750w,https://instagram.fmnl4-4.fna.fbcdn.net/vp/fbd3444e01dead83ebbb2dae677c5778/5E33A521/t51.2885-15/e35/70348606_136547794290170_4535846586459276060_n.jpg?_nc_ht=instagram.fmnl4-4.fna.fbcdn.net&_nc_cat=102 1080w"
      //   },
      //   {
      //     account_id: 0,
      //     avatar:
      //       "https://instagram.fmnl4-3.fna.fbcdn.net/vp/040b30b16dada71502ba4a0d8f3f4bb3/5E3159BF/t51.2885-15/sh0.08/e35/s640x640/69654775_949564778725330_4357864577979786323_n.jpg?_nc_ht=instagram.fmnl4-3.fna.fbcdn.net&_nc_cat=110 640w,https://instagram.fmnl4-3.fna.fbcdn.net/vp/d367002ff1590679d054f99a625cb5a5/5E300EBF/t51.2885-15/sh0.08/e35/s750x750/69654775_949564778725330_4357864577979786323_n.jpg?_nc_ht=instagram.fmnl4-3.fna.fbcdn.net&_nc_cat=110 750w,https://instagram.fmnl4-3.fna.fbcdn.net/vp/846de85bcf65d419d4a33204761885a8/5E18955A/t51.2885-15/e35/69654775_949564778725330_4357864577979786323_n.jpg?_nc_ht=instagram.fmnl4-3.fna.fbcdn.net&_nc_cat=110 1080w"
      //   }
      // ];
    }
  }
};
</script>

<style>
.member-icon {
  cursor: pointer;
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: translateY(0);
  }

  50% {
    -webkit-transform: translateY(-5px);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}

.member-icon:hover {
  z-index: 10;
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: bounce;
  animation-name: bounce;
}
</style>