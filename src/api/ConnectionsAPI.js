import axios from 'axios'

export default class ConnectionAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} connection 
     */
    create(connection) {
        return axios.post('connections', connection)
    }

    /**
     * @returns {Promise}
     * @param {String} id
     * @param {String} connection 
     */
    update(id, connection) {
        return axios.post(`connections/${id}`, connection)
    }

    /**
     * @returns {Promise}
     * @param {String} account_id 
     */
    getConnectionsByAccountID(account_id) {
        return axios.get(`connections/member/${account_id}`)
    }

    /**
     * @returns {Promise}
     */
    getConnectionsNameAndId() {
        return axios.get('connections/search')
    }

    /**
     * @returns {Promise}
     * @param {String} connection 
     */
    connect(connection) {
        return axios.post('connections/connect', { connection })
    }
}