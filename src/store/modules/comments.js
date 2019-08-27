import CommentsAPI from '../../api/CommentsAPI'

function initialState() {
    return {
        comments: []
    }
}

const state = initialState()

const mutations = {
    SET_COMMENTS(state, data) {
        state.comments = data;
    }
}

const actions = {
    GET_COMMENTS_BY_POSTS(context, data) {
        console.log('data.comments :', data.post_ids);
        return new Promise((resolve, reject) => {
            if (data.post_ids && data.post_ids.length) {
                CommentsAPI.getCommentsByPostIds(data.post_ids)
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