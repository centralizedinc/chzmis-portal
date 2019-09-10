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
    }
}

export default {
    state,
    mutations,
    actions
}