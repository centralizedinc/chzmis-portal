<template>
  <a-card class="activities-card">
    <a-card-grid class="activities-card-grid">grid1</a-card-grid>
    <a-card-grid class="activities-card-grid">
      <a-list size="small" :dataSource="friends">
        <a-list-item slot="renderItem" slot-scope="item, index">{{item}} ({{index}})</a-list-item>
        <div slot="header">Friends</div>
        <div slot="footer">
            <a-input placeholder="Search..."></a-input>
        </div>
      </a-list>
    </a-card-grid>
  </a-card>
</template>

<script>
export default {
    data() {
        return {
            friends: ["Mark", "Ariel", "Kris", "Godfrey"]
        }
    },
};
</script>

<style>
.activities-card {
  width: 100% !important;
  height: 100% !important;
  /* height: 475px !important; */
}

.activities-card-grid {
  height: 50% !important;
  width: 100% !important;
  padding: 0px !important;
}

.activities-card .ant-card-body {
  width: 100% !important;
  height: 100% !important;
}

.ant-list-item{
  padding: 12px 10px !important;
}

.ant-list-footer {
  padding: 0px !important;
}
</style>
