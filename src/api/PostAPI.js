import axios from 'axios'

export default class PostAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Number} limit 
     * @param {Date} date_created 
     */
    getPublicPost(limit, date_created) {
        return axios.get(`post/public?limit=${limit}&date=${date_created}`);
    }

    /**
     * @returns {Promise}
     * @param {String} parent_id 
     * @param {Number} limit 
     * @param {Date} date_created 
     */
    getPost(parent_id, limit, date_created) {
        if (parent_id === -1) return axios.get(`post/public?limit=${limit}&date=${date_created}`);
        else return axios.get(`post/parent/${parent_id}?limit=${limit}&date=${date_created}`);
    }

    /**
     * @returns {Promise}
     * @param {Post} data 
     */
    postMessage(data) {
        return axios.post('post', data);
    }
}