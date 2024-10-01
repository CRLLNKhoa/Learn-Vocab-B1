"use client";
import { deleteWordDB, TWord, updateWordDB } from "@/actions/words";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { Button } from "./button";
import { FaSave } from "react-icons/fa";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useWordStore } from "@/stores/wordStore";

function Word({ word, index }: { word: TWord; index: number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const updateWord = useWordStore((state:any) => state.updateWord);
  const removeWord = useWordStore((state:any) => state.removeWord);
  const [updateDate, setUpdateData] = useState<TWord>({
    word_id: word.word_id,
    word: word.word,
    transcription: word.transcription,
    mean: word.mean,
    example: word.example,
    topic_id: word.topic_id,
    audio: word.audio,
    created_at: word.created_at,
  });

  const handleEdit = async () => {
    setIsEditing(false);
    const request = await updateWordDB(updateDate);
    if (request.status === "success") {
      toast.success("Đã thay đổi dữ liệu !");
      updateWord(updateDate);
    }else{
      toast.error("Lỗi khi thay đổi dữ liệu !");
    }
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Xóa từ vựng này ?");
    if (confirm) {
        const request = await deleteWordDB(word.word_id);
        if (request.status === "success") {
          toast.success("Đã xóa dữ liệu !");
          removeWord(word.word_id);
        }else{
          toast.error("Lỗi khi xóa dữ liệu !");
        } 
    }
  }


  return (
    <div
      className="bg-white shadow-xl p-4 rounded-lg 
       flex flex-col items-center justify-between "
    >
      <div className="flex items-center justify-between w-full">
        <p>{index + 1}.</p>
        <p className="ml-4 font-bold">{word.word}</p>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={() => setIsOpen(!isOpen)} className=" size-10 flex items-center justify-center rounded-md hover:bg-orange-600/20 duration-300">
            <HiMiniChevronUpDown className="size-5 text-orange-600" />
          </button>
          <button onClick={() => setIsEditing(!isEditing)} className=" size-10 flex items-center justify-center rounded-md hover:bg-sky-600/20 duration-300">
            <CiEdit className="size-5 text-sky-600" />
          </button>
          <button onClick={handleDelete} className=" size-10 flex items-center justify-center rounded-md hover:bg-red-600/20 duration-300">
            <AiOutlineDelete className="size-5 text-red-600" />
          </button>
        </div>
      </div>
      <div className={cn("flex flex-col gap-2 w-full border-t p-4 mt-2", 
        isOpen && "scale-0 h-0 opacity-0 hidden",
      )}>
        <div className="flex items-center w-full gap-2">
          <p className="font-bold">Từ vựng: </p>
          {!isEditing ? (
            <p>{word.word}</p>
          ) : (
            <input
              value={updateDate.word}
              onChange={(e) =>
                setUpdateData({ ...updateDate, word: e.target.value })
              }
              type="text"
              className="border rounded-md px-4 py-2 flex-1"
              placeholder="Từ vựng..."
            />
          )}
        </div>
        <div className="flex items-center w-full gap-2">
          <p className="font-bold">Meaning: </p>
          {!isEditing ? (
            <p>{word.mean}</p>
          ) : (
            <input
              value={updateDate.mean}
              onChange={(e) =>
                setUpdateData({ ...updateDate, mean: e.target.value })
              }
              type="text"
              className="border rounded-md px-4 py-2 flex-1"
              placeholder="Nghĩa của từ..."
            />
          )}
        </div>
        <div className="flex items-center w-full gap-2">
          <p className="font-bold">Phiên âm: </p>
          {!isEditing ? (
            <p>{word.transcription}</p>
          ) : (
            <input
              value={updateDate.transcription}
              onChange={(e) =>
                setUpdateData({ ...updateDate, transcription: e.target.value })
              }
              type="text"
              className="border rounded-md px-4 py-2 flex-1"
              placeholder="Phiên âm..."
            />
          )}
        </div>
        <div className="flex items-center w-full gap-2">
          <p className="font-bold">Câu ví dụ: </p>
          {!isEditing ? <p>{word.example}</p> : <input
            value={updateDate.example}
            onChange={(e) =>
              setUpdateData({ ...updateDate, example: e.target.value })
            }
            type="text"
            className="border rounded-md px-4 py-2 flex-1"
            placeholder="Câu ví dụ..."
          />}
          
        </div>
        <div className="flex items-center w-full gap-2">
          <p className="font-bold">Audio: </p>
          {!isEditing ? <p className="flex-1">{word.audio}</p>: <input
            value={updateDate.audio}
            onChange={(e) =>
              setUpdateData({ ...updateDate, audio: e.target.value })
            }
            type="text"
            className="border rounded-md px-4 py-2 flex-1"
            placeholder="File âm thanh..."
          />}
          
        </div>
        {isEditing && <Button onClick={handleEdit} className="mt-2 flex items-center"><FaSave className="size-5 mr-2" /> Lưu lại từ vựng</Button>}
      </div>
    </div>
  );
}

export default Word;
