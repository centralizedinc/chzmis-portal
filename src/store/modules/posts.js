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
        state.connection_posts = data
    },
    SET_CHANNEL_POSTS(state, data) {
        state.channel_posts = data
    },
    SHOW_COMMENTS(state, data) {
        if (data.is_public) {
            const index = state.public_post.findIndex(x => x._id === data.post_id);
            state.public_post[index].show_comment = data.load_comment;
        } else {
            const index = state.connection_posts.findIndex(x => x._id === data.post_id);
            state.connection_posts[index].show_comment = data.load_comment;
        }
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    POST_MESSAGE(context, data) {
        return new Promise((resolve, reject) => {
            // Initialize msg_data
            var msg_data = {}

            // check if the uploaded files is public or not
            if (!data.upload_data.connection_id) { 
                data.upload_data.connection_id = context.rootState.accounts.account.account_id; 
                data.upload_data.is_public = true;
            }

            // Upload files
            new UploadAPI(context.rootState.accounts.token)
                .uploadConnection(data.upload_data)
                .then((result) => {
                    if (result) data.post.uploads = result.data.model;

                    // Save Post Message
                    return new PostAPI(context.rootState.accounts.token)
                        .postMessage(data.post)
                })
                .then((result) => {
                    msg_data = result.data.model;

                    // Get the latest posts
                    if (data.post.is_public) return context.dispatch("GET_PUBLIC_POSTS", { refresh: true });
                    else return context.dispatch("GET_CONNECTION_POSTS", { refresh: true });
                })
                .then((result) => {
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
                        context.commit('SET_PUBLIC_POSTS', posts);
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