import { useState } from "react";
import { deleteSong, loadSongs } from "../../store/song";
import { useDispatch, useSelector } from "react-redux";
import EditSongForm from "../EditSongForm";
function Song (params) {
    const sessionUser = useSelector(state => state.session.user);
    const [showEditForm, setShowEditForm] = useState(false);
    const song = params.song;
    const dispatch = useDispatch();
    // console.log('SONG COMPONENT');
    // console.log(song)
    // console.log(song.id)
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSong(song.id));
      }
      const toggleEditForm = async(e)=> {
        setShowEditForm(true);
      }
      let content = null;
      if(showEditForm && song.userId === sessionUser.id){
          content = <EditSongForm song={song} hideForm={()=>setShowEditForm(false)}> </EditSongForm>
      }
    return (
        <div>
            <div>{song.title}</div>
            {   song.userId === sessionUser.id &&
                <button onClick={handleDelete}>Delete</button>
            }
            {   song.userId === sessionUser.id &&
                <div>
                    <button onClick={toggleEditForm}>Edit</button>
                    {content}
                </div>
            }
        </div>
    )
}

export default Song;
