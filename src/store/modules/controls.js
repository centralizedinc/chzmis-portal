import AccountAPI from "../../api/AccountAPI";

function initialState() {
    return {
        show_profile: true,
        show_connection: true,
        show_channel: true,
        show_settings: true,
        recents: []
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
    ADD_RECENTS(state, data) {
        state.recents.push(data);
    },
    REMOVE_RECENTS(state, data) {
        const index = state.recents.findIndex(x => x.parent_id = data.parent_id);
        state.recents.splice(index, 1);
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    ADD_TO_FAVORITES(context, data) {
        const { type, parent_id } = data;
        new AccountAPI(context.rootState.accounts.token)
            .addToFavorites(type, parent_id)
            .then((result) => {
                console.log('result :', result);
                context.commit("ADD_TO_FAVORITES", { type, parent_id })
            }).catch((err) => {
                console.log('ADD_TO_FAVORITES err:', err);
            });
    },
    REMOVE_FROM_FAVORITES(context, data) {
        const { parent_id } = data;
        new AccountAPI(context.rootState.accounts.token)
            .removeFromFavorites(parent_id)
            .then((result) => {
                context.commit("REMOVE_FROM_FAVORITES", { parent_id })
            }).catch((err) => {
                console.log('REMOVE_FROM_FAVORITES err:', err);
            });
    }
}

export default {
    state,
    mutations,
    actions
}