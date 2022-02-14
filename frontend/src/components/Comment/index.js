import { useDispatch, useSelector } from 'react-redux';
import {useState,useEffect} from 'react'
import { deleteComment } from '../../store/comment';
import EditCommentForm from '../EditCommentForm';
import './Comment.css'
function Comment ({comment}){
    const sessionUser = useSelector(state => state.session.user);
    const [editCommentButtonText,setEditCommentButtonText] = useState("Edit")
    const [showEditCommentForm,setShowEditCommentForm] = useState(false);
    let content = null;
    if(showEditCommentForm && comment.userId === sessionUser.id){
        content = <EditCommentForm comment={comment} hideForm={() => setShowEditCommentForm(false)}></EditCommentForm>
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
      }
    return (
    <div className='commentContainer'>
      <div className='commentDetails'>
        <div className='commentBody'>{comment.body}</div>
        <div>Poster:{comment.User.username}</div>
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
