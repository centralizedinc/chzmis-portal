import NewAccountAPI from '../../api/registrationAPI'

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
    CREATE_ACCOUNT(context, new_account) {
        return new NewAccountAPI().newAccount(new_account)
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