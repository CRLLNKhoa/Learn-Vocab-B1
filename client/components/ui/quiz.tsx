"use client";
import { TQuestion } from "@/types/questions";
import React from "react";
import QuizOption from "./quiz-option";
import QuizTyping from "./quiz-typing";
import QuizNew from "./quiz-new";
import { motion } from "framer-motion";

function Quiz({
  data,
  next,
  index,
  currentIndex,
  handleCorrect,
}: {
  data: TQuestion;
  next: () => void;
  currentIndex: number;
  index: number;
  handleCorrect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full flex-1 flex items-center justify-center"
    >
      {data.type === "new" && (
        <QuizNew data={data} next={next} handleCorrect={handleCorrect} />
      )}
      {data.type === "options" && (
        <QuizOption data={data} handleCorrect={handleCorrect} />
      )}
      {data.type === "typing" && (
        <QuizTyping data={data} next={next} handleCorrect={handleCorrect} />
      )}
    </motion.div>
  );
}

export default Quiz;
