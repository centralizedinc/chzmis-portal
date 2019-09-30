<template>
  <a-row>
    <a-col :span="4">
      <div class="main-layout modules-layout">
        <span>Modules</span>
        <a-divider style="margin: 0"></a-divider>
        <a-row type="flex" align="middle" justify="center" style="padding: 8px 0;">
          <a-col :span="6" class="align-items-middle">
            <a-tooltip placement="top">
              <template slot="title">
                <span>My Profile</span>
              </template>
              <a-icon type="solution" class="cursor-pointer task-icon"></a-icon>
            </a-tooltip>
          </a-col>
          <a-col :span="6" class="align-items-middle">
            <a-tooltip placement="top">
              <template slot="title">
                <span>Connections</span>
              </template>
              <a-icon type="layout" class="cursor-pointer task-icon"></a-icon>
            </a-tooltip>
          </a-col>
          <a-col :span="6" class="align-items-middle">
            <a-tooltip placement="top">
              <template slot="title">
                <span>My Channels</span>
              </template>
              <a-icon type="desktop" class="cursor-pointer task-icon"></a-icon>
            </a-tooltip>
          </a-col>
          <a-col :span="6" class="align-items-middle">
            <a-dropdown placement="topRight">
              <a-tooltip placement="bottomRight">
                <template slot="title">
                  <span>Favorites</span>
                </template>
                <a-icon type="book" class="cursor-pointer task-icon" />
              </a-tooltip>
              <a-menu slot="overlay">
                <a-menu-item
                  v-for="(favorite, i) in favorites"
                  :key="i"
                  @click="openFavorites(favorite._id)"
                >
                  <a-avatar
                    :src="favorite && favorite.avatar ? favorite.avatar.location: null"
                    size="small"
                  >{{favorite && favorite.name ? favorite.name[0].toUpperCase(): '?'}}</a-avatar>
                  <span style="margin-left: 5px;">{{favorite ? favorite.name : '?'}}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-col>
        </a-row>
      </div>
    </a-col>
    <a-col :span="14">
      <a-card :bodyStyle="{ padding: '1vh' }">
        <a-tabs
          class="connection-tabs"
          v-model="active_key"
          :defaultActiveKey="-1"
          tabPosition="top"
        >
          <a-tab-pane :key="-1" tab="Chzmis" />

          <a-tab-pane v-for="item in connections" :key="item._id">
            <div slot="tab">
              <a-badge :dot="true">
                <a-avatar
                  style="border: 1px solid #aaa;"
                  shape="square"
                  :src="item.avatar ? item.avatar.location: null"
                >{{item.name[0].toUpperCase()}}</a-avatar>
              </a-badge>
            </div>
          </a-tab-pane>

          <div slot="tabBarExtraContent" class="connection-extra-tabs">
            <a-tooltip>
              <span slot="title">New Connection</span>
              <a-icon type="plus" @click="newConnection" style="cursor: pointer" />
            </a-tooltip>
          </div>
        </a-tabs>
      </a-card>
    </a-col>
    <a-col :span="6">
      <div class="main-layout recents-layout" v-if="recents.length">
        <span>Recents</span>
        <a-divider style="margin: 0"></a-divider>
        <div v-for="(item, index) in recents" :key="index" style="float: left">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{item ? item.name : '?'}}</span>
            </template>
            <a-avatar
              @click="openConnection(item._id)"
              :src="item && item.avatar ? item.avatar.location: null"
              class="cursor-pointer"
              size="small"
            >{{item && item.name ? item.name[0].toUpperCase() : '?'}}</a-avatar>
          </a-tooltip>
        </div>
        <!-- <a-row type="flex" align="middle" justify="center" style="padding: 5px 0;">
        <a-col
          :span="recents_span"
          v-for="(item, index) in recents"
          :key="index"
          class="align-items-middle"
        >
          
        </a-col>
        </a-row>-->
      </div>
    </a-col>
  </a-row>
</template>

<script>
import channelsIcon from "../../assets/Channels.png";
import groupIcon from "../../assets/Group.png";
import messageIcon from "../../assets/Message.png";
import profileIcon from "../../assets/MyProfile.png";

export default {
  data() {
    return {
      channelsIcon,
      groupIcon,
      messageIcon,
      profileIcon,
      active_key: -1
    };
  },
  computed: {
    favorites() {
      const connections = this.deepCopy(
        this.$store.state.connections.connections
      );
      const favorites = this.getLoginAccount().favorites.map(v =>
        connections.find(x => x._id === v.parent_id)
      );
      return favorites;
    },
    recents() {
      const connections = this.deepCopy(
        this.$store.state.connections.connections
      );
      const recents = this.$store.state.controls.recents.map(v =>
        connections.find(x => x._id === v.parent_id)
      );
      return recents;
    },
    recents_span() {
      var span = 3;
      if (this.recents.length > 5) {
      }
      return span;
    },
    active_connection() {
      return this.$store.state.connections.active_connection;
    },
    connections() {
      // Remove closed connections
      const connections = this.deepCopy(
        this.$store.state.connections.connections
      ).filter(v => v.display);
      // prior favorite connections
      connections.sort((a, b) => {
        const x = this.checkFavorites(a._id),
          y = this.checkFavorites(b._id);
        return x === y ? 0 : x ? -1 : 1;
      });

      return connections;
    }
  },
  watch: {
    active_connection(key) {
      this.active_key = key;
    },
    active_key(key) {
      this.$store.commit("SET_ACTIVE_CONNECTION", key);
    }
  },
  methods: {
    openConnection(parent_id) {
      this.$store.commit("OPEN_CONNECTION", { parent_id, show: true });
      this.$store.commit("SET_ACTIVE_CONNECTION", parent_id);
      this.$store.commit("REMOVE_RECENTS", { parent_id });
    },
    openFavorites(parent_id) {
      this.$store.commit("SET_ACTIVE_CONNECTION", parent_id);
    },
    newConnection() {
      this.$store.dispatch("OPEN_NEW_CONNECTION");
    }
  }
};
</script>

<style>
.modules-layout {
  min-width: 30vh;
  max-width: 30vh;
  float: left;
  margin-right: 5vh;
}

.recents-layout {
  min-width: 15vh;
  max-width: 50vh;
  float: left;
}

.cursor-pointer {
  cursor: pointer;
}

.main-layout {
  position: relative !important;
  max-height: 55px !important;
  height: 55px;
  color: white;
  font-weight: bold;
  background: rgba(2, 59, 117, 0.6);
  text-align: center;
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
.cursor-pointer:hover {
  -webkit-animation: bounce 0.5s linear 0s infinite;
  animation: bounce 0.5s linear 0s infinite;
}

/* .background-layout {
  background: #023b75;
  opacity: 0.6;
  width: 100%;
  height: 100%;
} */

.cursor-icon {
  font-size: 24px;
  color: white;
}

.task-icon {
  font-size: 18px;
  color: white;
}

.connection-extra-tabs i {
  font-size: 3vh;
  margin-right: 1.5vh;
}

.connection-tabs .ant-tabs-bar .ant-tabs-tab {
  margin: 0;
  padding: 1vh 1.2vh;
}

.connection-tabs .ant-tabs-bar {
  margin: 0;
}
</style>