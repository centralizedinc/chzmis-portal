import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000";
// axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI

export default class NewAccountAPI {
  constructor(token) {
    // axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
    axios.defaults.baseURL = "http://localhost:4000";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common['access_token'] = token;
  }

  newAccount(new_account, cb) {
    console.log("api############# new account" + JSON.stringify(new_account))
    axios.post('/signup', new_account).then((result) => {
            console.log("api############# ADD New Account")
            cb(result.data.errors, result.data.model)
        })
        .catch(err => {
            cb(err)
        })
      }
}