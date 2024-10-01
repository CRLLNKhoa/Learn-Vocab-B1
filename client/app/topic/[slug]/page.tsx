"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import vocab from "@/jsons/vocab.json";
import { useRouter } from "next/navigation";

const getTopic = (slug: string) => {
  // Chuyển chuỗi thành một mảng các số
  const numbers = slug.match(/\d+/g)?.map(Number);

  if (!numbers) {
    return console.log("Chuỗi sai !"); // Nếu không có số nào trong chuỗi, trả về một đối tượng rỗng
  }

  if (numbers[0] === 1) {
    return { current_topic: numbers, map_button: [2] };
  }

  if (numbers[0] > 16) {
    return {
      current_topic: numbers,
      map_button: [numbers[0] - 1],
    };
  }

  if (numbers[0] > 1) {
    return {
      current_topic: numbers,
      map_button: [numbers[0] - 1, numbers[0] + 1],
    };
  }
};

function TopicDetail({ params }: { params: { slug: string } }) {
  const [vocabs, setVocab] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const key = params.slug as keyof typeof vocab;
    const getvalue =  (key:any) => {
      return vocab[key as keyof typeof vocab];
    }
    setVocab(getvalue(key));
  }, [params.slug]);

  const handleChangeTopic = (item: number) => {
    router.push(`/topic/vocab-topic-${item}`);
  };

  return (
    <div className="flex flex-col pb-8">
      <div className="flex flex-col gap-4 mt-8">
        <div className="bg-white h-[180px] shadow-lg p-4 rounded-lg grid grid-cols-6">
          <div className="flex flex-col items-center select-none">
            <h2 className="font-semibold mb-2">
              Topic {getTopic(params.slug)?.current_topic?.toString()}
            </h2>
            <img src="/level3.png" alt="icon_level" className="w-16" />
          </div>
          <div className="col-span-5 flex flex-col justify-between">
            <h1 className="font-semibold text-xl">City (Thành Phố)</h1>
            <div className="h-5 bg-slate-200 w-full rounded-lg shadow-md relative mt-4">
              <div className="h-5 bg-black w-1/2 rounded-lg shadow-md"></div>
            </div>
            <div className="flex items-center mt-auto justify-between">
              <div className="flex items-center gap-4">
                {getTopic(params.slug)?.map_button?.map((item, index) => (
                  <Button onClick={() => handleChangeTopic(item)} variant={"outline"} key={item}>
                    {index === 0 && <MdKeyboardArrowLeft className="size-6" />}{" "}
                    Topic {item}
                    {index === 1 && <MdKeyboardArrowRight className="size-6" />}
                  </Button>
                ))}
              </div>
              <Button>
                Học ngay
                <FaPlay className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold pb-1 mb-4 text-lg text-end">
              Danh sách từ vựng
            </h2>
            <h2 className="font-semibold pb-1 mb-4 text-end">Số từ vựng: {vocabs?.length || 0}</h2>
          </div>
          <div className="flex flex-col gap-1">
            {vocabs?.map((item: any) => (
              <div className="grid grid-cols-2 border-b last:border-none py-2">
                <p className="font-semibold text-md">{item.word}</p>
                <p className="pl-4">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicDetail;
