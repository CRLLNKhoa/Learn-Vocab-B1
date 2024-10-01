"use client";
import React, { useState } from "react";
import { LiaLightbulbSolid } from "react-icons/lia";
import { HiCheck } from "react-icons/hi";
import useSound from "use-sound";
import { cn } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { AiFillSound } from "react-icons/ai";

const Type = ({
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
  const q = word;
  const [value, setVaue] = useState("");
  const [status, setStatus] = useState<string>("none");
  const [scoreOfQuestion,setScoreOfQuestion] = useState(100)
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handleCheck = () => {
    if (value.toLowerCase() === q.toLowerCase()) {
      setStatus("true");
      playAudio();
      handleNext();
      setScore(score + scoreOfQuestion);
      return;
    }
    if (value.toLowerCase() !== q.toLowerCase()) {
      setStatus("false");
      toast.error("Đáp án chưa chính xác !");
      return;
    }
  };

  function handleHint() {
    let correctWord = "";
    if(scoreOfQuestion > 0){
      setScoreOfQuestion(scoreOfQuestion - 10)
    }
    // Duyệt qua từng ký tự trong chuỗi kết quả
    for (let i = 0; i < q.length; i++) {
      // So sánh ký tự tương ứng với chuỗi đầu vào
      if (value[i] === q[i]) {
        correctWord += value[i]; // Nếu đúng, thêm ký tự vào từ đúng
      } else {
        console.log(`Từ đã đúng: "${correctWord}"`); // In ra từ đã đúng
        setVaue(`${correctWord}${q[i]}`);
        break; // Ngừng vòng lặp khi gặp ký tự sai
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Nhập bản dịch chính xác</p>
      <h1 className="text-center text-3xl font-semibold my-4">{meaing}</h1>
      <input
        disabled={status === "true"}
        value={value}
        onChange={(e) => setVaue(e.target.value)}
        type="text"
        className={cn(
          "w-full h-16 rounded-lg shadow-lg px-4 border-2 border-sky-500 outline-none text-xl",
          status === "true" && "bg-green-500/40 border-green-500",
          status === "false" && "bg-red-500/40 border-red-500"
        )}
      />
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={handleHint}
          className="w-32 gap-2 h-12 rounded-lg shadow-lg border text-black flex 
            items-center justify-center"
        >
          <LiaLightbulbSolid className="size-6" />
          Gợi ý
        </button>
        {status !== "true" && (
          <button
            onClick={() => handleCheck()}
            className="w-32 gap-2 h-12 rounded-lg shadow-lg bg-sky-500 duration-300 hover:bg-sky-600 border text-white flex 
              items-center justify-center"
          >
            <HiCheck className="size-6" />
            Kiểm tra
          </button>
        )}
        {status === "true" && (
          <button
            onClick={() => playAudio()}
            className="w-32 gap-2 h-12 rounded-lg shadow-lg bg-green-500 duration-300 hover:bg-green-600 border text-white flex 
            items-center justify-center"
          >
            <AiFillSound className="size-6" />
            Nghe lại
          </button>
          
        )}
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

export default Type;
