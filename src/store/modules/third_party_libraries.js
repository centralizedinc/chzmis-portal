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
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}