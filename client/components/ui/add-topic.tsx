"use client";
import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { IoMdAdd } from "react-icons/io";
import { useTopicStore } from "@/stores/topicStore";
import useCurrentDateTime from "@/hooks/useTime";
import toast from "react-hot-toast";
import { addTopicIntoDB } from "@/actions/topics";

function AddTopic() {
  const [isShow, setIsShow] = useState(false);
  const [topic_name, setTocpic_name] = useState("");
  const currentDateTime = useCurrentDateTime();
  const addTopic = useTopicStore((state: any) => state.addTopic);

  const handleAddTopic = async () => {
    const id = String(Math.floor(Math.random() * 100000));
    const index = new Date().getTime()

    if (topic_name.trim() === "") {
      toast.error("Nhập chưa đầy đủ thông tin !");
      return;
    }
    const request = await addTopicIntoDB({
      topic_name: topic_name,
      topic_id: id,
      topic_note: `Đã thêm vào lúc: ${currentDateTime}`,
      topic_status: true,
      topic_created_at: currentDateTime,
      topic_index: index
    });
    if (request.status === 200) {
      addTopic({
        topic_name: topic_name,
        topic_id: id,
        topic_note: `Đã thêm vào lúc: ${currentDateTime}`,
        topic_status: true,
        topic_created_at: currentDateTime,
        topic_index: index
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
        <IoMdAdd className="mr-2 text-lg" /> Thêm mới
      </Button>
      <AnimatePresence>
        {isShow && (
          <div
            className="bg-black/30 fixed top-0 left-0 right-0 bottom-0 
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
              className="bg-white p-4 z-[10000] max-w-lg w-full 
        rounded-lg shadow-lg"
            >
              <div className="flex flex-col">
                <h2 className="font-bold text-xl">Thêm chủ đề mới</h2>
                <p className="text-sm">
                  Các chủ đề phải biến thức gữp nhất trong bài thi tiếng Anh B1.{" "}
                </p>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="font-semibold">
                      Tên chủ đề:
                    </label>
                    <input
                      value={topic_name}
                      onChange={(e) => setTocpic_name(e.target.value)}
                      type="text"
                      className="border rounded-lg p-2"
                      placeholder="Tên chủ đề"
                    />
                  </div>
                  <Button onClick={handleAddTopic}>Thêm mới</Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddTopic;
