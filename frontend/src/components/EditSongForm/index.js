import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSong } from '../../store/song';

const EditSongForm = ({ song, hideForm }) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [newTitle,setNewTitle] = useState(song.title);
    const updateNewTitle = (e) => setNewTitle(e.target.value);

    useEffect(()=> {
      let submitBut = document.getElementById(`updateSong${song.id}`)
      if(newTitle === song.title || newTitle === ''){
        submitBut.disabled = true
      } else{
        submitBut.disabled = false;
      }
    },[newTitle])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      song,
      newTitle,
    };
    // console.log(payload)
    // console.log(payload.newTitle)
    await dispatch(editSong(payload))
    hideForm();
  };

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };

  return (
    <section >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New Title"
          value={newTitle}
          onChange={updateNewTitle} />
        <button id={`updateSong${song.id}`}type="submit">Update Song</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default EditSongForm;
