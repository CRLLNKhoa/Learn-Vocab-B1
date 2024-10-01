"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { AiFillSound } from "react-icons/ai";
import useSound from "use-sound";

const Options = ({
  handleNext,
  answer,
  word,
  audio,
  score,
  setScore
}: {
  handleNext: () => void;
  answer: string[];
  word: string;
  audio: string;
  score: number;
  setScore: (score: number) => void;
}) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const [selected, setSelected] = useState("");

  const handleCheck = (selection: string) => {
    if (selected !== "") {
      return;
    }
    if(selection === word) {
      setScore(score + 100);
      
    }
    setSelected(selection);
    playAudio();
    handleNext();
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold">Chọn câu trả lời bạn nghe được</h2>
      <div className="flex mt-8">
        <div
          onClick={() => playAudio()}
          className="size-32 relative flex items-center justify-center group"
        >
          <img src="/bgsound.png" alt="img" className="size-full" />
          <button
            className="size-full absolute top-0 right-0  
          flex items-center justify-center"
          >
            <AiFillSound className="size-14 text-slate-500 group-hover:size-16 duration-200" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-4 ml-4">
          <div className="grid grid-cols-2 gap-4">
            {answer?.map((item: string) => (
              <div
                onClick={() => handleCheck(item)}
                key={item}
                className={cn(
                  "duration-300 flex items-center border p-4 rounded-lg border-b-4 cursor-not-allowed",
                  selected &&
                    word === item &&
                    "border-green-600 bg-green-500 text-white",
                  selected &&
                    selected === item &&
                    word !== item &&
                    "bg-red-500 text-white",
                  selected === "" && "hover:border-sky-600 cursor-pointer"
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <audio
          ref={audioRef}
          src={
           audio
          }
          preload="auto"
        />
    </div>
  );
};

export default Options;
