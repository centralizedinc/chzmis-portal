import Channels from '../../views/temp_db/channels.json';

function initialState() {
    return {
        channels: []
    }
}

const state = initialState()

const mutations = {
    SET_CHANNELS(state, data) {
        state.channels = data;
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