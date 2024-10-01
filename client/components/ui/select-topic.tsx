"use client";
import { getTopicsFromDB } from "@/actions/topics";
import { TTopic } from "@/app/admin/topics/page";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { TLesson } from "@/actions/lesson";

function SelectTopic({lesson, setLesson}: {lesson: TLesson, setLesson: (value: TLesson) => void}) {
  const [listTopic, setListTopic] = useState<TTopic[]>([]);

  useEffect(() => {
    const get = async () => {
      const request = await getTopicsFromDB();
      setListTopic(request);
    };
    get();
  }, []);


  return <div className="">
      <Select disabled={listTopic.length === 0} onValueChange={(value) => setLesson({...lesson,topic_id:value})}>
          <SelectTrigger className="w-[320px]">
            <SelectValue placeholder="Chọn chủ đề" />
          </SelectTrigger>
          <SelectContent>
            {listTopic.map((topic: TTopic) => (
              <SelectItem key={topic.topic_id} value={topic.topic_id}>{topic.topic_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
  </div>;
}

export default SelectTopic;
