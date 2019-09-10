import UsersAPI from '../../api/UsersAPI'

function initialState() {
    return {
        users: []
    }
}

const state = initialState()

const mutations = {
    SETUP(state, token){
        new UsersAPI(token);
    },
    SET_USERS_DETAILS(state, data) {
        state.users = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    GET_USERS_DETAILS(context, data) {
        return new Promise((resolve, reject) => {
            new UsersAPI(context.rootState.accounts.token).getUsersDetails()
                .then((result) => {
                    console.table(result.data.model);
                    context.commit("SET_USERS_DETAILS", result.data.model);
                    resolve(result.data.model)
                }).catch((err) => {
                    reject(err)
                });
        })
    }
}

export default {
    state,
    mutations,
    actions
}