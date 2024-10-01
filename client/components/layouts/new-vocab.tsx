"use client";
import React from "react";
import { AiFillSound } from "react-icons/ai";

const NewVocab = ({
  handleNext,
  word,
  audio,
  meaing,
  score,
  setScore
}: {
  handleNext: () => void;
  word: string;
  audio: string;
  meaing: string;
  score: number;
  setScore: (score: number) => void;
}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <p className="text-sm">ENGLISH</p>
        <p className="font-semibold text-3xl">{word}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm">VIETNAMESE</p>
        <p className=" text-xl">{meaing}</p>
      </div>
      <div className="flex flex-col border-t-4 pt-4">
        <p className="text-sm">AUDIO</p>
        <button onClick={playAudio} className="h-16 w-16 bg-slate-200 flex items-center justify-center rounded-lg mt-4">
          <AiFillSound className="text-3xl group-hover:scale-110 duration-500" />
        </button>
        <audio
          ref={audioRef}
          src={
           audio
          }
          preload="auto"
        />
      </div>
    </div>
  );
};

export default NewVocab;
