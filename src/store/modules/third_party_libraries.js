function initialState() {
    return {
        signup_method: 'local', // google, facebook
        google_details: {},
        facebook_details: {},
        window_location:{},
        user: {},
        token: "",
        is_authenticated: false
    }
}

const state = initialState()

const mutations = {
    SET_PARENT_WINDOW(state, data){
        state.window_location = data
    },
    GOOGLE_SIGNUP(state, data){
        state.google_details = data;
        state.user = data.user;
        state.token = data.token;
        state.signup_method = 'google'
        state.is_authenticated = true;
    },
    FACEBOOK_SIGNUP(state, data){
        state.facebook_details = data;
        state.user = data.user;
        state.token = data.token;
        state.signup_method = 'facebook'
        state.is_authenticated = true;
    },
    LOCAL_SIGNUP(state, data){
        state.signup_method = 'local'
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
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