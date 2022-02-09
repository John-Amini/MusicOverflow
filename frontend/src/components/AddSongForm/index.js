import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { addSong } from '../../store/song';

const AddSongForm = ({ }) => {
	const sessionUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const [album, setAlbum] = useState('');
	const [title, setTitle] = useState('');
	const [songUrl, setSongUrl] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [validationErrors,setValidationErrors] = useState([]);


	const updateTitle = (e) => setTitle(e.target.value);
	const updateAlbum = (e) => setAlbum(e.target.value);
	const updateImageUrl = (e) => setImageUrl(e.target.files[0]);
	const updateSongUrl = (e) => setSongUrl(e.target.files[0])
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
		// const payload = {
		// 	imageUrl,
		// 	title,
		// 	album
		// }
		// console.log(e);
		// console.log(e.filetoupload);
		// console.log(e.value);
		// console.log(e.target[0]);
		if(songUrl){
			const formData = new FormData();
			formData.append("song",songUrl,title)
			formData.append("image",imageUrl,`image`);
			formData.append("album",album);
			formData.append('title',title)
			console.log(formData);
			dispatch(addSong(formData));
			// axios.post("/api/songs",formData);
		}
	};
	// useEffect(() => {
	// 	if(songUrl){
	// 	const formData = new FormData();
	// 	formData.append("song",songUrl,title)
	// 	console.log(formData);
	// 	console.log(songUrl);
	// 	axios.post("/api/songs",formData);
	// }
	// 	return (console.log("cleanup"))
	// },[songUrl])
	//figure out how to do validation errors for a file
		// if errors show the errors and call setValidationErrors otherwise do a history.push to the newly created song

	return (
		<section>
			{validationErrors.length > 0 && (
				<div className='errorsContainer'>
					{validationErrors.map( (currError) => {
						return <p>{currError}</p>
					})}
				</div>
			)}
			{/* <form onSubmit={handleSubmit}>
				<input type={"file"} name={'song'}></input>
				<input type='text' placeholder='Image URL' value={imageUrl} onChange={updateImageUrl} />
				<input type='text' placeholder='Album' value={album} onChange={updateAlbum} />
				<input type='text' placeholder='title' value={title} onChange={updateTitle}/>
				<input type={"submit"}></input>
			</form> */}
			{/* <form action='/songs' method='post' encType='multipart/form-data'> */}
			<form onSubmit={handleSubmit}>
			<input type="file" name="filetoupload" onChange={updateSongUrl}></input>
			<input type="file" name="filetoupload" onChange={updateImageUrl}></input>
			<input type='text' placeholder='title' value={title} onChange={updateTitle}/>
			<input type='text' placeholder='album' value={album} onChange={updateAlbum}/>

			<input type={"submit"}></input>
			</form>

		</section>
	);
};

export default AddSongForm;
