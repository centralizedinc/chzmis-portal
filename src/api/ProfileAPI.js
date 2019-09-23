import axios from 'axios'

export default class ProfileType {

    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    //Profile
  getProfilebyId(profile_id, cb) {
    console.log("##########GETPROFILEID" + profile_id);
    axios
      .get("user/details" + profile_id)
      .then(result => {
        console.log("###API### GET PROFILE" + JSON.stringify(result.data));
        if (result.data.success) {
          cb(result.data.model);
        } else {
          cb(err);
        }
      })
      .catch(err => {
        cb(err);
      });
  }

  UpdateProfile(profile) {
    return new Promise((resolve, reject) => {
      if(profile.avatar){
          axios.post("documents/avatars?account_id=" + profile.account._id, profile.avatar)
            .then(result1 => {
              if (result1.data.success) {
                profile.account.avatar = result1.data.model;
                return axios.post("user/details" + profile.account._id,profile.account);
              } else {
                resolve(result1.data);
              }
            })
            .then(result2 => {
              console.log("############# SAVING RESPONSE: " + JSON.stringify(result2.data))
              resolve(result2.data);
            })
            .catch(err => {
              reject(err);
            });
          }else{
            axios.post("user/details" + profile.account._id,profile.account)
              .then(result2 => {
                console.log("############# SAVING RESPONSE: " + JSON.stringify(result2.data))
                resolve(result2.data);
              })
              .catch(err => {
                reject(err);
              });
          }
    });
  }
}