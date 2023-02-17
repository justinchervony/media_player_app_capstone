import axios from "axios";
import React, {useState} from 'react';




function DisplayAllSongs(props){
    const [userInput, setUserInput] = useState('');
    
    async function deleteSong(id){
        if(window.confirm("Are you sure you want to delete this song?")) {
            await axios.delete(`http://127.0.0.1:8000/api/songs/${id}`);
            props.getSongs()
        }
        else {
        }   
    }

    let tempArray = props.songCollection
    return (<>
        <input type= "text" value={userInput} onChange={e =>setUserInput(e.target.value)}  />
        <body className="songCollection">
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
                            <div>
                                <button type="button" onClick={() => props.setEditSong(song)}>Edit Song</button>
                            </div>
                            <div>
                                <button className="deleteButton" type="button" value={song.id} onClick={(event) => deleteSong(event.target.value)}>Delete Song</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </body>
    </>
    );
}

export default DisplayAllSongs;