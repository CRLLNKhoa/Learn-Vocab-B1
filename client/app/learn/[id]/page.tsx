"use client";
import { getLessonById, TLesson } from "@/actions/lesson";
import Empty from "@/components/ui/empty";
import ListQuiz from "@/components/ui/list-quiz";
import Loading from "@/components/ui/loading";
import React, { useEffect, useState } from "react";

function LearnPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<TLesson>();
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState(false);
  const [questionAnswer, setQuestionAnswer] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    const get = async () => {
      const request = await getLessonById(params.id);
      if (request.status === "success") {
        setData(request.lesson);
        setLoading(false);
      }

      if (request.status === "error") {
        setIsError(true);
        setLoading(false);
      }
    };
    get();
  }, []);

  useEffect(() => {
    setLoading(true);
    const get = async () => {
      const request = await getLessonById(params.id);
      if (request.status === "success") {
        setData(request.lesson);
        setLoading(false);
      }

      if (request.status === "error") {
        setIsError(true);
        setLoading(false);
      }
    };
    get();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center h-[80vh] flex items-center justify-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col p-8 relative">
      <div className="flex items-center justify-between text-xl">
        <div className="flex items-center bg-stone-100  px-4 py-2 rounded-lg shadow-lg">
          <h1 className="font-semibold">{data?.lesson_name}</h1>
        </div>
        <span className="font-bold text-yellow-500">{questionAnswer+1}/{data?.lesson_content.length}</span>
      </div>
      <div className="flex-1 mt-4">
        <ListQuiz data={data?.lesson_content || []} setQuestionAnswer={setQuestionAnswer} />
      </div>
    </div>
  );
}

export default LearnPage;
