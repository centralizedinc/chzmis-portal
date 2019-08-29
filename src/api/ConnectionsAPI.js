import axios from 'axios'

export default class ConnectionAPI {


    /**
     * @returns {Promise}
     * @param {String} connection 
     */
    static create(connection) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URL}/connections`, connection)
    }

    /**
     * @returns {Promise}
     * @param {String} id
     * @param {String} connection 
     */
    static update(id, connection) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URL}/connections/${id}`, connection)
    }

    /**
     * @returns {Promise}
     * @param {String} account_id 
     */
    static getConnectionsByAccountID(account_id) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/connections/member/${account_id}`)
    }

    /**
     * @returns {Promise}
     */
    static getConnectionsNameAndId() {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/connections/search`)
    }

    /**
     * @returns {Promise}
     * @param {String} connection 
     */
    static connect(connection) {
        return axios.post(`${process.env.VUE_APP_API_BASE_URL}/connections/connect`, { connection })
    }
}