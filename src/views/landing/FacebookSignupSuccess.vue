  <template></template>

<script>
export default {
  created() {
    var data = new Buffer(this.$route.query.data, "base64").toString();
    console.log('data :', data);
    this.$store.commit("LOGIN", JSON.parse(data));
    // this.$store
    //         .commit("LOGIN", data)
    //         .then(result => {
    //           console.log("Success Login");
    //           if (this.$store.state.accounts.is_authenticated) {
    //             // Notification message

    //             this.$router.push("/main");
    //           } else {
    //             // notification error
    //           }
    //           this.loading = false;
    //         })
    //         .catch(err => {
    //           console.log("LOGIN err :", err);
    //           this.loading = false;
    //         });
    window.opener.location.href = process.env.VUE_APP_HOME_URL + 'main'
    // window.opener.location.href = process.env.VUE_APP_HOME_URL
    window.opener.location.reload()
    window.close();
  },

  // login() {
  //     this.loading = true;
  //     this.form.validateFieldsAndScroll((err, auth) => {
  //       if (!err) {
  //         console.log("Received values of form: ", auth);
  //         this.$store
  //           .dispatch("LOGIN", auth)
  //           .then(result => {
  //             console.log("Success Login");
  //             if (this.$store.state.accounts.is_authenticated) {
  //               // Notification message

  //               this.$router.push("/main");
  //             } else {
  //               // notification error
  //             }
  //             this.loading = false;
  //           })
  //           .catch(err => {
  //             console.log("LOGIN err :", err);
  //             this.loading = false;
  //           });
  //       }
  //     });
  //   }

};
</script>

<style>
</style>
