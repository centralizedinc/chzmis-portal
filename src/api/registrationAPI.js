// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000";

export default class NewAccountAPI {
  constructor(token) {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common['access_token'] = token;
  }

  static newAccount(new_account, cb) {
    console.log("creating new account...")
    axios.post('/signup', new_account)
      .then(result => {
        console.log("RESULT: " + JSON.stringify(result))
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(null, result.data.errors);
        }
      })
      .catch(err => {
        console.log("err... " + err);
        cb(null, err);
      })
  }

//   getUser(cb) {
//     axios.get('secured/accounts/users/info').then((result) => {
//       console.log("get user: " + JSON.stringify(result.data.model))
//       cb(result.data.errors, result.data.model)
//     }).catch(err => {
//       cb(err)
//     })
//   }
}