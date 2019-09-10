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

    sendComment(comment){
        return axios.post('comments', comment);
    }
}