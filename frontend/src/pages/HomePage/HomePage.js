import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayAllUserSongs from "../../components/DisplayAllUserSongs";
import "./HomePage.css";

import axios from "axios";
import CreateSong from "../../components/CreateSong";
import EditSong from "../../components/EditSong";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [songs, setSongs] = useState([]);
  const [userSongs, setUserSongs] = useState([]);
  const [editSong, setEditSong] = useState({});
  const [selectedSong, setSelectedSong] = useState([]);


  useEffect(() => {
    fetchUserSongs();
  }, [token]);


  const fetchUserSongs = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/songs/user/${user.id}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log("Songs",response.data)
      setUserSongs(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getSelectedSong =  (song) => {
    console.log("Current Song", song.audio_file_url)
    setSelectedSong('http://127.0.0.1:8000/' + song.audio_file_url);
  }
  // const getSelectedSong = async (song) => {
  //   let response = await axios.get(`http://127.0.0.1:8000/api/songs/${song.id}`, {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   console.log("Current Song", response.data.audio_file_url)
  //   setSelectedSong('http://127.0.0.1:8000/' + response.data.audio_file_url);
  // }

  function addNewSong(song){
    let tempSongs = [...songs, song];
    setSongs(tempSongs);
  }

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <div className="songFields">
        <div>
          <CreateSong getSongs={fetchUserSongs}/>
        </div>
        <div>
          <EditSong editSong = {editSong} songCollection={songs} getSongs={fetchUserSongs}/>
        </div>
      </div>
      <div className="displaySongsComponent">
        <DisplayAllUserSongs setEditSong={setEditSong} userSongCollection={userSongs} getSongs={fetchUserSongs} userPage={true} 
        getSelectedSong={getSelectedSong} />
      </div>
      <Footer selectedSong={selectedSong} userSongCollection={userSongs} />
    </div>
  );
};

export default HomePage;
