import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react'
import { deleteComment } from '../../store/comment';
import EditCommentForm from '../EditCommentForm';
function Comment ({comment}){
    const sessionUser = useSelector(state => state.session.user);
    const [editCommentButtonText,setEditCommentButtonText] = useState("Edit Comment")
    const [showEditCommentForm,setShowEditCommentForm] = useState(false);
    let content = null;
    if(showEditCommentForm && comment.userId === sessionUser.id){
        content = <EditCommentForm comment={comment} hideForm={() => setShowEditCommentForm(false)}></EditCommentForm>
    }
    const toggleEditCommentForm = async(e)=> {
        setShowEditCommentForm(!showEditCommentForm);
      }

    const dispatch = useDispatch();
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment.id));
      }
    return (<div>
        {comment.body}
        {comment.User.username}
        {sessionUser
        && sessionUser.id === comment.userId
        &&<div>
        <button onClick={toggleEditCommentForm}>{editCommentButtonText}</button>
        {content}
        </div>
        }
        {sessionUser
        && sessionUser.id === comment.userId
        && <button onClick={handleDelete}>Delete Comment</button>
        }
    </div>)
}

export default Comment;
