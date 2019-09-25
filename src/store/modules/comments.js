import CommentsAPI from '../../api/CommentsAPI'
import UploadAPI from '../../api/UploadAPI';

function initialState() {
    return {
        comments: [],
        comments_by_post: []
    }
}

const state = initialState()

const mutations = {
    SETUP(state, token) {
        new CommentsAPI(token);
    },
    SET_COMMENTS(state, data) {
        state.comments = data;
    },
    SET_COMMENTS_BY_POST(state, data) {
        state.comments_by_post.push(data);
    },
    ADD_COMMENT_MESSAGE(state, data) {
        const { key, details } = data ? data : {};
        if (key && details) {
            const comment_index = state.comments_by_post.findIndex(v => v.key === key);
            if (comment_index !== -1) {
                state.comments_by_post[comment_index].comments = [...state.comments_by_post[comment_index].comments, details];
                // sort
                state.comments_by_post[comment_index].comments.sort(
                    (a, b) => new Date(b.date_created) - new Date(a.date_created)
                );
            } else {
                state.comments_by_post.push({
                    show: true,
                    key,
                    comments: [details],
                    last_date: details.date_created
                })
            }
        }
    },
    ADD_COMMENTS_BY_POST(state, data) {
        const comment_index = state.comments_by_post.findIndex(v => v.key === data.key);
        if (data.comments.length) {
            state.comments_by_post[comment_index].busy = data.comments.length < 5;
            state.comments_by_post[comment_index].comments = [...state.comments_by_post[comment_index].comments, ...data.comments];
            const last_index = state.comments_by_post[comment_index].comments.length - 1;
            state.comments_by_post[comment_index].last_date = state.comments_by_post[comment_index].comments[last_index].date_created;
        } else state.comments_by_post[comment_index].busy = true;
    },
    REMOVE_COMMENTS_BY_POST(state, key) {
        const index = state.comments_by_post.findIndex(v => v.key === key);
        if (index !== -1) state.comments_by_post.splice(index, 1);
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    GET_COMMENTS_BY_POST(context, data) {
        return new Promise((resolve, reject) => {
            const { post_id, load_more } = data;
            const comments_by_post = context.state.comments_by_post.find(v => v.key === post_id);
            const last_date = comments_by_post ? comments_by_post.last_date || new Date() : new Date();
            if (post_id && (load_more || !context.state.comments_by_post || !context.state.comments_by_post.length || !comments_by_post)) {
                new CommentsAPI(context.rootState.accounts.token)
                    .getCommentsByPostId(post_id, 5, last_date)
                    .then((result) => {
                        if (result && result.data && result.data.model) {
                            if (!comments_by_post) {
                                const last_date = result.data.model.length ?
                                    result.data.model[result.data.model.length - 1].date_created : new Date();
                                context.commit('SET_COMMENTS_BY_POST', {
                                    key: post_id,
                                    busy: result.data.model.length < 5,
                                    comments: result.data.model,
                                    last_date,
                                    show: true
                                })
                            } else {
                                context.commit('ADD_COMMENTS_BY_POST', {
                                    key: post_id,
                                    comments: result.data.model
                                })
                            }
                            resolve(context.state.comments_by_post)
                        } else resolve(context.state.comments_by_post)
                    }).catch((err) => {
                        console.log('GET_COMMENTS_BY_POST err :', err);
                        reject(err)
                    });
            } else resolve(context.state.comments_by_post)
        })
    },
    GET_COMMENTS_BY_POSTS(context, data) {
        return new Promise((resolve, reject) => {
            if (data.post_ids && data.post_ids.length) {
                new CommentsAPI(context.rootState.accounts.token).getCommentsByPostIds(data.post_ids)
                    .then((comments) => {
                        context.commit('SET_COMMENTS', comments.data.model);
                        resolve(comments.data.model)
                    }).catch((err) => {
                        console.log('GET_COMMENTS err :', err);
                        reject(err)
                    });
            } else resolve([])
        })
    },
    SEND_COMMENT(context, data) {
        return new Promise((resolve, reject) => {
            // Initialize comment and upload_data
            var comment = data.comment,
                upload_data = {
                    form_data: data.form_data
                };

            // Check if the uploaded file in connection is public or not
            if (context.rootState.connections.active_connection &&
                context.rootState.connections.active_connection !== -1) {
                upload_data.connection_id = context.rootState.connections.active_connection
            } else {
                upload_data.is_public = true;
                upload_data.connection_id = context.rootState.accounts.account.account_id
            }

            // Upload files by connection id or if public by account id
            new UploadAPI(context.rootState.accounts.token)
                .uploadConnection(upload_data)
                .then((result) => {
                    if (result) comment.uploads = result.data.model;

                    // Save comment
                    return new CommentsAPI(context.rootState.accounts.token)
                        .sendComment(comment)
                })
                .then((result) => {
                    // var comments = JSON.parse(JSON.stringify(context.state.comments));
                    // comments.push(result.data.model);
                    // context.commit('SET_COMMENTS', comments);
                    context.commit('ADD_COMMENT_MESSAGE', { key: comment.post_id, details: result.data.model })
                    resolve(result.data.model);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    },
    LIKE_COMMENT(context, data) {

    },
    DISLIKE_COMMENT(contecommentsxt, data) {

    }
}

export default {
    state,
    mutations,
    actions
}