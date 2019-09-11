function initialState() {
    return {
        show_profile: true,
        show_connection: true,
        show_channel: true,
        show_settings: true
    }
}

const state = initialState()

const mutations = {
    SHOW_PROFILE(state, show) {
        state.show_profile = show
    },
    SHOW_CONNECTION(state, show) {
        state.show_connection = show
    },
    SHOW_CHANNEL(state, show) {
        state.show_channel = show
    },
    SHOW_SETTINGS(state, show) {
        state.show_settings = show
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    SET_FAVORITE(context, data){
        
    }
}

export default {
    state,
    mutations,
    actions
}