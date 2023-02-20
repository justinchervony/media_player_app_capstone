import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import DisplayAllSongs from "../../components/DisplayAllSongs";
import "./LibraryPage.css";

import axios from "axios";

const LibraryPage = () => {

    const [user, token] = useAuth();
    const [songs, setSongs] = useState([]);
    const [editSong, setEditSong] = useState({});

    useEffect(() => {
    fetchSongs();
    }, [token]);

    const fetchSongs = async () => {
    try {
        let response = await axios.get("http://127.0.0.1:8000/api/songs/song_library/", {
        // headers: {
        //   Authorization: "Bearer " + token,
        // },
        });
        console.log("Songs",response.data)
        setSongs(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
    };

    return (
        <div className="container">
          <h1>Media Library Page</h1>
          <div>
            <DisplayAllSongs setEditSong={setEditSong} songCollection={songs} getSongs={fetchSongs} userPage={false}/>
          </div>
        </div>
      );
    };
    
    export default LibraryPage;