import axios from 'axios'

export default class ConnectionAPI {
    
    /**
     * @returns {Promise}
     * @param {String} account_id 
     */
    static getConnectionsByAccountID(account_id) {
        return axios.get(`${process.env.VUE_APP_API_BASE_URL}/connections/${account_id}`)
    }
}