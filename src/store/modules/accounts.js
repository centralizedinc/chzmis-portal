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
        const index = state.account.favorites.findIndex(x => x.parent_id.toString() === data.parent_id.toString());
        state.account.favorites.splice(index, 1);
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    },
    UPDATE_USER(state, data) {
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
    },
    CHANGE_PASSWORD(context, data){
        console.log("check data:0 id: " + JSON.stringify(data))
        return new Promise((resolve, reject)=>{
            console.log("check data:1 id: " + JSON.stringify(data))
            new AccountAPI(context.rootState.accounts.token).changePassword(data).then((result)=>{
                console.log("check email: " + JSON.stringify(result))
                resolve(result)
            }).catch((err)=>{
                reject(err)
            })
        })
    },
    FORGET_PASSWORD(context, email){
        console.log("entering forget password store: email: " + email)
        return new Promise((resolve, reject)=>{
            new AccountAPI(context.rootState.accounts.token).forgetPasswordEmail(email)
            .then((result) =>{
                console.log("forget password store result: " + JSON.stringify(result))
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    CONFIRMED_ACCOUNT(context, account_id){
return new Promise((resolve, reject)=>{
    new AccountAPI().confirmedAccount(account_id).then((result) =>{
        console.log("confirmed account store : " + JSON.stringify(result))
        resolve(result)
    }).catch((err) =>{
        reject(err)
    })
})
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