"use client";
import { getLessionsFromDB } from "@/actions/lesson";
import CardLesson from "@/components/layouts/admin/card-lesson";
import Loading from "@/components/ui/loading";
import { useLessonStore } from "@/stores/lessonStore";
import Link from "next/link";
import React, { use, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

function LessonPage() {
  const listLesson = useLessonStore((state: any) => state.listLesson);
  const getListLesson = useLessonStore((state: any) => state.getListLesson);
  const status = useLessonStore((state: any) => state.status);
  const setStatus = useLessonStore((state: any) => state.setStatus);

  useEffect(() => {
    const get = async () => {
      const q = await getLessionsFromDB();
      getListLesson(q);
      setStatus("success");
    };
    get();
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Quản lý bài học</h1>
        <Link
          href={"/admin/lessons/add"}
          className="bg-sky-600 text-white rounded-md px-4 py-2 flex items-center gap-2
          hover:bg-sky-700 duration-300"
        >
          <FaPlus />
          Thêm bài học mới
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {listLesson.map((lesson: any) => (
          <CardLesson key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}

export default LessonPage;
