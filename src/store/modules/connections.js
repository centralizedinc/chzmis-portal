import ConnectionsAPI from '../../api/ConnectionsAPI'

function initialState() {
    return {
        connections: [],
        active_connection: "",
        show_new_connection: false,
        show_create_connection: false,
        fetching_data: false,
        search_connections: [],
        update_connection_id: ""
    }
}

const state = initialState()

const mutations = {
    SET_ACTIVE_CONNECTION(state, data) {
        state.active_connection = data;
    },
    SET_CONNECTIONS(state, data) {
        state.connections = data;
    },
    SHOW_NEW_CONNECTION(state, data) {
        state.show_new_connection = data;
    },
    SHOW_CREATE_CONNECTION(state, data) {
        state.show_create_connection = data;
    },
    FETCHING_DATA(state, data) {
        state.fetching_data = data;
    },
    SET_SEARCH_CONNECTION(state, data) {
        state.search_connections = data
    },
    CONNECT(state, data) {
        const i = state.search_connections.findIndex(x => x._id.toString() === data.connection);
        state.search_connections[i].connected = true;
    },
    SET_UPDATE_CONNECTION(state, data) {
        state.update_connection_id = data
    }
}

const actions = {
    GET_CONNECTIONS(context, data) {
        return new Promise((resolve, reject) => {
            if ((data && data.refresh) || !context.state.connections.length) {
                context.commit('SET_CONNECTIONS', []);
                ConnectionsAPI.getConnectionsByAccountID(context.rootState.accounts.account.account_id)
                    .then((connections) => {
                        context.commit('SET_CONNECTIONS', connections.data.model);
                        resolve(connections.data.model)
                    }).catch((err) => {
                        console.log('GET_CONNECTIONS err :', err);
                        reject(err)
                    });
            } else resolve(context.state.connections)
        })
    },
    OPEN_NEW_CONNECTION(context) {
        context.commit('SHOW_NEW_CONNECTION', true)
        context.commit('FETCHING_DATA', true)
        ConnectionsAPI.getConnectionsNameAndId()
            .then((result) => {
                console.log('result.data.model :', result.data.model);
                context.commit('SET_SEARCH_CONNECTION', result.data.model)
                context.commit('FETCHING_DATA', false)
            }).catch((err) => {
                context.commit('FETCHING_DATA', false)
            });
    },
    OPEN_CREATE_CONNECTION(context, data) {
        return new Promise((resolve, reject) => {
            context.commit("FETCHING_DATA", true)
            if (data) context.commit('SET_UPDATE_CONNECTION', data.connection_id);
            context.dispatch("GET_USERS_DETAILS", {}, { root: true })
                .then((users) => {
                    context.commit('SHOW_CREATE_CONNECTION', true);
                    context.commit("FETCHING_DATA", false)
                    resolve(users)
                }).catch((err) => {
                    context.commit("FETCHING_DATA", false)
                    reject(err)
                });
        })
    },
    CONNECT_TO_CONNECTION(context, data) {
        return ConnectionsAPI.connect(data.connection)
    },
    CREATE_CONNECTION(context, data) {
        return ConnectionsAPI.create(data)
    }
}

export default {
    state,
    mutations,
    actions
}