import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import Song from "../Song";
import Comment from "../Comment";
import { useState,useEffect } from "react";
import { loadComments } from "../../store/comment";
function ListComments({song}) {
  const sessionUser = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comment);
  const [isLoading,setIsLoading] = useState(true);
  console.log("LIST COMMENTS")
  console.log(comments);
  console.log(song.id);
  console.log(comments[song.id])
  const dispatch = useDispatch();
    useEffect(async ()=> {
        await dispatch(loadComments(song.id))
        setIsLoading(false)
    },[])
  return (
    <>
      <ul>
        {
          Object.keys(comments).length !== 0 &&
          comments[song.id]?.map(comment => {
            return (
            <Comment key={comment.id} comment={comment}></Comment>
          )})
        }
        {!comments[song.id] && !isLoading && <div>No comments</div>}
      </ul>
    </>
  )
}

export default ListComments;
