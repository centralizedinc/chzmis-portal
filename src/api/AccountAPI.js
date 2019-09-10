import axios from 'axios'

export default class AccountAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        // axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} account 
     */
    static login(account) {
        console.table([account]);
        return axios.post('login', account);
    }

}