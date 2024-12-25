import { create } from 'zustand'
import { TTSUploadStatusType } from './types.tsx';

interface SideBarState {
  isOpened: boolean;
  toggleIsOpened: () => void;
}

interface FileUploadData {
  id: string;
  novelTitle: string;
  episodeTitle: string;
  status: TTSUploadStatusType;
}

interface FileStore {
  files: FileUploadData[];
  addFile: (file: FileUploadData) => void;
  loadFiles: () => void;
  updateFileStatus: (id: string, status: TTSUploadStatusType) => void;
  getFilesByStatus: (status: TTSUploadStatusType) => FileUploadData[];
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
  files: JSON.parse(localStorage.getItem('files') || '[]'),
  addFile: (file) => {
    set((state) => {
      const updatedFiles = [...state.files, file];
      localStorage.setItem('files', JSON.stringify(updatedFiles)); // 로컬 스토리지에 저장
      return { files: updatedFiles };
    });
  },
  loadFiles: () => {
    const storedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    set({ files: storedFiles });
  },
  updateFileStatus: (id, status) =>
    set((state) => {
      const updatedFiles = state.files.map((file) =>
        file.id === id ? { ...file, status } : file
      );
      localStorage.setItem('files', JSON.stringify(updatedFiles)); // 변경된 상태를 localStorage에 반영
      return { files: updatedFiles };
    }),
  getFilesByStatus: (status) => get().files.filter((file) => file.status === status),
}));