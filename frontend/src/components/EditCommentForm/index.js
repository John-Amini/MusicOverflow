import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editComment } from '../../store/comment';

const EditCommentForm = ({ comment, hideForm }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [newContent,setNewContent] = useState(comment.body);
    const updateNewContent = (e) => setNewContent(e.target.value);
    useEffect(()=>{
        let sumbitBut = document.getElementById(`updateComment${comment.id}`)
        if(newContent === comment.body || newContent === ''){
            sumbitBut.disabled = true;
        } else{
            sumbitBut.disabled = false;
        }
    },[newContent])
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(payload)
    // console.log(payload.newTitle)
    await dispatch(editComment(comment,newContent))
    hideForm();
  };

//   const handleCancelClick = (e) => {
//     e.preventDefault();
//     hideForm();
//   };

  return (
    <section >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Update Comment"
          value={newContent}
          onChange={updateNewContent} />
        <button id={`updateComment${comment.id}`}type="submit">Update Comment</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default EditCommentForm;
