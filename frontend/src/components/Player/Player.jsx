import React from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill , BsFillStopCircleFill} from 'react-icons/bs';


const Player = (props) => {

    const PlayPause = (e) => {
        props.setIsPlaying(!props.isPlaying);
        e.preventDefault();
        
        // props.audioElement.current.play();
    }

    const StopSong = () => {
        props.audioElement.current.pause();
        props.audioElement.current.currentTime = 0;
        props.audioElement.current.load();
    }

    return (
        <div className='player_container'>
            <div className='title'>
                <p>Current Song</p>
            </div>
            <div className='navigation'>
                <div className='navigation_wrapper'>
                    <div className='seek_bar' style={{width:'50%'}}></div>
                </div>
            </div>
            <div className='controls'>
                {props.isPlaying ? 
                <BsFillPauseCircleFill className='btn_action_pp' onClick={PlayPause}/>
                : <BsFillPlayCircleFill className='btn_action_pp' onClick={PlayPause} />}
                <BsFillStopCircleFill className='btn_action_stop' onClick={StopSong} />
            </div>
        </div>
    )
};

export default Player;
