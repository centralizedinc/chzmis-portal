<template></template>

<script>
export default {
  created() {
    var data = new Buffer(this.$route.query.data, "base64").toString();
    this.$store.commit("GOOGLE_SIGNUP", JSON.parse(data));
    window.opener.location.href = process.env.VUE_APP_HOME_URL + 'main'
    // window.opener.location.href = process.env.VUE_APP_HOME_URL
    window.opener.location.reload()
    window.close();
  }
};
</script>

<style>
</style>
