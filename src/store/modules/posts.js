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
        state.connection_posts.push(data)
    },
    ADD_CONNECTION_POST(state, data) {
        const connection_index = state.connection_posts.findIndex(v => v.key === data.key);
        console.log('data.post.length :', data.post.length);
        if (data.post.length) {
            state.connection_posts[connection_index].busy = data.post.length < 10;
            state.connection_posts[connection_index].post = [...state.connection_posts[connection_index].post, ...data.post];
            const last_index = state.connection_posts[connection_index].post.length - 1;
            state.connection_posts[connection_index].last_date = state.connection_posts[connection_index].post[last_index].date_created;
        } else state.connection_posts[connection_index].busy = true;
    },
    REMOVE_CONNECTION_POST(state, key) {
        const index = state.connection_posts.findIndex(v => v.key === key);
        state.connection_posts.splice(index, 1);
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
        const { refresh, load_more } = data ? data : {};
        return new Promise((resolve, reject) => {
            // Active Connection
            const key = context.rootState.connections.active_connection;
            // If refresh, remove all the post to load again
            if (refresh) context.commit('REMOVE_CONNECTION_POST', key);
            // Find the connection to check if it is empty, busy or not;
            var connection = context.state.connection_posts &&
                context.state.connection_posts.length ?
                context.state.connection_posts.find(v => v.key === key) : null;
            // Proceed and load data if connection is null || requesting for load_more && connection is not busy
            if (!connection || (load_more && !connection.busy)) {
                // Get the last_date of connection as the starting data to fetch
                var last_date = connection ? connection.last_date || new Date() : new Date();
                // Load data
                new PostAPI(context.rootState.accounts.token)
                    .getPost(key, 10, last_date)
                    .then((posts) => {
                        console.log('posts.data.model :', posts.data.model);
                        if (connection)
                            context.commit('ADD_CONNECTION_POST', {
                                key,
                                post: posts.data.model
                            });
                        else if (posts.data.model && posts.data.model.length) {
                            const busy = posts.data.model.length < 10;
                            const last_date = posts.data.model[posts.data.model.length - 1].date_created;
                            context.commit('SET_CONNECTION_POSTS', {
                                key,
                                post: posts.data.model,
                                last_date,
                                busy
                            });
                        }
                        resolve(!posts.data.model || posts.data.model.length < 10);
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