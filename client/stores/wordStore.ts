import { TWord } from '@/actions/words'
import { TTopic } from '@/app/admin/topics/page'
import { create } from 'zustand'

 export const useWordStore = create((set) => ({
  listWord: [],
  status: 'none',
  setStatus: (newStatus: string) => set({ status: newStatus }),
  getlistWord: (newListWord: TTopic[]) => set({ listWord: newListWord }),
  addWord: (newTopic: TWord) => set((state:any) => ({ listWord: [...state.listWord, newTopic] })),
  removeWord: (wordId: string) => set((state:any) => ({ listWord: state.listWord.filter((topic:TWord) => topic.word_id !== wordId) })),
  updateWord: (updatedTopic: TWord) => set((state:any) => {
    const index = state.listWord.findIndex((word:TWord) => word.word_id === updatedTopic.word_id)
    if (index !== -1) {
      state.listWord[index] = updatedTopic
    }
    return { listWord: [...state.listWord] }
  }),
}))
