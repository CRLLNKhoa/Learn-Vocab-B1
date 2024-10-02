"use client";
import SelectTopic from "@/components/ui/select-topic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Checkbox } from "@/components/ui/checkbox";
import { addLessonToDB, TLesson } from "@/actions/lesson";
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

function AddPage() {
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
    lesson_image: "",
  });
  const [listWord, setListWord] = useState<TWord[]>([]);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const get = async () => {
      const request = await getWordByIDTopic(lesson.topic_id);
      setListWord(request);
    };
    get();
  }, [lesson.topic_id]);

  const handleSelectWord = (isSelect: boolean, word: TWord) => {
    if (isSelect) {
      setLesson({ ...lesson, lesson_word: [...lesson.lesson_word, word] });
    } else {
      setLesson({
        ...lesson,
        lesson_word: lesson.lesson_word.filter((item) => item !== word),
      });
    }
  };

  useEffect(() => {
    function transformWordsToQuestions(words: TWord[]): TQuestion[] {
      let newQuestions: TQuestion[] = [];
      let idCounter = 1; // Đếm ID cho các câu hỏi mới

      words.forEach((word) => {
        // Tạo 3 câu hỏi mới từ mỗi từ
        for (let i = 1; i <= 3; i++) {
          const newQuestion: TQuestion = {
            id: idCounter++, // Tăng ID cho mỗi câu hỏi mới
            type: i === 1 ? "new" : i === 2 ? "typing" : "options",
            word: word,
          };
          newQuestions.push(newQuestion);
        }
      });

      return newQuestions;
    }

    const get = () => {
      const q = transformWordsToQuestions(lesson.lesson_word);
      setLesson({ ...lesson, lesson_content: q });
    };
    get();
  }, [lesson.lesson_word]);

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

  const currentDateTime = useCurrentDateTime();
  const addLesson = useLessonStore((state: any) => state.addLesson);
  
  const handleSave = async () => {
    const id = Math.random().toString(36).substring(2, 9);
    const time = currentDateTime;
    if (
      lesson.lesson_name === "" &&
      lesson.lesson_description === "" &&
      lesson.lesson_content.length === 0
    ) {
      toast.error("Vui lòng nhập đầy đủ thông tin !");
      return;
    }
    const request = await addLessonToDB({
      ...lesson,
      lesson_id: id,
      lesson_created_at: time,
    });
    if (request?.status === 200) {
      addLesson({
        ...lesson,
        lesson_id: id,
        lesson_created_at: time,
      });
      setLesson({
        lesson_id: "",
        lesson_index: 0,
        topic_id: "",
        lesson_name: "",
        lesson_description: "",
        lesson_status: false,
        lesson_content: [],
        lesson_created_at: "",
        lesson_word: [],
      })
      toast.success("Thêm bài học thành công !");
    } else {
      toast.error("Thêm bài học thất bại !");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link href={"/admin/lessons"}
          className="bg-sky-600 text-white rounded-md size-10 cursor-pointer
        flex items-center justify-center gap-2 hover:bg-sky-700 duration-300"
        >
          <IoArrowBackOutline className="size-6" />
        </Link>
        <h1 className="font-bold text-xl">Thêm mới bài học</h1>
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

        <div className="flex flex-col">
          <p className="font-semibold">Ảnh đại diện: </p>
          <input
            value={lesson.lesson_image}
            onChange={(e) =>
              setLesson({ ...lesson, lesson_image: e.target.value })
            }
            type="text"
            className="border rounded-md px-4 py-2 outline-none"
            placeholder="Nhập ..."
          />
        </div>

        <div className="flex flex-col">
          <p className="font-semibold">Chủ đề: </p>
          <SelectTopic lesson={lesson} setLesson={setLesson} />
        </div>

        <div className="flex flex-col">
          <p className="font-semibold">Danh sách từ vựng: </p>
          {lesson.topic_id === "" ? (
            <p className="text-red-500">Vui lý chọn chủ đề</p>
          ) : (
            <div className="flex gap-2 items-center flex-wrap pt-2">
              {listWord.map((item: TWord) => (
                <div
                  key={item.word_id}
                  className="flex items-center gap-2 bg-sky-600/60 px-2 rounded-sm
                 text-white cursor-pointer"
                >
                  <Checkbox
                    id={item.word_id}
                    onCheckedChange={(e: any) => handleSelectWord(e, item)}
                  />
                  <label htmlFor={item.word_id}>{item.word}</label>
                </div>
              ))}
            </div>
          )}
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

      <Button disabled={isLoading} onClick={handleSave} className="mt-4">{isLoading ? "Đang thêm dữ liệu" : "Tạo bài học"}</Button>
    </div>
  );
}

export default AddPage;
