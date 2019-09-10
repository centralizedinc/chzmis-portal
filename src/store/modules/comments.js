import CommentsAPI from '../../api/CommentsAPI'
import UploadAPI from '../../api/UploadAPI';

function initialState() {
    return {
        comments: []
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
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    GET_COMMENTS_BY_POSTS(context, data) {
        console.log('data.comments :', data.post_ids);
        return new Promise((resolve, reject) => {
            if (data.post_ids && data.post_ids.length) {
                new CommentsAPI(context.rootState.accounts.token).getCommentsByPostIds(data.post_ids)
                    .then((comments) => {
                        console.log('comments result :', comments);
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
            var comment = data.comment, upload_data = { account_id: context.rootState.accounts.account.account_id, form_data: data.form_data };

            new UploadAPI(context.rootState.accounts.token)
                .uploadComment(upload_data)
                .then((result) => {
                    if (result) comment.uploads = result.data.model;
                    return new CommentsAPI(context.rootState.accounts.token)
                        .sendComment(comment)
                })
                .then((result) => {
                    var comments = JSON.parse(JSON.stringify(context.state.comments));
                    comments.push(result.data.model);
                    context.commit('SET_COMMENTS', comments);
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