import axios from "axios";

export default class NewAccountAPI {

  constructor(token) {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.headers.common['access_token'] = token;
  }

<<<<<<< HEAD
  getnewAccount(new_account) {
    console.log("api############# new account" + JSON.stringify(new_account));
=======
  newAccount(new_account) {
>>>>>>> ae2c18ec76a1f569efe07cf70aef20a4099b4fb4
    return axios.post('signup', new_account);
  }
}