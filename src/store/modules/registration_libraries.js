function initialState() {
    return {
        registration_details: []
    }
}

const state = initialState()

const mutations = {
    SET_REGISTRATION(state, data){
        state.registration_details = data
    }
}

const actions = {
    ADD_ACCOUNT(context, new_account) {
        return new Promise((resolve, reject)=>{
            new AccountType(context.rootState.user_session.token).addNewAccount(new_account, (err, data)=>{
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_REGISTRATION', data)
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