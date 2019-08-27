import ConnectionsAPI from '../../api/ConnectionsAPI'

function initialState() {
    return {
        connections: [],
        active_connection: ""
    }
}

const state = initialState()

const mutations = {
    SET_ACTIVE_CONNECTION(state, data) {
        state.active_connection = data;
    },
    SET_CONNECTIONS(state, data) {
        state.connections = data;
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
    }
}

export default {
    state,
    mutations,
    actions
}