import { create } from 'zustand'

interface SideBarState {
  isOpened: boolean;
  toggleIsOpened: () => void;
}

const useSideBarStore = create<SideBarState>((set) => ({
  isOpened: false,
  toggleIsOpened: () => {
    set((state) => ({
      isOpened: !state.isOpened,
    }))
  }
}))

export default useSideBarStore;