import { TTopic } from '@/app/admin/topics/page'
import { create } from 'zustand'

 export const useTopicStore = create((set) => ({
  listTopic: [],
  status: 'loading',
  setStatus: (newStatus: string) => set({ status: newStatus }),
  getListTopic: (newListTopic: TTopic[]) => set({ listTopic: newListTopic }),
  addTopic: (newTopic: TTopic) => set((state:any) => ({ listTopic: [...state.listTopic, newTopic] })),
  removeTopic: (topicId: string) => set((state:any) => ({ listTopic: state.listTopic.filter((topic:TTopic) => topic.topic_id !== topicId) })),
  updateTopic: (updatedTopic: TTopic) => set((state:any) => {
    const index = state.listTopic.findIndex((topic:TTopic) => topic.topic_id === updatedTopic.topic_id)
    if (index !== -1) {
      state.listTopic[index] = updatedTopic
    }
    return { listTopic: [...state.listTopic] }
  }),
}))
