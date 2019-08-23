import CreateAccount from '../../api/registrationAPI'

function initialState() {
    return {
        user_info: []
    }
}

const state = initialState()

const mutations = {
    SET_REGISTRATION(state, data){
        state.user_info = data
    }
}

const actions = {
    CREATE_ACCOUNT(context, new_account) {
        return new Promise((resolve, reject)=>{
            new CreateAccount(context.rootState.user_session.token).newAccount(new_account, (err, data)=>{
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