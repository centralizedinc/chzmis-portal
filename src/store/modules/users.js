import UsersAPI from '../../api/UsersAPI'

function initialState() {
    return {
        users: [],
        profile: [],
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
    },
    SET_PROFILE(state, data) {
        console.log("###PROFILE:SET###" + JSON.stringify(data))
        state.profile = data

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
    },

    GET_PROFILE(context, profile_id) {
        return new Promise((resolve, reject) => {
            console.log("##STORE #########" + JSON.stringify(profile_id))
            new ProfileType(context.rootState.user_session.token).getProfilebyId(profile_id, (data, err) => {
                console.log("#####DATA" + data)
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PROFILE', data)
                    resolve(data)
                }
            })
        })
    },

    UPDATE_PROFILE(context, updated_account) {
        return new Promise((resolve, reject) => {
            new UsersAPI(context.rootState.accounts.token).UpdateProfile(updated_account, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    }
}

export default {
    state,
    mutations,
    actions
}