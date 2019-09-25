import axios from 'axios';

export default class NotificationsAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        // axios.defaults.headers.common['access_token'] = token;
      }

      email_registration(data){
          console.log("eamil registration api: " + JSON.stringify(data))
          return axios.post('notification/registration', data)
      }
}