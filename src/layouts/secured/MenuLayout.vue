<template>
  <a-menu
      @click="redirect"
      :defaultSelectedKeys="['1']"
      mode="inline"
      class="secured-sider-layout menu-layout">
      <template v-for="(item, index) in items">
        <a-sub-menu
          v-if="item.submenus"
          @click="item.action"
          :title="!item.icon ? item.title : undefined"
          :key="item.key || `s${index}`"
          class="secured-sider-layout"
        >
          <span v-if="item.icon" slot="title">
            <a-icon :type="item.icon" />
            {{item.title}}
          </span>
          <template v-for="(sub_item, sub_index) in item.submenus">
            <a-menu-item-group
              v-if="sub_item.groups"
              :title="!sub_item.icon ? sub_item.title : undefined"
              :key="sub_item.key || `g${sub_index}`"
            >
              <span v-if="sub_item.icon" slot="title">
                <a-icon :type="sub_item.icon" />
                {{sub_item.title}}
              </span>
              <template v-for="group_item in sub_item.groups">
                <a-menu-item :key="group_item.key" class="secured-sider-layout">
                  <a-icon v-if="group_item.icon" :type="group_item.icon" />
                  {{group_item.title}}
                </a-menu-item>
              </template>
            </a-menu-item-group>
            <a-menu-item v-else :key="sub_item.key" class="secured-sider-layout">
              <a-icon v-if="sub_item.icon" :type="sub_item.icon" />
              {{sub_item.title}}
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key" class="secured-sider-layout">
          <a-icon v-if="item.icon" :type="item.icon" />
          {{item.title}}
        </a-menu-item>
      </template>
    </a-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: 1,
      //   Required: title, key
      items: [
        {
          title: "Menu 1",
          key: "1",
          icon: "desktop"
        },
        {
          title: "Menu 2",
          key: "2",
          icon: "desktop",
          submenus: [
            {
              title: "Menu 3",
              key: "3"
            },
            {
              title: "Menu 4",
              key: "4",
              icon: "desktop"
            }
          ]
        },
        {
          title: "Menu 5",
          key: "5",
          icon: "desktop",
          submenus: [
            {
              title: "Menu 6",
              key: "6",
              icon: "desktop"
            },
            {
              title: "Menu 7",
              key: "7",
              icon: "desktop",
              groups: [
                {
                  title: "Menu 8",
                  key: "8"
                },
                {
                  title: "Menu 9",
                  key: "9",
                  icon: "desktop"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    redirect(e) {
      console.log('Redirect to :', e.key);
    }
  }
};
</script>

<style>
.menu-layout {
  text-align: left !important;
  width: 100% !important;
}
</style>
