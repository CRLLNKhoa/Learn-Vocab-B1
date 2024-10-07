"use client";
import React, { useState } from "react";
import { LuCheckSquare } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";
import { TLesson } from "@/actions/lesson";
import { useRouter } from "next/navigation";

function CardLesson({ lesson }: { lesson: TLesson }) {
  const [isShow, setIsShow] = useState(false);
  const [isAllow,setIsAllow] = useState(true)
  const router = useRouter()

  return (
    <>
      <div
        onClick={() => setIsShow(true)}
        className="border p-4 rounded-lg flex items-center justify-between cursor-pointer hover:scale-[1.01] hover:shadow-md duration-300"
      >
        <div className="flex flex-col">
          <h1 className="text-xl mb-1 font-semibold">{lesson?.lesson_name}</h1>
          <p className="text-md font-semibold text-muted-foreground/80">
            {lesson?.lesson_description}
          </p>
        </div>

        <img
          className="size-[76px]"
          src={lesson?.lesson_image}
          alt=""
        />
      </div>
      <AnimatePresence>
        {isShow && (
          <div
            className="bg-black/20 fixed top-0 left-0 right-0 bottom-0 
        flex items-center justify-center"
          >
            <div
              onClick={() => {
                setIsShow(false);
              }}
              className="h-full w-full absolute"
            ></div>
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 z-50 h-[336px] max-w-lg w-full 
        rounded-lg shadow-lg flex flex-col items-center justify-center"
            >
              <img
                className="size-[96px] mb-4"
                src={lesson?.lesson_image}
                alt=""
              />
              <h1 className="text-xl font-semibold mb-2">{lesson?.lesson_name}</h1>
              <p className="text-md font-semibold text-muted-foreground">
              {lesson?.lesson_description}
              </p>
              <button onClick={() => {
                router.push(`/learn/${lesson?.lesson_id}`);
              }}
                className="flex items-center gap-4 mt-8 bg-sky-500 
            px-4 py-2 rounded-full w-[200px] h-12 text-white justify-center
            font-semibold hover:scale-105 duration-300 hover:bg-sky-400"
              >
                <LuCheckSquare className="size-5" />
                <p className="translate-y-[2px]">Học</p>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CardLesson;
