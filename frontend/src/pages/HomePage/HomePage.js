import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/songs/library/", {
          // headers: {
          //   Authorization: "Bearer " + token,
          // },
        });
        setSongs(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchSongs();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {songs &&
        songs.map((song) => (
          <p key={song.id}>
            <img src={'../../..' + song.album_cover_url} />
            {song.title} {song.artist} {song.album} {song.genre} {song.album_cover_url} song.audio_file_url
          </p>
        ))}
    </div>
  );
};

export default HomePage;
