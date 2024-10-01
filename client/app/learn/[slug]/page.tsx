"use client";
import { fetchTestBySlug } from "@/actions/test";
import NewVocab from "@/components/layouts/new-vocab";
import Options from "@/components/layouts/options";
import Type from "@/components/layouts/type";
import { cn } from "@/lib/utils";
import { question } from "@/types/questions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import { TbError404 } from "react-icons/tb";

const LearnPage = ({ params }: { params: { slug: string } }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const [test, setTest] = useState<question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();
  const [isNext,setIsNext] = useState(true)

  const handleNext = () => {
    setIsNext(true)
  };


  useEffect(() => {
    if(currentQuestion > 0 && test[currentQuestion].next !== true){
      setIsNext(false)
    }
  }, [currentQuestion])
  

  useEffect(() => {
    const get = async () => {
      try {
        const result = await fetchTestBySlug(params.slug);
        setTest(result.content);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    get();
  }, []);

  if (isLoading)
    return (
      <div className="mt-4 h-[500px] rounded-lg shadow-lg bg-white p-4 flex items-center justify-center flex-col">
        <AiOutlineLoading className="size-12 animate-spin mb-4 text-sky-500" />
        <p>Đang tải dữ liệu....</p>
      </div>
    );

  if (!isLoading && test.length === 0)
    return (
      <div className="mt-4 h-[500px] rounded-lg shadow-lg bg-white p-4 flex items-center justify-center flex-col">
        <TbError404 className="size-24 mb-4 text-sky-500" />
        <p>Không tìm thấy bài học</p>
      </div>
    );

  return (
    <div className="grid grid-cols-12 pb-8">
      <div className="col-span-12 bg-white h-16 shadow-sms flex items-center px-4 rounded-lg mt-4 gap-4">
        <Link
          href={"/"}
          className="hover:bg-sky-100 p-2 rounded-lg cursor-pointer duration-500"
        >
          <IoHomeOutline className="size-6 " />
        </Link>
        <h1 className="text-xl font-semibold">Hobbles (Sở thích)</h1>
      </div>
      {!complete && (
        <>
          <div className="col-span-10 flex flex-col mt-4 p-4 rounded-lg shadow-lg bg-white gap-6">
            <div className="relative bg-slate-200 h-8 rounded-lg overflow-hidden">
              <span
                style={{ width: `${(currentQuestion / test.length) * 100}%` }}
                className="absolute duration-300 top-0 left-0 bottom-0 bg-sky-500"
              ></span>
            </div>
            {test[currentQuestion]?.type === "new" && !complete && (
              <NewVocab
                handleNext={handleNext}
                meaing={test[currentQuestion].meaning}
                word={test[currentQuestion].word}
                audio={test[currentQuestion].audio}
                score={score}
                setScore={setScore}
              />
            )}
            {test[currentQuestion]?.type === "type" && !complete && (
              <Type
                handleNext={handleNext}
                meaing={test[currentQuestion].meaning}
                word={test[currentQuestion].word}
                audio={test[currentQuestion].audio}
                score={score}
                setScore={setScore}
              />
            )}
            {test[currentQuestion]?.type === "option" && !complete && (
              <Options
                handleNext={handleNext}
                answer={test[currentQuestion].answer as string[]}
                word={test[currentQuestion].word}
                audio={test[currentQuestion].audio}
                score={score}
                setScore={setScore}
              />
            )}
          </div>
          <div className="ml-4 col-span-2 flex flex-col mt-4 gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-center bg-slate-200 rounded-full h-8">
              <span>{score}</span>
            </div>
            <button
              disabled={isNext === false}
              onClick={() => {
                if (currentQuestion < test.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                  return;
                }
                setComplete(true);
              }}
              className={cn(
                "bg-[#FFBB00] shadow-lg h-24 rounded-lg flex flex-col items-center justify-center font-bold border-b-4 border-[#b5880c] hover:scale-105 duration-500",
                isNext === false &&
                  "cursor-not-allowed bg-stone-200 border-stone-200"
              )}
            >
              <MdOutlineNavigateNext className="size-12" />
              Next
            </button>
          </div>
        </>
      )}
      {complete && (
        <div
          className="flex flex-col col-span-12 h-[240px] bg-white mt-4 p-4 rounded-lg 
      shadow-lg items-center justify-center"
        >
          <h1 className="text-xl font-semibold">Hoàn thành bài học</h1>
          <p>Bạn đã học được thêm {test.length} cụm từ mới</p>
          <button
            className="bg-[#FFBB00] shadow-lg h-12 w-[200px] mt-4 rounded-lg flex 
        flex-col items-center justify-center font-bold"
          >
            Học bài mới
          </button>
        </div>
      )}
    </div>
  );
};

export default LearnPage;
