"use client";
import { cn } from "@/lib/utils";
import { TQuestion } from "@/types/questions";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import useSound from "use-sound";

function QuizTyping({ data, next,handleCorrect }: { data: TQuestion; next: () => void, handleCorrect: () => void }) {
    const [isWrong,setIsWrong] = useState(false)
    const [inputValue,setInputValue] = useState("")
    const soundCorrect = '/sound/correct.mp3';
    const soundWrong = '/sound/wrong.mp3';
    const [playCorrect] = useSound(soundCorrect);
    const [playWrong] = useSound(soundWrong);

    const handleCheck = () => {
      if (inputValue.toLowerCase().trim() === data.word.word.toLowerCase()) {
        setIsWrong(false);
        playCorrect();
        handleCorrect();
        return;
      }
      if (inputValue.toLowerCase().trim() !== data.word.word.toLowerCase()) {
        setIsWrong(true);
        playWrong();
        return;
      } 
    }

    function handleHint() {
        let correctWord = "";
       
        // Duyệt qua từng ký tự trong chuỗi kết quả
        for (let i = 0; i < data.word.word.length; i++) {
          // So sánh ký tự tương ứng với chuỗi đầu vào
          if (inputValue[i] === data.word.word[i]) {
            correctWord += inputValue[i]; // Nếu đúng, thêm ký tự vào từ đúng
          } else {
            console.log(`Từ đã đúng: "${correctWord}"`); // In ra từ đã đúng
            setInputValue(`${correctWord}${data.word.word[i]}`);
            break; // Ngừng vòng lặp khi gặp ký tự sai
          }
        }
      }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-8">
      <h1 className="text-3xl font-semibold">Dịch "{data.word.mean}"</h1>
      <div className={cn("bg-stone-100 border-2 w-full h-32 rounded-lg overflow-hidden",
        isWrong ? "border-red-500" : "border-sky-500"
      )}>
        <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          className="w-full h-full bg-transparent p-4 outline-none 
        text-xl font-medium"
        />
      </div>
      <div className="flex items-center justify-end gap-4">
      <button onClick={handleHint} className="bg-sky-500 px-4 py-2 rounded-lg 
        text-white w-[120px] font-semibold
        flex items-center gap-2 justify-center hover:bg-sky-600 duration-300">
          <LuSearch className="mr-auto text-xl" /> <p className="flex-1">Gợi ý</p>
        </button>
        <button onClick={handleCheck} className="bg-green-500 px-4 py-2 rounded-lg 
        text-white w-[160px] font-semibold
        flex items-center gap-2 justify-center hover:bg-green-600 duration-300">
          <FaCheck className="mr-auto text-xl" /> <p className="flex-1">Kiểm tra</p>
        </button>
      </div>
    </div>
  );
}

export default QuizTyping;
