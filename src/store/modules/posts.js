import PostAPI from '../../api/PostAPI'
import UploadAPI from '../../api/UploadAPI';

function initialState() {
    return {
        connection_posts: [],
        channel_posts: [],
        public_post: []
    }
}

const state = initialState()

const mutations = {
    SETUP(state, token) {
        new PostAPI(token);
    },
    SET_PUBLIC_POSTS(state, data) {
        state.public_post = data
    },
    SET_CONNECTION_POSTS(state, data) {
        console.log('SET_CONNECTION_POSTS :', data);
        state.connection_posts = data
    },
    SET_CHANNEL_POSTS(state, data) {
        state.channel_posts = data
    },
    SHOW_COMMENTS(state, data) {
        console.log('data :', data);
        
        if (data.is_public) {
            const index = state.public_post.findIndex(x => x._id === data.post_id);
            console.log('public index :', index);
            state.public_post[index].show_comment = data.load_comment;
        } else {
            const index = state.connection_posts.findIndex(x => x._id === data.post_id);
            console.log('private index :', index);
            state.connection_posts[index].show_comment = data.load_comment;
        }
        console.log('state.public_post :', state.public_post);
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    POST_MESSAGE(context, data) {
        console.log('new post message :', data);
        return new Promise((resolve, reject) => {
            var msg_data = {}
            if(!data.upload_data.account_id) data.upload_data.account_id = context.rootState.accounts.account.account_id;
            new UploadAPI(context.rootState.accounts.token)
                .uploadPost(data.upload_data)
                .then((result) => {
                    console.log('result :', result);
                    if(result) data.post.uploads = result.data.model;
                    return new PostAPI(context.rootState.accounts.token)
                        .postMessage(data.post)
                })
                .then((result) => {
                    console.log('result2 :', result);
                    msg_data = result.data.model;
                    if (data.post.is_public) return context.dispatch("GET_PUBLIC_POSTS", { refresh: true });
                    else return context.dispatch("GET_CONNECTION_POSTS", { refresh: true });
                })
                .then((result) => {
                    console.log('POSTING MSG result :', result);
                    resolve(msg_data)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },
    GET_PUBLIC_POSTS(context, data) {
        return new Promise((resolve, reject) => {
            if ((data && data.refresh) || !context.state.public_post.length) {
                new PostAPI(context.rootState.accounts.token).getPublicPost()
                    .then((result) => {
                        var post_ids = [], posts = [];
                        if (result.data.model) {
                            posts = result.data.model.map(post => {
                                post.show_comment = 0;
                                return post;
                            });
                            post_ids = result.data.model.map(v => v._id);
                        }
                        // posts.data.model.forEach(post => {
                        //     post.show_comment = 0;
                        //     _posts.push(post);
                        //     post_ids.push(post._id);
                        // })
                        context.commit('SET_PUBLIC_POSTS', posts);
                        console.log('post_ids :', post_ids);
                        return context.dispatch("GET_COMMENTS_BY_POSTS", { post_ids }, { root: true })
                    })
                    .then((result) => {
                        resolve(context.state.public_post)
                    })
                    .catch((err) => {
                        console.log('GET_PUBLIC_POSTS err :', err);
                        reject(err)
                    });
            } else resolve(context.state.public_post)
        })
    },
    GET_CONNECTION_POSTS(context, data) {
        return new Promise((resolve, reject) => {
            if ((data && data.refresh) || !context.state.connection_posts.length) {
                new PostAPI(context.rootState.accounts.token).getPost(context.rootState.connections.active_connection)
                    .then((posts) => {
                        var post_ids = [], _posts = []
                        posts.data.model.forEach(post => {
                            post.show_comment = 0;
                            _posts.push(post);
                            post_ids.push(post._id);
                        })
                        console.log('_posts :', _posts);
                        context.commit('SET_CONNECTION_POSTS', _posts);
                        return context.dispatch("GET_COMMENTS_BY_POSTS", { post_ids }, { root: true })
                    })
                    .then((result) => {
                        resolve(context.state.connection_posts)
                    }).catch((err) => {
                        console.log('GET_CONNECTION_POSTS err :', err);
                        reject(err)
                    });
            } else resolve(context.state.connection_posts)
        })
    },
    GET_CHANNEL_POSTS(context, data) {
        return new Promise((resolve, reject) => {
            if ((data && data.refresh) || !context.state.channel_posts.length) {
                PostAPI.getPost(data.channel_id)
                    .then((posts) => {
                        context.commit('SET_CHANNEL_POSTS', posts.data.model);
                        resolve(posts.data.model)
                    }).catch((err) => {
                        console.log('GET_CHANNEL_POSTS err :', err);
                        reject(err)
                    });
            } else resolve(context.state.channel_posts)
        })
    },
    LIKE_POST(context, data) {

    },
    DISLIKE_POST(context, data) {

    }
}

export default {
    state,
    mutations,
    actions
}