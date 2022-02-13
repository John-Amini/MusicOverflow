import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';
import { csrfFetch } from './csrf';

const axios = require ('axios')
const ADD_SONG = 'songs/addSong'
const LOAD_SONG = 'songs/loadSong'
const DELETE_SONG = 'songs/deleteSong'
const EDIT_SONG = 'songs/editSong'
const addSongType = (song) => {
    return {
      type: ADD_SONG,
      payload: song,
    };
  };
const loadSongType = (songs) => {
  return {
    type:LOAD_SONG,
    payload:songs
  }
}
const deleteSongType = (song) => {
  return {
    type:DELETE_SONG,
    id:+song.id
  }
}
const editSongType = (song,newTitle) => {
  return {
    type:EDIT_SONG,
    song:song,
    newTitle
  }
}
  export const addSong = (formData,username) => async (dispatch) => {
    console.log("hit addSong")
    let response;
      // console.log(response)
      response = await axios.post("/api/songs",formData).catch(function (error){
        //console logging the error gives you no data whatsoever
        console.log("went into the catch")
        // console.log(error.response)
        console.log(error.response.data);
        let body = {};
        body.errors = error.response.data.errors;
        console.log("THIS IS BODY")
        console.log(body)
        return body;

      });
      if(response.status === 200){
        const newSong =response.data.song;
        newSong.User = {};
        newSong.User.username = username;
        await dispatch(addSongType(newSong));
        console.log("hit oka?")
        return newSong;
      }
      return response;
  }

  export const loadSongs = () => async (dispatch) => {
    console.log("load songs")
    const response = await fetch("/api/songs")
    const data = await response.json();
    await dispatch(loadSongType(data.songs));
    return response;
  };

  export const deleteSong = (id) => async (dispatch)=>{
    const response = await csrfFetch(`/api/songs/${id}`,{
      method:'DELETE'
    })
    console.log("DELEETEDEDEDEDEDD")
    console.log(response)
    let body = await response.json();
    console.log(body.song.id)
   await dispatch(deleteSongType(body.song))
    return body;
  }

export const editSong = (payload) => async (dispatch)=> {
  const response = await csrfFetch(`/api/songs`, {
    method:'PUT',
    body: JSON.stringify({
      payload
    })
  })
  if(response.ok){
  await dispatch(editSongType(payload.song,payload.newTitle))
  }
  return response
}

  const initialState = {songs:null}
const songReducer = (state = initialState, action) => {
  // console.log(action);
  let newState= {};
  let index = 0;
    switch(action.type) {
        case ADD_SONG:
          newState = Object.assign({},state);
          newState.songs.unshift(action.payload);
            return newState
        case LOAD_SONG:
          newState = Object.assign({},state);
          newState.songs = action.payload
          return newState;
        case DELETE_SONG:
          newState = Object.assign({},state);
          //action.id
          console.log(newState.songs)
          for(let i = 0;i<newState.songs.length;i++){
            if(newState.songs[i].id === action.id){
              index = i;
            }
          }
          let temp = [...newState.songs]
          temp.splice(index,1);
          newState.songs = [...temp]
          console.log(newState.songs)
          return newState
        case EDIT_SONG:
          newState = Object.assign({},state);
          for(let i = 0;i<newState.songs.length;i++){
            if(newState.songs[i].id === action.song.id){
              index = i;
            }
          }
          let temper = [...newState.songs];
          temper[index].title = action.newTitle;
          newState.songs = [...temper];
          return newState
        default: return state;
    }
}
 export default songReducer
