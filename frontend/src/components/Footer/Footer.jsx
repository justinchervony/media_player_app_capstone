import "./Footer.css";
import useAuth from "../../hooks/useAuth";

import Player from "../Player/Player";
import { useEffect, useRef, useState } from "react";


const Footer = ({selectedSong}, {userSongCollection}) => {
  const [user, token] = useAuth();
  const [songs, setSongs] = useState(userSongCollection);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState([]);

  const audioElement = useRef();

  useEffect(() => {
    if (isPlaying){
      audioElement.current.play();
    }
    else {
      audioElement.current.pause();
    }
  }, [isPlaying])

  // useEffect(() => {
  //   props.getSongs();
  // }, [token]);

  useEffect(() => {
    setCurrentSong(selectedSong)
  }, [selectedSong]);

  return (
    <footer>
      {/* <audio ref={audioElement} controls>
        <source src={currentSong} type='audio/mpeg'></source>
      </audio> */}
      {/* <audio src={currentSong} ref={audioElement} /> */}
      <audio src='http://127.0.0.1:8000//media/audio_files/03_Africa.m4a' ref={audioElement} />
      <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioElement={audioElement} />
    </footer>
  );
};

export default Footer;
