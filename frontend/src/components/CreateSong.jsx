import { useState , setState} from "react"
import axios from "axios";



const CreateSong = (props) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [album_image, setAlbumImage] = useState('');
    const [audio, setAudio] = useState('');


    async function createSong(event){
        const inputSong = await axios.post('http://127.0.0.1:8000/api/songs/new/', {
            title: title,
            artist: artist,
            album: album,
            genre: genre,
            album_image_url: album_image,
            audio_file_url: audio,
            users: 1
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
            <input type={"file"} accept=".png, .jpeg" value={album_image} onFileUpload={(event) => setAlbumImage(event.target.files[0])} />
            <input type={"file"} accept=".mp3" value={audio} onChange={(event) => setAudio(event.target.files[0])} />
            <button type='submit' className="submitButton">Create</button>
        </form>
    );
}

export default CreateSong;