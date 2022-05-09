import { csrfFetch } from "./csrf";

//action
const ADD_COMMENT = "comments/addComment";
const LOAD_COMMENT = "comments/loadComment"
const DELETE_COMMENT = "comments/deleteComment"
const EDIT_COMMENT = "comments/editComment"


const addCommentType = (comment) => {
    return {
      type: ADD_COMMENT,
      comment,
    };
  };

const loadCommentType = (comments)=> {
    return {
        type:LOAD_COMMENT,
        payload:comments
    }
}

const deleteCommentType = (comment) => {
    return {
        type:DELETE_COMMENT,
        comment
    }
}

const editCommentType = (comment,newContent) => {
    return {
        type:EDIT_COMMENT,
        comment:comment,
        newContent
    }
}

//action creator

export const loadComments = (id) => async(dispatch) => {
    const response = await fetch(`/api/comments/songs/${id}`)
    const data = await response.json();
    await dispatch(loadCommentType(data.comments))
    return response;
}


export const createComment = (content,songId,username) => async (dispatch) => {

  const response = await csrfFetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({content,songId }),
  });

  if (!response.ok) throw response;

  const { comment } = await response.json();
  comment.User = {};
  comment.User.username = username;
  dispatch(addCommentType(comment));
  return comment;
};

export const deleteComment= (id) => async(dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`,{
    method:'DELETE'
  })
  if(response.ok){
    let body = await response.json();
    await dispatch(deleteCommentType(body.comment));
    return body
  }

}

export const editComment= (comment,newContent) => async (dispatch) => {
  const response  = await csrfFetch(`/api/comments/${comment.id}`,{
    method:"PUT",
    body:JSON.stringify({comment,newContent})
  })
  let body = await response.json();
  await dispatch(editCommentType(comment,newContent));
  return body;
}



//need to make it so the object uses the id of the song as the index for the comments so i can better distribute them
let initialState = {}
const commentsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_COMMENT:
        newState = Object.assign({},state);
        newState[action.payload[0]?.songId] = [...action.payload]
        return newState;
    case ADD_COMMENT:
        newState = Object.assign({},state);
        if(Object.keys(newState).includes(action.comment.songId.toString())){
          newState[action.comment.songId].unshift(action.comment);
        }
        else{
          newState[action.comment.songId] = [action.comment];
        }
        return newState;
    case DELETE_COMMENT:
        newState = Object.assign({},state);

        if(Object.keys(newState).includes(action.comment.songId.toString())){
          let temp = newState[action.comment.songId]
          let index = -1;
          for(let x= 0; x < temp.length; x++){
            if(temp[x].id === action.comment.id){
              index = x;
            }
          }
          newState[action.comment.songId].splice(index,1)
          return newState;
        }
      case EDIT_COMMENT:
        newState = Object.assign({},state);
        if(Object.keys(newState).includes(action.comment.songId.toString())){
          let tempEdit = newState[action.comment.songId];
          let indexer = -1;
          for(let y = 0 ; y < tempEdit.length;y++){
            if(tempEdit[y].id === action.comment.id){
              indexer = y
              break;
          }

        }
        tempEdit[indexer].body = action.newContent;
          newState[action.comment.songId] = tempEdit;
          return newState;
      }
    default:
      return state;
  }
};

export default commentsReducer;
