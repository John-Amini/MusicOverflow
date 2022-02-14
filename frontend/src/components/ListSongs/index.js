import React from "react";
import { useSelector } from 'react-redux';
import Song from "../Song";
import './ListSongs.css'
function ListSongs() {
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.song.songs);
    // console.log("LIST SONGS")
    // console.log(songs)
  return (
    <div className="songsListContainer">
      <ul className="songsList">
        {
          songs &&
          songs.map(song => {
            // console.log(song)
            return (
            <Song  song={song} key={song.id} >{song.title}</Song>
          )})
        }
      </ul>
    </div>
  )
}

export default ListSongs;
