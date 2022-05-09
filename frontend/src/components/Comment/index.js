import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react'
import { deleteComment } from '../../store/comment';
import EditCommentForm from '../EditCommentForm';
import './Comment.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
function Comment ({comment,userComments,setTest,test}){
    const sessionUser = useSelector(state => state.session.user);
    const [editCommentButtonText,setEditCommentButtonText] = useState("Edit")
    const [showEditCommentForm,setShowEditCommentForm] = useState(false);
    let content = null;
    if(showEditCommentForm && comment.userId === sessionUser.id){
        content = <EditCommentForm comment={comment} userComments={userComments} test={test} setTest={setTest} hideForm={() => setShowEditCommentForm(false)}></EditCommentForm>
    }

    useEffect(()=> {
      showEditCommentForm ? setEditCommentButtonText("Cancel") : setEditCommentButtonText("Edit")
    },[showEditCommentForm])

    const toggleEditCommentForm = async(e)=> {
        setShowEditCommentForm(!showEditCommentForm);
      }

    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment.id));
        if(userComments){
          let index = userComments.findIndex((currComment) => currComment.id === comment.id);
          let removed = userComments.splice(index,1)
          setTest(!test)
        }
      }
    return (
    <div className='commentContainer'>
      <div className='commentDetails'>
        <div className='commentBody'>{comment.body}</div>
        <div>Poster:<Link to={`/users/${comment.userId}`}>{comment.User.username}</Link></div>
        </div>
        {sessionUser
        && sessionUser.id === comment.userId
        &&<div className='editCommentFormDiv'>
        <button className='editCommentButton edit' onClick={toggleEditCommentForm}>{editCommentButtonText}</button>
        {content}
        </div>
        }
        {sessionUser
        && sessionUser.id === comment.userId
        && <button className='deleteCommentButton delete' onClick={handleDelete}>Delete Comment</button>
        }
    </div>)
}

export default Comment;
