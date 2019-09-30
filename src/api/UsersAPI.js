import axios from 'axios'

export default class UsersAPI {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    getUsersDetails() {
        return axios.get('users/details');
    }

<<<<<<< HEAD
    UpdateProfile(profile) {
        return new Promise((resolve, reject) => {
            console.log("api update profile: " + JSON.stringify(profile))
            // if(profile){
                  axios.post("users/update/" + profile._id, profile)
                    .then(result => {
                      console.log("############# SAVING RESPONSE: " + JSON.stringify(result.data))
                      resolve(result.data);
                    })
                    .catch(err => {
                      reject(err);
                    });
                // }
          });
        // return axios.get('users/' + profile.account_id);
=======
    UpdateProfile(id, account_id) {
        return axios.get(`users/${id}` , account_id);
>>>>>>> 8bf53f8226e61f742bbabe7cd444cc1918b4d7b8
    }

    getProfilebyId(profile_id, cb) {
        return axios.get('users/accountid');
      }
}