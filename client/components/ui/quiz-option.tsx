"use client";
import { TQuestion } from "@/types/questions";
import React, { use, useEffect, useState } from "react";
import optionJson from "@/jsons/options.json";
import { cn } from "@/lib/utils";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import useSound from 'use-sound';

function QuizOption({ data,handleCorrect }: { data: TQuestion; handleCorrect: () => void }) {
  const [options, setOptions] = useState<any>([]);
  const [selected, setSelected] = useState(["none", "none", "none", "none"]);

  const soundCorrect = '/sound/correct.mp3';
  const soundWrong = '/sound/wrong.mp3';
  const [playCorrect] = useSound(soundCorrect);
  const [playWrong] = useSound(soundWrong);

  useEffect(() => {
    const renderOption = () => {
      const shuffledArray = optionJson.sort(() => 0.5 - Math.random()); // Xáo trộn mảng
      const q = shuffledArray.slice(0, 3);
      const q2 = [...q, data.word.word];
      setOptions(q2.sort(() => 0.5 - Math.random()));
    };
    renderOption();
  }, []);

  const handleChoice = (index: number, value: string) => {
    function updateArrayAtIndex(status:string) {
        setSelected((selected) => selected.map((item, i) => 
          i === index ? status : item
        ))
      }
    if (value === data.word.word) {
        updateArrayAtIndex("correct");
        playCorrect()
        handleCorrect()
        return
    } else {
        updateArrayAtIndex("wrong");
        playWrong()
        return
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4">
      <h1 className="font-semibold text-3xl mb-12">{data.word.mean}</h1>
      <div className="grid grid-cols-2 mt-6 gap-6 w-full">
        {options.map((option: any, index: number) => (
          <div
            onClick={() => handleChoice(index, option)}
            key={option}
            className={cn(
              "border-[3px] relative hover:shadow-lg duration-300 p-2 rounded-full flex items-center gap-4 w-full cursor-pointer",
              selected[index] === "wrong" && "border-red-500 ",
              selected[index] === "correct" && "border-green-500 "
            )}
          >
            <div
              className={cn(
                "size-16 bg-stone-200 p-2 rounded-full flex items-center justify-center",
                selected[index] === "wrong" && "bg-red-500 text-white",
                selected[index] === "correct" && "bg-green-500 text-white"
              )}
            >
              <p className="font-bold text-3xl">
                {index === 0 && "A"}
                {index === 1 && "B"}
                {index === 2 && "C"}
                {index === 3 && "D"}
              </p>
              {selected[index] === "wrong" && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <IoClose className="size-6 text-red-500" />
                </div>
              )}
              {selected[index] === "correct" && (
                <div className="absolute top-1/2 right-4 -translate-y-1/2">
                  <FaCheck className="size-6 text-green-500" />
                </div>
              )}
            </div>
            <p className="font-bold text-lg">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizOption;
