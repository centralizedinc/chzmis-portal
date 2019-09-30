import axios from 'axios'

export default class UsersAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    getUsersDetails() {
        return axios.get('users/details');
    }

    UpdateProfile(id, account_id) {
        return axios.get(`users/${id}` , account_id);
    }

    getProfilebyId(profile_id, cb) {
        return axios.get('users/accountid');
      }
}