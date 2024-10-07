"use client";
import React from "react";
import { FaCheck, FaPause, FaPlay, FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { TQuestion } from "@/types/questions";

function QuizNew({ data, next,handleCorrect }: { data: TQuestion; next: () => void, handleCorrect: () => void }) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <audio ref={audioRef} src={data.word.audio} preload="auto" onEnded={() => setIsPlaying(false)} />
      <h1 className="font-bold text-3xl">{data.word.word}</h1>
      <p className="text-red-500 font-semibold">{data.word.transcription}</p>
      <p className="font-bold">{data.word.mean}</p>
      <div onClick={() => {playAudio(); setIsPlaying(true)}}
        className="bg-[#4181EB] size-16 p-2 rounded-full mt-2
            flex items-center justify-center mr-2 cursor-pointer"
      >
        {isPlaying ? <FaPause className="text-white size-8 translate-x-[2px]" /> : <FaPlay className="text-white size-8 translate-x-[2px]" />}
      </div>
      <div className="flex flex-col items-center justify-start mt-6 text-center">
        <h2 className="font-bold">Examples</h2>
        <p>{data.word.example}</p>
      </div>
      <div className="flex items-center justify-center mt-6 gap-6">
        <button
          id="remove-to-collection"
          data-tooltip-content="Bỏ ra danh sách từ"
          data-tooltip-variant="dark"
          data-tooltip-place="bottom"
          data-tooltip-delay-show={500}
          className="hover:bg-stone-200 p-2 rounded-lg duration-300"
        >
          <FaStar className="text-yellow-400 size-8" />
        </button>
        <button
          className="hover:bg-stone-200 p-2 rounded-lg duration-300"
          id="add-to-collection"
          data-tooltip-content={"Thêm vào danh sách từ"}
          data-tooltip-variant="dark"
          data-tooltip-place="bottom"
          data-tooltip-delay-show={500}
        >
          <FaRegStar className="text-gray-400 size-8" />
        </button>
        <button
          onClick={() => next()}
          className="bg-green-500  p-2 
            rounded-md duration-300 flex items-center justify-center
            text-white px-6"
          id="learned"
          data-tooltip-content={"Đánh dấu đã học"}
          data-tooltip-variant="dark"
          data-tooltip-place="bottom"
          data-tooltip-delay-show={500}
        >
          <FaCheck className="size-4" />{" "}
          <p className="font-bold ml-2">Đã học</p>
        </button>
        <Tooltip anchorSelect="#remove-to-collection" />
        <Tooltip anchorSelect="#add-to-collection" />
        <Tooltip anchorSelect="#learned" />
      </div>
    </div>
  );
}

export default QuizNew;
