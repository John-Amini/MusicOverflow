import { useState,useEffect } from "react";
import { deleteSong, loadSongs } from "../../store/song";
import { useDispatch, useSelector } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import EditSongForm from "../EditSongForm";
import ListComments from "../ListComments";
import AddCommentForm from "../AddCommentForm";
import './Song.css'
function Song (params) {
    const sessionUser = useSelector(state => state.session.user);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editButtonText,setShowEditText] = useState("Edit")
    const [showPostCommentForm,setShowPostCommentForm] = useState(false)
    const [showPostCommentFormText , setShowPostCommentFormText] = useState("Post Comment")
    const  [showComments,setShowComments] = useState(false);
    const [showCommentsText,setShowCommentsText] = useState("Show Comments");
    const song = params.song;
    const dispatch = useDispatch();
    const toggleAddCommentForm = async(e) => {
        setShowPostCommentForm(!showPostCommentForm)
        !showPostCommentForm ? setShowPostCommentFormText("Cancel Comment") : setShowPostCommentFormText("Post Comment")
    }

    useEffect(() => {
      showEditForm ? setShowEditText("Cancel Edit") : setShowEditText("Edit");
    },[showEditForm])
    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteSong(song.id));
      }
      const toggleEditForm = async(e)=> {
        setShowEditForm(!showEditForm);
      }
      const toggleComments = async (e) => {
        setShowComments(!showComments);
      }
      useEffect(() => {
        showComments ? setShowCommentsText("Hide Comments") : setShowCommentsText("Show Comments")

      },[showComments])
      let content = null;
      let commentContent = null;
      let postComment = null;
      if(showEditForm && song.userId === sessionUser.id){
          content = <EditSongForm song={song} hideForm={()=>setShowEditForm(false)}> </EditSongForm>
      }
      if(showComments){
         commentContent = <ListComments song={song} ></ListComments>
      }
      if(sessionUser && showPostCommentForm){
        postComment = <AddCommentForm song={song} hideForm={toggleAddCommentForm} showComments={setShowComments}></AddCommentForm>
      }
    return (
        <div className="songContainer">
          <div className="innerSongContainer">
          <div className="songDetailsContainer">
            <div className='songTitle'>{song.title} </div>
            {   song.userId === sessionUser?.id &&
                <button className='songDelete delete' onClick={handleDelete}>Delete</button>
            }
             {   song.userId !== sessionUser?.id &&
                <button disabled={true} className='songDelete opaque'>Delete</button>
            }
            <div>Uploader:{song.User?.username} </div>


            {   song.userId === sessionUser?.id &&
                <div>
                    <button className="songEditButton edit" onClick={toggleEditForm}>{editButtonText}</button>
                    {content}
                </div>
            }
            </div>
        <ReactAudioPlayer
        className="audioPlayer"
        src={song.songUrl}
        controls></ReactAudioPlayer>
        <button  className='showCommentsButt showComments'onClick={toggleComments}>{showCommentsText}</button>
        {sessionUser &&
        <button className='postCommentButt edit'onClick={toggleAddCommentForm}>{showPostCommentFormText}</button>
        }
        </div>
        {sessionUser && postComment}
        <div className="commentsContainer">
            {commentContent}
        </div>
        </div>
    )
}

export default Song;
