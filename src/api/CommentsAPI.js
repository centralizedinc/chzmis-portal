import axios from 'axios'

export default class CommentsAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    getCommentsByPostIds(posts) {
        return axios.post('comments/posts', posts);
    }

    /**
     * @returns {Promise}
     * @param {String} post_id
     * @param {Number} limit
     * @param {Date} date
     */
    getCommentsByPostId(post_id, limit, date) {
        return axios.get(`comments/postid/${post_id}?limit=${limit}&date=${date}`);
    }

    sendComment(comment){
        return axios.post('comments', comment);
    }
}