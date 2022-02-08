import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AddSongForm = ({ }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [album, setAlbum] = useState('');
	const [title, setTitle] = useState('');
	const [songUrl, setSongUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [validationErrors,setValidationErrors] = useState([]);


	const updateTitle = (e) => setTitle(e.target.value);
	const updateAlbum = (e) => setAlbum(e.target.value);
	const updateImageUrl = (e) => setImageUrl(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = [];
		const payload = {
			imageUrl,
			title,
			album
		}
	};
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
			<form onSubmit={handleSubmit}>
				<input type={"file"} name={'song'}></input>
				<input type='text' placeholder='Image URL' value={imageUrl} onChange={updateImageUrl} />
				<input type='text' placeholder='Album' value={album} onChange={updateAlbum} />
				<input type='text' placeholder='title' value={title} onChange={updateTitle}/>
				<input type={"submit"}></input>
			</form>

		</section>
	);
};

export default AddSongForm;
