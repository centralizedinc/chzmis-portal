import NewAccountAPI from '../../api/registrationAPI'
import NotificationsAPI from '../../api/NotificationsAPI'
function initialState() {
    return {
        user_info: []
    }
}

const state = initialState()

const mutations = {
    SET_REGISTRATION(state, data){
        console.log('data of store :', data);
        state.user_info = data
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    CREATE_ACCOUNT(context, details) {
        return new Promise((resolve, reject) => {
            console.log("store create account new_account_data: " + JSON.stringify(details))
            new NewAccountAPI().newAccount(details)
                .then((result) => {
                    console.log("store create account result: " + JSON.stringify(result))
                    // context.commit('SET_REGISTRATION', result)
                    var mode = {
                        email: result.data.model.account.email
                    }
                    return new NotificationsAPI().email_registration(mode)
                }).then((emailed) =>{
                    console.log("emailed @ store: ")
                    resolve(emailed)
                }).catch((err) => {
                    console.log('A err :', err);
                    reject(err)
                });
        })
        // --------------------
        // return new NewAccountAPI().newAccount(new_account)
        // ---------------------
    //     return new Promise((resolve, reject) => {
    //         new NewAccountAPI(context.rootState.new_account.token).getCreateAccount()
    //             .then((result) => {
    //                 console.table(result.data.model);
    //                 context.commit("SET_CREATE_ACCOUNT", result.data.model);
    //                 resolve(result.data.model)
    //             }).catch((err) => {
    //                 reject(err)
    //             });
    //     })
    }
}

export default {
    state,
    mutations,
    actions
}