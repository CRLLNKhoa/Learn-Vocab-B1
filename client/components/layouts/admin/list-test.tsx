"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "react18-json-view/src/style.css";
import { fetchTestData, saveTestData, TTest } from "@/actions/test";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ListTest() {
  const [text, setText] = useState("");
  const [array, setArray] = useState<any>([]);
  const [slug, setSlug] = useState("");
  const [isConvert, setIsConvert] = useState(false);
  const [listTest, setListTest] = useState<TTest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    const textArray = text.split("\n").map((line) => {
      const parts = line.trim().split("-");

      if (parts.length === 6) {
        let parsedAnswer;
        try {
          // Cố gắng chuyển đổi chuỗi answer thành mảng bằng JSON.parse
          parsedAnswer = JSON.parse(parts[5]);
        } catch (error) {
          // Nếu không thành công, sử dụng chuỗi ban đầu
          parsedAnswer = parts[5];
        }

        return {
          id: parts[0],
          type: parts[1],
          word: parts[2],
          meaning: parts[3],
          next: false,
          audio: parts[4],
          answer: parsedAnswer, // Giá trị "answer" có thể là mảng hoặc chuỗi tùy thuộc vào đầu vào
        };
      } else {
        return {
          id: "",
          type: "",
          word: "",
          meaning: "",
          next: false,
          audio: "",
          answer: [],
        };
      }
    });
    setArray(textArray);
    setIsConvert(true);
  };

  const handleSave = async () => {
    if (slug !== "" && array) {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const result = await saveTestData({
        id: `test${Math.random() * 9999999}`,
        slug,
        content: array,
        created_at: `${day}/${month}/${year}`,
      });
      if (result.status === 200) {
        toast.success(result.mess);
        setSlug("");
        setArray([]);
      } else {
        toast.success(result.mess);
      }
    } else {
      setIsConvert(false);
      toast.error("Nhập thiếu thông tin !");
    }
  };

  useEffect(() => {
    const getTests = async () => {
      try {
        const testData = await fetchTestData();
        setListTest(testData);
      } catch (err) {
        setError("Tải dữ liệu thất bại !");
      } finally {
        setLoading(false);
      }
    };

    getTests();
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-2">
      <h1 className="font-bold text-xl">Danh sách bài học</h1>
      <p className="-translate-y-3">Thống kê các bài học tiếng Anh B1.</p>
      <div className="flex items-center">
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-sky-500 text-white w-[200px] h-10 rounded-lg ml-auto">
              Thêm mới
            </button>
          </DialogTrigger>
          <DialogContent className="w-[1200px]">
            <DialogHeader>
              <DialogTitle>Thêm bài học mới</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col overflow-y-auto gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-bold">Slug</p>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  type="text"
                  className="border rounded-sm outline-none px-4 py-1"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-bold">Nội dung</p>
                <textarea
                  value={text}
                  onChange={(e: any) => setText(e.target.value)}
                  name="content"
                  id="content"
                  className="border outline-none p-4 rounded-lg min-h-64"
                  placeholder="id-loại-từ-nghĩa-audio-options"
                ></textarea>
                <div className="flex items-center gap-4 justify-end">
                  <button
                    onClick={handleConvert}
                    className="bg-sky-600 h-12 w-[200px] rounded-lg text-white mt-6"
                  >
                    Convert to Array
                  </button>
                  <button
                    disabled={isConvert === false}
                    onClick={handleSave}
                    className={cn(
                      " h-12 w-[200px] bg-slate-400 rounded-lg text-white mt-6",
                      isConvert && "bg-sky-600"
                    )}
                  >
                    Lưu lại
                  </button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {loading && <div className="flex gap-2 items-center justify-center h-[300px]"><AiOutlineLoading3Quarters className="size-16 animate-spin" /></div>}
      {error && <p className="text-center my-8">{error}</p>}
      <div className="flex flex-col gap-2">
        {
            listTest.map((item) => (
                <div key={item.id} className="grid grid-cols-3 border-b py-2">
                <p className="font-bold">-{item.slug}</p>
                <p>{item.created_at}</p>
                <div className="flex items-center justify-end">
                    <button className="bg-red-500 py-1 w-28 rounded-sm text-white">Xóa</button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}

export default ListTest;
