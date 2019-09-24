import axios from 'axios'

export default class AccountAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} account 
     */
    static login(account) {
        console.table([account]);
        return axios.post('login', account);
    }

    /**
     * 
     * @param {Number} type 
     * @param {String} parent_id 
     */
    addToFavorites(type, parent_id) {
        console.log("Account API addToFavorites");
        console.table([{ type, parent_id }]);
        return axios.post('accounts/favorites/add', { type, parent_id })
    }

    /**
     * 
     * @param {String} parent_id 
     */
    removeFromFavorites(parent_id) {
        console.log("Account API removeFromFavorites");
        console.table([{ parent_id }]);
        return axios.post('accounts/favorites/remove', { parent_id })
    }
}