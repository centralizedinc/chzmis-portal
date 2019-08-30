import axios from 'axios'

export default class UsersAPI {

    /**
     * @returns {Promise}
     */
    getUsersDetails() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/users/details`)
    }
}