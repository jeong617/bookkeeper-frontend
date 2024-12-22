import { create } from 'zustand'
import { FileStateType } from './types.tsx';

interface SideBarState {
  isOpened: boolean;
  toggleIsOpened: () => void;
}

interface FileUploadData {
  id: string;
  title: string;
  episodeNum: number;
  status: FileStateType;
}

interface FileStore {
  files: FileUploadData[];
  addFile: (file: FileUploadData) => void;
  updateFileStatus: (id: string, status: FileStateType) => void;
  getPendingFiles: () => FileUploadData[];
}

export const useSideBarStore = create<SideBarState>((set) => ({
  isOpened: false,
  toggleIsOpened: () => {
    set((state) => ({
      isOpened: !state.isOpened,
    }))
  }
}))

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),
  updateFileStatus: (id, status) =>
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    })),
  getPendingFiles: () =>
    get().files.filter((file) => file.status === FileStateType.Pending),
}));