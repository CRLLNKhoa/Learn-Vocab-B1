import { deleteLessonDB, TLesson } from "@/actions/lesson";
import { Button } from "@/components/ui/button";
import { useLessonStore } from "@/stores/lessonStore";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";

function CardLesson({ lesson }: { lesson: TLesson }) {
  const router = useRouter();
  const removeLesson = useLessonStore((state: any) => state.removeLesson);
  const goEdit = () => {
    router.push(`/admin/lessons/edit?data=${JSON.stringify(lesson)}`);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Bạn có muốn xoá bài học này ?");
    if (confirmDelete) {
      const request = await deleteLessonDB(String(lesson.lesson_id));
      if (request.status === "success") {
        toast.success("Delete lesson successfully !");
        removeLesson(lesson.lesson_id);
      } else {
        toast.error("Delete lesson failed !");
      }
    }
  };
  return (
    <div className="shadow-lg rounded-lg flex flex-col p-4">
      <h1 className="font-bold">{lesson.lesson_name}</h1>
      <div className="flex flex-col">
        <p>Chủ đề: {lesson.lesson_topic?.topic_name}</p>
        <p>Số từ: {lesson.lesson_word.length}</p>
      </div>
      <div className="flex items-center gap-2 justify-end">
        <button
          onClick={goEdit}
          className="border rounded-lg w-16 py-1 
        border-orange-600 text-orange-600 flex items-center 
        justify-center hover:bg-orange-600 hover:text-white  duration-300"
        >
          <CiEdit className="size-6" />
        </button>
        <button onClick={handleDelete}
          className="border rounded-lg w-16 py-1 
        border-red-600 text-red-500 flex items-center 
        justify-center hover:bg-red-600 hover:text-white  duration-300"
        >
          <AiOutlineDelete className="size-6" />
        </button>
      </div>
    </div>
  );
}

export default CardLesson;
