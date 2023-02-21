import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayAllUserSongs from "../../components/DisplayAllUserSongs";
import "./HomePage.css";

import axios from "axios";
import CreateSong from "../../components/CreateSong";
import EditSong from "../../components/EditSong";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [songs, setSongs] = useState([]);
  const [userSongs, setUserSongs] = useState([]);
  const [editSong, setEditSong] = useState({});

  // useEffect(() => {
  //   fetchSongs();
  // }, [token]);

  useEffect(() => {
    fetchUserSongs();
  }, [token]);

  // const fetchSongs = async () => {
  //   try {
  //     let response = await axios.get("http://127.0.0.1:8000/api/songs/song_library/", {
  //       // headers: {
  //       //   Authorization: "Bearer " + token,
  //       // },
  //     });
  //     console.log("Songs",response.data)
  //     setSongs(response.data);
  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // };

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
  function addNewSong(song){
    let tempSongs = [...songs, song];
    setSongs(tempSongs);
  }

  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      <div>
        <CreateSong getSongs={fetchUserSongs}/>
      </div>
        <EditSong editSong = {editSong} songCollection={songs} getSongs={fetchUserSongs}/>
      <div>
        <DisplayAllUserSongs setEditSong={setEditSong} userSongCollection={userSongs} getSongs={fetchUserSongs} userPage={true}/>
      </div>
    </div>
  );
};

export default HomePage;
