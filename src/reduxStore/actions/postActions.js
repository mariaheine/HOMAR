export const createPost = (post) => {
    return (dispatch, getState) => {
        // Pause dispatch, make async call to the database
        

        // Then continue and dispatch an action
        dispatch({
            type: 'CREATE_POST',
            post: post
        });
    }
}