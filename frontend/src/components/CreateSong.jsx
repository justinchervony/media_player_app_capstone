import { useState , setState} from "react"
import axios from "axios";



const CreateSong = (props) => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [album_image, setAlbumImage] = useState();
    const [audio, setAudio] = useState();

    const onChangePicture = e => {
        setAlbumImage(e.target.files[0]);
        console.log('testpicture', album_image);
        window.open(album_image);
    };

    const onChangeAudio = e => {
        setAudio(e.target.files[0]);
        console.log('testaudio', audio);
    };


    async function createSong(event){
        event.preventDefault()
        const inputSong = await axios.post('http://127.0.0.1:8000/api/songs/new/', {
            title: title,
            artist: artist,
            album: album,
            genre: genre,
        });
        inputSong.append('test', album_image)
        console.log(inputSong);
      }

    return (
        <form onSubmit={createSong}>
            <h4>Add a Song</h4>
            <input type={"text"} value={title} placeholder = "Title" onChange={(event) => setTitle(event.target.value)} />
            <input type={"text"} value={artist} placeholder = "Artist" onChange={(event) => setArtist(event.target.value)} />
            <input type={"text"} value={album} placeholder = "Album" onChange={(event) => setAlbum(event.target.value)} />
            <input type={"text"} value={genre} placeholder = "Genre" onChange={(event) => setGenre(event.target.value)} />
            <input type={"file"} accept=".png, .jpeg" onChange={onChangePicture} />
            <input type={"file"} accept=".mp3" onChange={onChangeAudio} />
            <button type='submit' className="submitButton">Create</button>
        </form>
    );
}

export default CreateSong;