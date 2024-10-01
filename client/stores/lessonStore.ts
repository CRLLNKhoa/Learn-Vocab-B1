
import { TLesson } from '@/actions/lesson'
import { create } from 'zustand'

 export const useLessonStore = create((set) => ({
  listLesson: [],
  status: 'loading',
  setStatus: (newStatus: string) => set({ status: newStatus }),
  getListLesson: (newListLesson: TLesson[]) => set({ listLesson: newListLesson }),
  addLesson: (newLesson: TLesson) => set((state:any) => ({ listLesson: [...state.listLesson, newLesson] })),
  removeLesson: (topicId: string) => set((state:any) => ({ listLesson: state.listLesson.filter((topic:TLesson) => topic.lesson_id !== topicId) })),
  updateLesson: (updatedLesson: TLesson) => set((state:any) => {
    const index = state.listLesson.findIndex((topic:TLesson) => topic.topic_id === updatedLesson.topic_id)
    if (index !== -1) {
      state.listLesson[index] = updatedLesson
    }
    return { listLesson: [...state.listLesson] }
  }),
}))
