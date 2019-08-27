function initialState() {
    return {
        signup_method: 'local', // google, facebook
        google_details: {},
        facebook_details: {},
        window_location:{}
    }
}

const state = initialState()

const mutations = {
    SET_PARENT_WINDOW(state, data){
        state.window_location = data
    },
    GOOGLE_SIGNUP(state, data){
        state.google_details = data
        state.signup_method = 'google'
    },
    FACEBOOK_SIGNUP(state, data){
        state.facebook_details = data
        state.signup_method = 'facebook'
    },
    LOCAL_SIGNUP(state, data){
        state.signup_method = 'local'
    }
}

const actions = {
    // GET_FACEBOOK_DETAILS(context) {
    //     return new Promise((resolve, reject) => {
    //         new ThirdPartyAPI(context).getFacebook((err, data) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 context.commit('FACEBOOK_SIGNUP', data)
    //                 resolve(data)
    //             }
    //         })
    //     })
    // },
}


export default {
    state,
    mutations,
    actions
}