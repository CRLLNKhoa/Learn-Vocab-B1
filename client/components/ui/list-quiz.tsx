"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { FaPlay, FaPause } from "react-icons/fa";
import Quiz from "./quiz";
import { TQuestion } from "@/types/questions";
import useSound from "use-sound";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

function ListQuiz({
  data,
  setQuestionAnswer,
}: {
  data: TQuestion[];
  setQuestionAnswer: (e: number) => void;
}) {
  const router = useRouter();
  const [isResult, setIsResult] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const soundCorrect = "/sound/correct.mp3";
  const [playCorrect] = useSound(soundCorrect);

  const [isPlaying, setIsPlaying] = useState(false);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleConfetti = () => {
    const end = Date.now() + 999 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsResult(false);
      setQuestionAnswer(currentIndex + 1);
    } else {
      setIsComplete(true);
      setIsResult(false);
      handleConfetti();
    }
  };

  const handleCorrect = () => {
    setIsResult(true);
  };

  useEffect(() => {
    if (isResult) {
      playCorrect();
      setIsPlaying(false);
    }
  }, [isResult]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className="flex-1 h-full w-full flex flex-col items-center justify-center select-none">
          {data.map((item, index) => {
            if (currentIndex === index) {
              return (
                <Quiz
                  next={handleNext}
                  data={item}
                  key={index}
                  index={index}
                  currentIndex={currentIndex}
                  handleCorrect={handleCorrect}
                />
              );
            }
          })}
          <Button
            disabled
            size={"lg"}
            className="rounded-full bg-stone-300 text-gray-600
               hover:bg-white text-lg font-bold mt-auto w-1/2"
          >
            Tiếp theo
          </Button>
        </div>
      )}
      {isComplete && (
        <div
          className="flex-1 h-full w-full flex flex-col items-center 
          justify-center select-none"
        >
          <img src="/complete.svg" alt="svg" className="size-[200px]" />
          <h1 className="text-xl font-semibold">Bạn đã hoàn thành bài học</h1>
          <button
            onClick={() => router.push("/")}
            className="text-lg font-semibold bg-[#4181EB] text-white p-2 rounded-full w-[200px] mt-8"
          >
            Trang chủ
          </button>
        </div>
      )}
      {isResult && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full 
        bg-white bg-opacity-50 flex items-end justify-center"
        >
          <motion.div
            className="bg-[#4181EB] h-[35%] w-2/3 
          rounded-t-[52px] p-4 flex flex-col relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <img
              src="/complete.svg"
              alt="svg"
              className="size-[200px] absolute top-[-200px] left-[50%] -translate-x-1/2"
            />
            <div className="flex flex-col flex-1 items-center justify-center">
              <div
                className="flex items-center justify-center w-full text-white bg-[#4181EB] 
            rounded-full font-bold text-xl"
              >
                <div
                  onClick={() => {
                    playAudio(), setIsPlaying(true);
                  }}
                  className="bg-white size-8 p-2 rounded-full 
                flex items-center justify-center mr-2 cursor-pointer"
                >
                  {isPlaying ? (
                    <FaPause className="text-[#4181EB] size-4 translate-x-[2px]" />
                  ) : (
                    <FaPlay className="text-[#4181EB] size-4 translate-x-[2px]" />
                  )}
                </div>
                <p className="">{data[currentIndex].word.word}</p>
              </div>
              <p className="text-center text-lg text-white mt-2">
                {data[currentIndex].word.mean}
              </p>
            </div>
            <Button
              onClick={() => handleNext()}
              size={"lg"}
              className="rounded-full bg-white text-[#4181EB]
             hover:bg-white text-lg font-bold mt-auto"
            >
              Tiếp theo
            </Button>
            <audio
              onEnded={() => setIsPlaying(false)}
              ref={audioRef}
              src={data[currentIndex].word.audio}
              preload="auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ListQuiz;
