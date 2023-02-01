import { useState } from "react"
import axios from "axios";



const CreateSong = (props) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [release_date, setReleaseDate] = useState('');


    async function createSong(event){
        const inputSong = await axios.post('http://127.0.0.1:8000/api/songs/new/', {
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            release_date: release_date,
        });
        console.log(inputSong);
      }

    return (
        <form onSubmit={createSong}>
            <h4>Add a Song</h4>
            <input type={"text"} value={title} placeholder = "Title" onChange={(event) => setTitle(event.target.value)} />
            <input type={"text"} value={artist} placeholder = "Artist" onChange={(event) => setArtist(event.target.value)} />
            <input type={"text"} value={album} placeholder = "Album" onChange={(event) => setAlbum(event.target.value)} />
            <input type={"text"} value={genre} placeholder = "Genre" onChange={(event) => setGenre(event.target.value)} />
            <input type={"date"} value={release_date} onChange={(event) => setReleaseDate(event.target.value)} />
            <button type='submit' className="submitButton">Create</button>
        </form>
    );
}

export default CreateSong;