import { TLesson } from '@/actions/lesson'
import { TTopic } from '@/app/admin/topics/page'
import { create } from 'zustand'

 export const useHomepageStore = create((set) => ({
  listTopicHomePage: [],
  listLessonHomePage: [],

  getListTopicHomePage: (newListTopic: TTopic[]) => set({ listTopicHomePage: newListTopic }),
  getListLessonHomePage: (newListLesson: TLesson[]) => set({ listLessonHomePage: newListLesson }),
}))
