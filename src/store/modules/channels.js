import Channels from '../../views/temp_db/channels.json';

function initialState() {
    return {
        channels: []
    }
}

const state = initialState()

const mutations = {
    SETUP(state, token){

    },
    SET_CHANNELS(state, data) {
        state.channels = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    GET_CHANNELS(context, data) {
        if (data.refresh || !context.state.channels.length) {
            var channels = Channels.filter(x => x.created_by === data.account_id);
            context.commit('SET_CHANNELS', channels);
            return channels
        } return context.state.channels
    }
}

export default {
    state,
    mutations,
    actions
}