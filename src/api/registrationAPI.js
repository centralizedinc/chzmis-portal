import axios from "axios";

export default class registrationAPI {

  constructor(token) {
    axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    // axios.defaults.headers.common['access_token'] = token;
  }

  newAccount(new_account) {
    console.log("registration api new_account data: " + JSON.stringify(new_account))
    return axios.post('signup', new_account);
  }
}