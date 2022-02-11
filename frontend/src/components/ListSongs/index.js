import React from "react";
import { useSelector } from 'react-redux';
import Song from "../Song";
function ListSongs() {
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.song.songs);
    // console.log("LIST SONGS")
    // console.log(songs)
  return (
    <>
      <ul>
        {
          sessionUser &&
          songs &&
          songs.map(song => {
            // console.log(song)
            return (
            <Song  song={song} key={song.id} >{song.title}</Song>
          )})
        }
      </ul>
    </>
  )
}

export default ListSongs;
