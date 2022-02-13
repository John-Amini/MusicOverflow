import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSong, loadSongs } from '../../store/song';

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
		if(title === "" || songUrl === null)
			button.disabled = true;
		else{
			button.disabled = false;
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
					errors.push(`${currErr} ${createdSong.errors[currErr]}`)
				}
				button.disabled = false;
				fileInput.disabled = false;
				titleInput.disabled = false;
				setValidationErrors(errors);
				setTitle("")
			} else if (createdSong){
				//need to move to added songs location
				await history.push(`/`);
				// await dispatch(loadSongs());
			}
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
			<input type="file" id='fileInput' name="filetoupload" onChange={updateSongUrl}></input>
			{/* <input type="file" name="filetoupload" onChange={updateImageUrl}></input> */}
			<input type='text' id='titleInput' placeholder='title' value={title} onChange={updateTitle}/>
			{/* <input type='text' placeholder='album' value={album} onChange={updateAlbum}/> */}

			<input id="submit" type={"submit"}></input>
			</form>

		</section>
	);
};

export default AddSongForm;
