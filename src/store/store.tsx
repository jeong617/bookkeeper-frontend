import { create } from 'zustand'
import axios, {AxiosResponse} from 'axios';
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

interface LayoutState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

interface RoleState {
  role: string | null;
  setRole: (newRole: string) => void;
  getRole: () => Promise<void>;
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

export const useLayoutStore = create<LayoutState>((set) => ({
  isMobile: window.innerWidth < 768,
  setIsMobile: (isMobile: boolean) => set({isMobile}),
}));

export const useRoleStore = create<RoleState>((set) => ({
  role: null,
  setRole: (newRole) => set({ role: newRole }),
  getRole: async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${import.meta.env.VITE_API_URL_NGROK}auth/me`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        }
        );
      set({ role: response.data.data });
      return response.data.data;  // ADMIN || AUTHOR
    } catch (error) {
      alert('내 역할 가져오기 실패' + error);
      return null;
    }
  },
}));