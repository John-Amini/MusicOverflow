import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from 'react';
import  { Redirect } from 'react-router-dom'
import Song from "../Song";
import Comment from "../Comment";
import { useDispatch, useSelector } from "react-redux";
import { loadSongs } from "../../store/song";
import "./UserPage.css"
function UserPage(){

    const history = useHistory();
    const [userSongs , setUserSongs] =  useState(null);
    const [userComments,setUserComments] = useState(null);
    const [test,setTest] = useState(true)
    const songs = useSelector(state => state.song.songs);
    let dispatch = useDispatch()
    useEffect(async () => {
       await dispatch(loadSongs());
    },[])
    const userId = useParams().id
    useEffect(() => {
        //check if id is valid and get data for id
        (async () => {

            if(isNaN(userId)){
                history.push("/")
            }
            else{
                let response  =  await fetch(`/api/users/${userId}`)
                let data = await response.json();
                if(data.error) history.push("/");
                else{
                    // setUserSongs(data.songs);

                    let filteredSongs = songs?.filter(song => song.userId === parseInt(userId))
                    setUserSongs(filteredSongs)
                    setUserComments(data.comments);

                }
            }
          })();

    },[songs,test])

    return (

        <div className="userContainer">

            <div className="leftSide">
                <h2 className="title">User Songs</h2>
            <div className="songsList">
            {
                userSongs &&
                userSongs.map(song => {
                    return (
                        <Song song = {song} key = {song.id} parent={"parent"}>{song.title}</Song>
                    )
                })
            }
            </div>
            </div>
            <div className="rightSide">
            <h2 className="title">User Comments</h2>
                <div className="userCommentList">
            { userComments &&
             userComments.map(comment => {
                 return (
                     <Comment key={comment.id} comment={comment} userComments={userComments} test={test} setTest={setTest}></Comment>
                 )
             })}
             </div>
             </div>
        </div>
    )
}

export default UserPage
