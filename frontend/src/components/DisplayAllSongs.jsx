import axios from "axios";


function deleteSong(id){
    axios.delete(`http://127.0.0.1:8000/api/songs/${id}`);
    window.location.reload(true);
}

function searchSong(title, artist){
    window.open(`https://www.youtube.com/results?search_query=${title}+${artist}`)
}

function DisplaySongs(props){
    let tempArray = props.songCollection
    return (
        <body className="songCollection">
            {tempArray.map((song, index) => {
                return (
                    <div className="songGrid">
                        <div className="songBox">
                            <div>
                                <ul><strong>Title: </strong>{song.title}</ul>
                                <ul><strong>Artist: </strong>{song.artist}</ul>
                                <ul><strong>Album: </strong>{song.album}</ul>
                                <ul><strong>Genre: </strong>{song.genre}</ul>
                                <ul><strong>Release Date: </strong>{song.release_date}</ul>
                            </div>
                            <div>
                                <button type="button" onClick={() => searchSong(song.title, song.artist)}>Search on YouTube</button>
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

export default DisplaySongs;