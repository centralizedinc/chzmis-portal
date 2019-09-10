import axios from 'axios'

export default class PostAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    getPublicPost() {
        return axios.get('post/public');
    }

    /**
     * @returns {Promise}
     * @param {String} parent_id
     */
    getPost(parent_id) {
        return axios.get(`post/parent/${parent_id}`);
    }

    /**
     * @returns {Promise}
     * @param {Post} data 
     */
    postMessage(data) {
        return axios.post('post', data);
    }
}