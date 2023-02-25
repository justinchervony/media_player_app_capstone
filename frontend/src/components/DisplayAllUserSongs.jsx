import axios from "axios";
import React, {useEffect, useState} from 'react';
import useAuth from "../hooks/useAuth";




function DisplayAllUserSongs(props){
    const [userInput, setUserInput] = useState('');
    const isUserPage = props.userPage;
    const [user, token] = useAuth();
    const [usersSongs,setUsersSongs] = useState()
    

    async function deleteSong(id){
        if(window.confirm("Are you sure you want to delete this song?")) {
            await axios.delete(`http://127.0.0.1:8000/api/songs/${id}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }   
            );
            props.getSongs()
        }
        else {
        }   
    }



    let tempArray = props.userSongCollection
    return (<>
        <div> Search all songs </div>
        <input type= "text" value={userInput} onChange={e =>setUserInput(e.target.value)}  />
        <div className="userSongCollection">
            {tempArray.filter(el=> (
                el.title.toLowerCase().includes(userInput.toLowerCase()) || 
                el.artist.toLowerCase().includes(userInput.toLowerCase()) ||
                el.album.toLowerCase().includes(userInput.toLowerCase()) ||
                el.genre.toLowerCase().includes(userInput.toLowerCase())
                )).map((song, index) => {
                return (
                    <div className="songGrid" >
                        <div className="songBox" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://127.0.0.1:8000/${song.album_cover_url})`}}>
                            <div>
                                <ul><strong>Title: </strong>{song.title}</ul>
                                <ul><strong>Artist: </strong>{song.artist}</ul>
                                <ul><strong>Album: </strong>{song.album}</ul>
                                <ul><strong>Genre: </strong>{song.genre}</ul>
                            </div>
                            <div className="songBoxOptions">
                                <button type="button" onClick={() => props.getSelectedSong(song)}>Play</button>
                                <button type="button" onClick={() => props.setEditSong(song)}>Edit</button>
                                <button className="deleteButton" type="button" value={song.id} onClick={(event) => deleteSong(event.target.value)}>Delete</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </>
    );
}

export default DisplayAllUserSongs;