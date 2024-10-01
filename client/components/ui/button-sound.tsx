import React from 'react';

const AudioButton = ({url}:{url:string}) => {
    // Tạo một ref cho audio
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // Hàm để phát audio
    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div>
            <button onClick={playAudio}>Phát nhạc</button>
            <audio ref={audioRef} src={url} preload="auto" />
        </div>
    );
};

export default AudioButton;
