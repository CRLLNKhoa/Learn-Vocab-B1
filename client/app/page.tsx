"use client";
import { getLessionsFromDB, TLesson } from "@/actions/lesson";
import { getTopicsFromDB } from "@/actions/topics";
import Info from "@/components/layouts/info";
import Topics from "@/components/layouts/topics";
import { useHomepageStore } from "@/stores/homepage";
import { useEffect, useState } from "react";

export default function Home() {
  const getListTopicHomePage = useHomepageStore((state:any) => state.getListTopicHomePage)
  const getListLessonHomePage = useHomepageStore((state:any) => state.getListLessonHomePage)
  const [dataRender, setDataRender] = useState<any>([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const get = async () => {
      const list_topic = await getTopicsFromDB()
      const list_lesson = await getLessionsFromDB()
      getListTopicHomePage(list_topic)
      getListLessonHomePage(list_lesson)

      const mergedData = list_topic.map(topic => {
        const lessonsForTopic = list_lesson.filter((lesson: TLesson) => lesson.topic_id === topic.topic_id);
        return { ...topic, lessons: lessonsForTopic };
      });

      setDataRender(mergedData);
    }
    get()
  },[])

  return (
    <main className="grid grid-cols-3 gap-4 p-8 mt-4 bg-white rounded-lg shadow-lg">
      <div className="col-span-2">
        <Topics data={dataRender} />
      </div>
      <div>
        <Info />
      </div>
    </main>
  );
}
