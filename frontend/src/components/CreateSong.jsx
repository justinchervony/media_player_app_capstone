import { useState , setState} from "react"
import axios from "axios";
import useAuth from "../hooks/useAuth";



const CreateSong = (props) => {
    const [user,token] = useAuth()
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');
    const [album_image, setAlbumImage] = useState();
    const [audio, setAudio] = useState();

    // const onChangePicture = e => {
    //     setAlbumImage(e.target.files[0]);
    //     console.log('testpicture', album_image);
    //     window.open(album_image);
    // };

    // const onChangeAudio = e => {
    //     setAudio(e.target.files[0]);
    //     console.log('testaudio', audio);
    // };


    async function createSong(event){
        event.preventDefault()
        let formData = new FormData();

        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('album', album);
        formData.append('genre', genre);
        formData.append('album_cover_url', album_image);
        formData.append('audio_file_url', audio);

        await axios.post('http://127.0.0.1:8000/api/songs/new/', formData, {headers: {Authorization: "Bearer " + token}});
        // const inputSong = await axios.post('http://127.0.0.1:8000/api/songs/new/', {
        //     title: title,
        //     artist: artist,
        //     album: album,
        //     genre: genre,
        // });
        // inputSong.append('test', album_image)
        // console.log(inputSong);
        props.getSongs()
      }

    return (
        <form onSubmit={createSong}>
            <h4>Add a Song</h4>
            <input type={"text"} value={title} placeholder = "Title" onChange={(event) => setTitle(event.target.value)} />
            <input type={"text"} value={artist} placeholder = "Artist" onChange={(event) => setArtist(event.target.value)} />
            <input type={"text"} value={album} placeholder = "Album" onChange={(event) => setAlbum(event.target.value)} />
            <input type={"text"} value={genre} placeholder = "Genre" onChange={(event) => setGenre(event.target.value)} />
            <input type={"file"} accept=".png, .jpeg" onChange={(event) => setAlbumImage(event.target.files[0])} />
            <input type={"file"} accept=".mp3" onChange={(event) => setAudio(event.target.files[0])} />
            <button type='submit' className="submitButton">Create</button>
        </form>
    );
}

export default CreateSong;