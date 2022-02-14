import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSong, loadSongs } from '../../store/song';
import './AddSong.css'
const AddSongForm = ({ }) => {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [album, setAlbum] = useState('placeholder');
	const [title, setTitle] = useState('');
	const [songUrl, setSongUrl] = useState(null);
	const [imageUrl, setImageUrl] = useState("placeholder");
	const [validationErrors,setValidationErrors] = useState([]);


	const updateTitle = (e) => setTitle(e.target.value);
	const updateAlbum = (e) => setAlbum(e.target.value);
	const updateImageUrl = (e) => setImageUrl(e.target.files[0]);
	const updateSongUrl = (e) => setSongUrl(e.target.files[0])
	useEffect(()=>{
		const button = document.getElementById("submit")
		if(title === "" || songUrl === null){
			button.disabled = true;
			button.style.opacity = .4;
		}
		else{
			button.disabled = false;
			button.style.opacity = 1;
		}
	},[title,songUrl])
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
		if(songUrl){
			const formData = new FormData();
			formData.append("song",songUrl,title)
			formData.append("image",imageUrl);
			formData.append("album",album);
			formData.append('title',title)
			const button = document.getElementById("submit")
			const fileInput = document.getElementById("fileInput")
			const titleInput = document.getElementById("titleInput")

			button.disabled = true;
			fileInput.disabled = true;
			titleInput.disabled = true;
			const createdSong = await dispatch(addSong(formData,sessionUser.username));
			console.log(createdSong);
			if(createdSong.errors){
				for(let currErr in createdSong.errors){
					if(createdSong.errors[currErr] === "You provided a song title that you have already uploaded."){
						setTitle("")
					}
					errors.push(`${createdSong.errors[currErr]}`)
				}
				button.disabled = false;
				fileInput.disabled = false;
				titleInput.disabled = false;
				setValidationErrors(errors);
			} else if (createdSong){
				//need to move to added songs location
				await history.push(`/`);
				// await dispatch(loadSongs());
			}
		}
	};
	let count = 0
	return (
		<section className='loginFormContainer'>
			<div className='formContainerAddSong'>

			<form className="loginForm"onSubmit={handleSubmit}>
			{validationErrors.length > 0 && (
				<div className='errorsContainer'>
					{validationErrors.map( (currError) => {
						return <p key={`error-${count++}`}>{currError}</p>
					})}
				</div>
			)}
			<input type="file" id='fileInput'  name="filetoupload" onChange={updateSongUrl}></input>
			<label className='titleInputLabel'>
				Title
			<input type='textarea' className="loginInput" id='titleInput' placeholder='Title' value={title} onChange={updateTitle}/>
			</label>
			<input id="submit" className='loginSubmit songSubmit' type={"submit"}></input>
			</form>
			</div>
		</section>
	);
};

export default AddSongForm;
