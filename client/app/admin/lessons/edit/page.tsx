"use client";
import SelectTopic from "@/components/ui/select-topic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { addLessonToDB, TLesson, updateLessonDB } from "@/actions/lesson";
import { getWordByIDTopic, TWord } from "@/actions/words";
import { closestCorners, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CardQuestion from "@/components/ui/card-question";
import { TQuestion } from "@/types/questions";
import { Button } from "@/components/ui/button";
import useCurrentDateTime from "@/hooks/useTime";
import toast from "react-hot-toast";
import { useLessonStore } from "@/stores/lessonStore";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/ui/loading";

function EditPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter();
  const [lesson, setLesson] = useState<TLesson>({
    lesson_id: "",
    lesson_index: 0,
    topic_id: "",
    lesson_name: "",
    lesson_description: "",
    lesson_status: false,
    lesson_content: [],
    lesson_created_at: "",
    lesson_word: [],
  });
  useEffect(() => {
    setLesson({
      ...lesson,
      lesson_name: JSON.parse(data!).lesson_name,
      lesson_description: JSON.parse(data!).lesson_description,
      lesson_status: JSON.parse(data!).lesson_status,
      lesson_content: JSON.parse(data!).lesson_content,
      lesson_created_at: JSON.parse(data!).lesson_created_at,
      lesson_word: JSON.parse(data!).lesson_word,
      lesson_id: JSON.parse(data!).lesson_id,
      lesson_topic: JSON.parse(data!).lesson_topic,
      lesson_index: JSON.parse(data!).lesson_index,
      topic_id: JSON.parse(data!).topic_id,
    })
  }, []);

  const getQuestionPosition = (id: number) => {
    return lesson.lesson_content.findIndex((question) => question.id === id);
  };
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const oldIndex = getQuestionPosition(Number(active.id));
    const newIndex = getQuestionPosition(Number(over.id));
    setLesson({
      ...lesson,
      lesson_content: arrayMove(lesson.lesson_content, oldIndex, newIndex),
    });
  };

  if(lesson.lesson_id === "") return <div className="flex items-center justify-center h-[400px]"><Loading /></div>

  const handleSave = async () => {
  setIsLoading(true)
    if(lesson.lesson_name === "" &&
        lesson.lesson_description === "" &&
        lesson.lesson_content.length === 0){
            toast.error("Nhập đầy đủ các trường !")
            return
        }
    const request = await updateLessonDB(lesson);
    if (request?.status === "success") {
      toast.success(request?.message);
      router.push("/admin/lessons");
      setIsLoading(false)
    } else {
      toast.error("Cập nhật dữ liệu không thành công !");
      setIsLoading(false)
    }
  }

  return  <div className="flex flex-col">
  <div className="flex items-center justify-between">
    <Link href={"/admin/lessons"}
      className="bg-sky-600 text-white rounded-md size-10 cursor-pointer
    flex items-center justify-center gap-2 hover:bg-sky-700 duration-300"
    >
      <IoArrowBackOutline className="size-6" />
    </Link>
    <h1 className="font-bold text-xl">Chỉnh sửa bài học</h1>
  </div>

  <div className="flex flex-col mt-4 gap-4">
    <div className="flex flex-col">
      <p className="font-semibold">Tên bài học: </p>
      <input
        value={lesson.lesson_name}
        onChange={(e) =>
          setLesson({ ...lesson, lesson_name: e.target.value })
        }
        type="text"
        className="border rounded-md px-4 py-2 outline-none"
        placeholder="Nhập ..."
      />
    </div>

    <div className="flex flex-col">
      <p className="font-semibold">Giới thiệu: </p>
      <input
        value={lesson.lesson_description}
        onChange={(e) =>
          setLesson({ ...lesson, lesson_description: e.target.value })
        }
        type="text"
        className="border rounded-md px-4 py-2 outline-none"
        placeholder="Nhập ..."
      />
    </div>

  </div>

  <div className="flex flex-col gap-2 mt-4">
    <h2 className="font-semibold">Nội dung bài học: </h2>
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="min-h-[200px] border border-dashed rounded-lg flex flex-col p-4 gap-2 overflow-hidden">
        <SortableContext
          items={lesson.lesson_content}
          strategy={verticalListSortingStrategy}
        >
          {lesson.lesson_content.map((item) => (
            <CardQuestion key={item.id} id={item.id} content={item} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  </div>

  <Button disabled={isLoading} onClick={handleSave} className="mt-4">{isLoading ? "Đang thêm dữ liệu" : "Lưu bài học"}</Button>
</div>
}

export default EditPage;
