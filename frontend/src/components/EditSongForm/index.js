import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSong, loadSongs } from '../../store/song';
import './EditSongForm.css'
const EditSongForm = ({ song, hideForm }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [newTitle,setNewTitle] = useState(song.title);
    const updateNewTitle = (e) => setNewTitle(e.target.value);
	  const [validationErrors,setValidationErrors] = useState([]);


    async function checkSpecialCharacters(title){
      const specialChars = /[`!@#$%^&*_+\-=\[\]{};:"\\|,.<>\/?~]/;
      return specialChars.test(title);
  }
    useEffect(()=> {
      let submitBut = document.getElementById(`updateSong${song.id}`)
      if(newTitle === song.title || newTitle === '' || newTitle.length > 55){
        submitBut.disabled = true
      } else{
        submitBut.disabled = false;
      }
    },[newTitle])
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if(await checkSpecialCharacters(newTitle)){
      errors.push("No special characters allowed")
      setValidationErrors(errors);
      return;
    }
    else{
    const payload = {
      song,
      newTitle,
    };
    // console.log(payload)
    // console.log(payload.newTitle)
    await dispatch(editSong(payload))
    await dispatch(loadSongs())
    hideForm();
  }
  };

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };
  let count = 0;
  return (
    <section  >
      <form className='editSongForm' onSubmit={handleSubmit}>
      {validationErrors.length > 0 && (
				<div className='errorsContainerSongEdit'>
					{validationErrors.map( (currError) => {
						return <p key={`error-${count++}`}>{currError}</p>
					})}
				</div>
			)}
        <input
          className='newTitleInput'
          type="textarea"
          placeholder="New Title"
          value={newTitle}
          onChange={updateNewTitle} />
        <button className='updateSongBtn' id={`updateSong${song.id}`}type="submit">Update Song</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default EditSongForm;
