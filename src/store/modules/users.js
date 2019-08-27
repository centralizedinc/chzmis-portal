import Users from '../../views/temp_db/users.json';

function initialState() {
    return {
        users: Users
    }
}

const state = initialState()

const mutations = {
}

const actions = {
    GET_USER_BY_ACCOUNT_ID(context, data){
        var user = Users.find(x => x.id === data.account_id);
        return user;
    },
    GET_USERS_BY_ACCOUNT_IDS(context, data){
        var users = Users.filter(x => data.account_ids.includes(x.id));
        return users;
    }
}

export default {
    state,
    mutations,
    actions
}