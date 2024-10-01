"use client";
import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { IoMdAdd } from "react-icons/io";
import { useTopicStore } from "@/stores/topicStore";
import useCurrentDateTime from "@/hooks/useTime";
import toast from "react-hot-toast";
import { addTopicIntoDB } from "@/actions/topics";
import { UploadButton } from "./uploadthing";
import { addWordIntoDB, TWord } from "@/actions/words";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TTopic } from "@/app/admin/topics/page";
import { useWordStore } from "@/stores/wordStore";

function AddWord() {
  const [isShow, setIsShow] = useState(false);
  const [newWord, setNewWord] = useState<TWord>({
    word_id: "",
    topic_id: "",
    mean: "",
    word: "",
    audio: "",
    created_at: "",
    example: "",
    transcription: "",
    id: 0,
  });
  const currentDateTime = useCurrentDateTime();
  const addWord = useWordStore((state: any) => state.addWord);
  const listTopic = useTopicStore((state: any) => state.listTopic);
  const listWord = useWordStore((state: any) => state.listWord);

  const handleAddNewWord = async () => {
    const id = String(Math.floor(Math.random() * 100000))
    if (
      newWord.word.trim() === "" ||
      newWord.mean.trim() === "" ||
      newWord.example.trim() === "" ||
      newWord.topic_id.trim() === "" ||
      newWord.audio.trim() === "" || 
      newWord.transcription.trim() === ""
    ) {
      toast.error("Nhập chưa đầy đủ thông tin !");
      return;
    }
    const request = await addWordIntoDB({
      ...newWord,
      created_at: currentDateTime,
      word_id: id,
      id: listWord.length + 1
    });
    if (request.status === 200) {
      addWord({
        ...newWord,
        word_id: id,
        created_at: currentDateTime,
        id: listWord.length + 1
      });
      setIsShow(false);
      toast.success("Đã thêm chủ đề !");
      return;
    } else {
      toast.error("Lưu không thành công !");
    }
  };
  return (
    <>
      <Button
        onClick={() => setIsShow(true)}
        className="bg-sky-600 hover:bg-sky-500 duration-300"
      >
        <IoMdAdd className="mr-2 text-lg" /> Thêm từ vựng
      </Button>
      <AnimatePresence>
        {isShow && (
          <div
            className="bg-black/30 fixed top-0 left-0 right-0 bottom-0 
      flex items-center justify-center z-50"
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
              className="bg-white p-4 z-[10000] max-w-lg w-full 
      rounded-lg shadow-lg"
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">Thêm từ vựng mới</h2>
                <p className="text-sm">
                  Các chủ đề phải biến thức gữp nhất trong bài thi tiếng Anh B1.{" "}
                </p>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Từ vựng:
                    </label>
                    <input
                      value={newWord.word}
                      onChange={(e) =>
                        setNewWord({ ...newWord, word: e.target.value })
                      }
                      type="text"
                      className="border rounded-lg p-2"
                      placeholder="Từ vựng..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Phiêm âm:
                    </label>
                    <input
                      value={newWord.transcription}
                      onChange={(e) =>
                        setNewWord({ ...newWord, transcription: e.target.value })
                      }
                      type="text"
                      className="border rounded-lg p-2"
                      placeholder="Phiên âm..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Nghĩa từ vựng:
                    </label>
                    <input
                      value={newWord.mean}
                      onChange={(e) =>
                        setNewWord({ ...newWord, mean: e.target.value })
                      }
                      type="text"
                      className="border rounded-lg p-2"
                      placeholder="Nghĩa từ vựng..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Câu ví dụ:
                    </label>
                    <input
                      value={newWord.example}
                      onChange={(e) =>
                        setNewWord({ ...newWord, example: e.target.value })
                      }
                      type="text"
                      className="border rounded-lg p-2"
                      placeholder="Câu ví dụ..."
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Chọn chủ đề:
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setNewWord({ ...newWord, topic_id: value })
                      }
                    >
                      <SelectTrigger className="w-[320px]">
                        <SelectValue placeholder="Chọn chủ đề" />
                      </SelectTrigger>
                      <SelectContent>
                        {listTopic.map((topic: TTopic) => (
                          <SelectItem value={topic.topic_id}>
                            {topic.topic_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Tải file âm thanh: </p>
                    <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        toast.success("Đã thêm file !");
                        setNewWord({
                          ...newWord,
                          audio: res[0].url,
                        });
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </div>
                  <Button onClick={handleAddNewWord}>Thêm mới</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddWord;
