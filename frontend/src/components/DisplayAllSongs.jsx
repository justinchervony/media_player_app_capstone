import axios from "axios";


function deleteSong(id){
    axios.delete(`http://127.0.0.1:8000/api/songs/${id}`);
    window.location.reload(true);
}

function searchSong(title, artist){
    window.open(`https://www.youtube.com/results?search_query=${title}+${artist}`)
}

function DisplayAllSongs(props){
    let tempArray = props.songCollection
    return (
        <body className="songCollection">
            {tempArray.map((song, index) => {
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
                                <button type="button" onClick={() => searchSong(song.title, song.artist)}>Edit Song</button>
                            </div>
                            <div>
                                <button className="deleteButton" type="button" value={song.id} onClick={(event) => deleteSong(event.target.value)}>Delete Song</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </body>
    );
}

export default DisplayAllSongs;