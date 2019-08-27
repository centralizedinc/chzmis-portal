  <template></template>

<script>
export default {
  created() {
    var data = new Buffer(this.$route.query.data, "base64").toString();
    console.log('data :', data);
    this.$store.commit("FACEBOOK_SIGNUP", JSON.parse(data));
    window.opener.location.href = process.env.VUE_APP_HOME_URL + 'newAccount'
    window.opener.location.reload()
    window.close();
  }
};
</script>

<style>
</style>
