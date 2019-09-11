import UsersAPI from '../../api/UsersAPI'

function initialState() {
    return {
        users: [],
        active_user: ""
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
    },
    ACTIVE_PROFILE(state, account_id) {
        console.log("ACTIVE_PROFILE", account_id);
        state.active_user = account_id;
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