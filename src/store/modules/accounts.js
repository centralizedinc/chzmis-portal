import AccountAPI from "../../api/AccountAPI";


function initialState() {
    return {
        account: {},
        user: {},
        token: "",
        is_authenticated: false
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, data) {
        state.account = data.account;
        state.user = data.user;
        state.token = data.token;
        state.is_authenticated = true;
    },
    ADD_TO_FAVORITES(state, data) {
        state.account.favorites.push(data);
    },
    REMOVE_FROM_FAVORITES(state, data) {
        const index = state.account.favorites.findIndex(x => x.parent_id === data.parent_id);
        state.account.favorites.splice(index, 1);
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    },
    UPDATE_USER(state, data){
        state.profile = data.profile
        state.user = data.user
        state.account = data.account
    }
}

const actions = {
    LOGIN(context, account) {
        new AccountAPI(null);
        return new Promise((resolve, reject) => {
            AccountAPI.login(account)
                .then((result) => {
                    console.log('LOGIN :', result.data.model);
                    if (result.data.model.is_authenticated) {
                        context.commit("LOGIN", result.data.model);
                        context.commit("SETUP", result.data.model.token);
                        context.dispatch("GET_USERS_DETAILS", {}, { root: true })
                        resolve(result.data.model);
                    } else reject(result.data.model);
                }).catch((err) => {
                    console.log('A err :', err);
                    reject(err)
                });
        })
    },
    LOGOUT(context) {
        console.log("Logging out...");
        context.commit("RESET");
    }
    // UPDATE_ACCOUNT(context, updated_account) {
    //     return new Promise((resolve, reject) => {
    //         new UsersAPI(context.rootState.accounts.token).UpdateProfile(updated_account, (err, data) => {
    //             if (err) {
    //                 reject(err)
    //             } else {
    //                 resolve(data)
    //             }
    //         })
    //     })

    // }
}

export default {
    state,
    mutations,
    actions
}