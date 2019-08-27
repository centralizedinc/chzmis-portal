import axios from 'axios'

export default class CommentsAPI {

    /**
     * @returns {Promise}
     */
    static getCommentsByPostIds(posts) {
        console.log('post ids :',posts);
        return axios.post(`${process.env.VUE_APP_API_BASE_URL}/comments/posts`, posts)
    }

}