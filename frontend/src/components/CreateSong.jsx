import { useState, setState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const CreateSong = (props) => {
  const [user, token] = useAuth();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [album_image, setAlbumImage] = useState();
  const [audio, setAudio] = useState();

  async function createSong(event) {
    event.preventDefault();
    let formData = new FormData();

    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("genre", genre);
    formData.append("album_cover_url", album_image);
    formData.append("audio_file_url", audio);

    await axios.post("http://127.0.0.1:8000/api/songs/new/", formData, {
      headers: { Authorization: "Bearer " + token },
    });
    props.getSongs();
  }

  return (
    <form onSubmit={createSong}>
      <h4>Add a Song</h4>
      <div>
        <input
          type={"text"}
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <input
          type={"text"}
          value={artist}
          placeholder="Artist"
          onChange={(event) => setArtist(event.target.value)}
        />
      </div>
      <div>
        <input
          type={"text"}
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
      <div>
        <h5>Album Image </h5>
        <input
          type={"file"}
          accept=".png, .jpeg"
          onChange={(event) => setAlbumImage(event.target.files[0])}
        />
      </div>
      <div>
        <h5>Audio File </h5>
        <input
          type={"file"}
          accept=".mp3"
          onChange={(event) => setAudio(event.target.files[0])}
        />
      </div>
      <div>
        <button type="submit" className="submitCreateButton">
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateSong;
