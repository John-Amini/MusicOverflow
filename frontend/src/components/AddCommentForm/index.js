import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSong, loadSongs } from '../../store/song';
import {createComment} from '../../store/comment'
import './CommentForm.css'
const AddCommentForm = ({ song,hideForm,showComments }) => {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
    const [content,setContent] = useState("")
	const [validationErrors,setValidationErrors] = useState([]);


	const updateContent = (e) => setContent(e.target.value);

	useEffect(()=>{
		const submit = document.getElementById(`submit${song.id}`)
		if(content === "")
			submit.disabled = true;
		else{
			submit.disabled = false;
		}
	},[content])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
			const commentInput = document.getElementById(`commentInput${song.id}`)
			commentInput.disabled = true;
			hideForm();
			showComments(true);
			const createdComment = await dispatch(createComment(content,song.id,sessionUser.username))
	};

	return (
		<section className='addCommentContainer'>
			{validationErrors.length > 0 && (
				<div className='errorsContainer'>
					{validationErrors.map( (currError) => {
						return <p>{currError}</p>
					})}
				</div>
			)}
			<form onSubmit={handleSubmit}>
			<input className='addCommentInput' type='text' id={`commentInput${song.id}`} placeholder='Comment' value={content} onChange={updateContent}/>
			<input className='submitComment' id={`submit${song.id}`} type={"submit"}></input>
			</form>

		</section>
	);
};

export default AddCommentForm;
