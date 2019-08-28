import Posts from '../../views/temp_db/posts.json';

import PostAPI from '../../api/PostAPI'

function initialState() {
    return {
        connection_posts: [],
        channel_posts: [],
        public_post: []
    }
}

const state = initialState()

const mutations = {
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
    }
}

const actions = {
    POST_MESSAGE(context, data) {
        console.log('new post message :', data);
    },
    GET_PUBLIC_POSTS(context, data) {
        return new Promise((resolve, reject) => {
            if ((data && data.refresh) || !context.state.public_post.length) {
                PostAPI.getPublicPost()
                    .then((posts) => {
                        context.commit('SET_PUBLIC_POSTS', posts.data.model);
                        var post_ids = []
                        if (posts.data.model)
                            post_ids = posts.data.model.map(v => v._id)
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
                PostAPI.getPost(context.rootState.connections.active_connection)
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