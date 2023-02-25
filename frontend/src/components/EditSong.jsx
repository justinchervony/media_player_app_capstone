import { useState, useEffect, setState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const EditSong = (props) => {
  const [user, token] = useAuth();
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [album_image, setAlbumImage] = useState(props.editSong.album_image);
  const [audio, setAudio] = useState(props.editSong.audio);




  async function editSong(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("genre", genre);

    // await axios.patch(`http://127.0.0.1:8000/api/songs/${props.editSong.id}`, formData);

    await axios.patch(`http://127.0.0.1:8000/api/songs/${props.editSong.id}`, formData,{
        headers: { Authorization: "Bearer " + token },
      });
    props.getSongs();
  }

  useEffect(() => {
    setTitle(props.editSong.title)
  }, [props.editSong]);

  useEffect(() => {
    setArtist(props.editSong.artist)
  }, [props.editSong]);

  useEffect(() => {
    setAlbum(props.editSong.album)
  }, [props.editSong]);

  useEffect(() => {
    setGenre(props.editSong.genre)
  }, [props.editSong]);

  return (
    <form onSubmit={editSong}>
      <h4>Edit Song</h4>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={artist}
          placeholder="Artist"
          onChange={(event) => setArtist(event.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          value={album}
          placeholder="Album"
          onChange={(event) => setAlbum(event.target.value)}
        />
      </div>
      <div>
        <input
          type={"text"}
          value={genre}
          placeholder="Genre"
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <button type="submit" className="submitButton">
          Submit Edit
        </button>
      </div>
    </form>
  );
};

export default EditSong;
