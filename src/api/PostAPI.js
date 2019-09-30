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
     * @param {Date} last_date
     * @param {Boolean} refresh
     * @param {Number} type
     */
    getPost(parent_id, option) {
        var queries = ''
        if (option) queries = '?' + Object.keys(option).reduce((q, v, index) => {
            if(index === 1){
                return `${q}=${option[q]}&` + `${v}=${option[v]}&`
            }
            else return q + `${v}=${option[v]}&`
        });
        console.log('queries :', queries);
        if (parent_id === -1) return axios.get(`post/public${queries}`);
        else return axios.get(`post/parent/${parent_id}${queries}`)
    }

    /**
     * @returns {Promise}
     * @param {Post} data 
     */
    postMessage(data) {
        return axios.post('post', data);
    }
}