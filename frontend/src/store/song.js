import { act } from 'react-dom/cjs/react-dom-test-utils.production.min';

const axios = require ('axios')
const ADD_SONG = 'songs/addSong'

const AddSong = (song) => {
    return {
      type: ADD_SONG,
      payload: song,
    };
  };

  export const addSong = (formData) => async (dispatch) => {
    console.log("hit addSong")
   const response = axios.post("/api/songs",formData);
  }

  const initialState = {
      songList: []
  }
const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SONG:
            // const newState = {
            //     ...state, [action]
            // }
            console.log(action);
        default: return state;
    }
}
 export default songReducer
