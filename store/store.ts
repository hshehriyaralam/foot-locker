import { create } from 'zustand'

export const useModalStore = create((set) => ({

    modal : false,
    toggleModal : () => set((state:any) => ({ modal : state.modal = !state.modal })),



  // count: 0,
  // increment: () => set((state) => ({ count: state.count + 1 })),
  // decrement: () => set((state) => ({ count: state.count - 1 })),
  // reset: () => set({ count: 0 }),
}))
