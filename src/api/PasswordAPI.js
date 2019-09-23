import axios from 'axios';

export default class PasswordAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    requestResetPassword(old_password) {
        return axios.post('accounts/password/request', {
            old_password
        })
    }

    confirmResetPassword() {
        return axios.get('accounts/password')
    }

    resetPassword(account) {
        return axios.post('accounts/password', account)
    }
}