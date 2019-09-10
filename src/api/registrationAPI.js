import axios from "axios";

export default class NewAccountAPI {

  constructor(token) {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.headers.common['access_token'] = token;
  }

  newAccount(new_account) {
    console.log("api############# new account" + JSON.stringify(new_account));
    return axios.post('signup', new_account);
  }
}