import NewAccountAPI from '../../api/registrationAPI'
import { Col } from 'ant-design-vue';

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
    }
}

const actions = {
    CREATE_ACCOUNT(context, new_account) {
        return new Promise((resolve, reject)=>{
            new NewAccountAPI(context).newAccount(new_account, (err, data)=>{
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