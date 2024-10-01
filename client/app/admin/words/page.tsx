"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Empty from "@/components/ui/empty";
import { useWordStore } from "@/stores/wordStore";
import Loading from "@/components/ui/loading";
import ListWord from "@/components/layouts/admin/list-word";
import AddWord from "@/components/ui/add-word";
import { useTopicStore } from "@/stores/topicStore";
import { TTopic } from "../topics/page";
import { useRouter } from "next/navigation";
import { getWordByIDTopic } from "@/actions/words";
import { getTopicsFromDB } from "@/actions/topics";

function WordsPage() {
  const listWord = useWordStore((state: any) => state.listWord);
  const getlistWord = useWordStore((state: any) => state.getlistWord);
  const getListTopic = useTopicStore((state: any) => state.getListTopic);
  const setStatus = useWordStore((state: any) => state.setStatus);
  const status = useWordStore((state: any) => state.status);
  const [listTopic, setListTopic] = useState<TTopic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<any>();

  useEffect(() => {
    const get = async () => {
      const request = await getTopicsFromDB();
      getListTopic(request);
      setListTopic(request);
      setStatus("none");
    };
    get();
  }, []);

  useEffect(() => {
    setStatus("loading");
    const get = async () => {
      const request = await getWordByIDTopic(currentTopic);
      getlistWord(request);
      setStatus("success");
    };
    if (currentTopic) {
      get();
    }
  }, [currentTopic]);

  if (listTopic.length === 0) {
    return <div className="flex items-center justify-center h-64">
      <Loading />
    </div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">Quản lý từ vựng</h1>
        <AddWord />
      </div>
      <div className="flex items-center">
        <Select onValueChange={(value) => setCurrentTopic(value)}>
          <SelectTrigger className="w-[320px]">
            <SelectValue placeholder="Chọn chủ đề" />
          </SelectTrigger>
          <SelectContent>
            {listTopic.map((topic: TTopic) => (
              <SelectItem value={topic.topic_id}>{topic.topic_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {status === "loading" ? (
        <div className="flex items-center justify-center h-64 z-0">
          <Loading />
        </div>
      ) : listWord.length > 0 && status !== "none" ? (
        <ListWord data={listWord} />
      ) : (
        <div className="flex items-center justify-center h-64">
          <Empty />
        </div>
      )}
    </div>
  );
}

export default WordsPage;
