import Users from '../../views/temp_db/users.json';
import UsersAPI from '../../api/UsersAPI'

function initialState() {
    return {
        users: Users
    }
}

const state = initialState()

const mutations = {
    SET_USERS_DETAILS(state, data) {
        state.users = data;
    }
}

const actions = {
    GET_USER_BY_ACCOUNT_ID(context, data) {
        var user = Users.find(x => x.id === data.account_id);
        return user;
    },
    GET_USERS_BY_ACCOUNT_IDS(context, data) {
        var users = Users.filter(x => data.account_ids.includes(x.id));
        return users;
    },
    GET_USERS_DETAILS(context, data) {
        return new Promise((resolve, reject) => {
            new UsersAPI().getUsersDetails()
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