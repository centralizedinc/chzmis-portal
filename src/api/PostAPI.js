import axios from 'axios'

export default class PostAPI {

    /**
     * @returns {Promise}
     */
    static getPublicPost() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/public`)
    }

    /**
     * @returns {Promise}
     * @param {String} parent_id
     */
    static getPost(parent_id) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/post/parent/${parent_id}`)
    }
}