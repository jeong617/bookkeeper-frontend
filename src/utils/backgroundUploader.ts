import { useEffect } from 'react';
import { useFileStore } from '../store/store.tsx';
import { get } from '../api/api.ts';
import { AxiosResponse } from 'axios';
import { TTSUploadStatusType } from '../store/types.tsx';

export const checkFileStatus = async (fileId: string): Promise<TTSUploadStatusType> => {
  const response: AxiosResponse = await get({ url: `auth/api/tasks/${fileId}/status` });
  return response.data.status;
};

export const useBackgroundUploader = () => {
  const { files, updateFileStatus, getFilesByStatus } = useFileStore();
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const inProgressFiles = getFilesByStatus(TTSUploadStatusType.Progress);
      if (inProgressFiles.length === 0) {
        const pendingFiles = getFilesByStatus(TTSUploadStatusType.Pending);
        if (pendingFiles.length > 0) {
          const fileToProcess = pendingFiles[0];
          updateFileStatus(fileToProcess.id, TTSUploadStatusType.Progress);
          try {
            const response: AxiosResponse = await get({
              url: `auth/api/tasks/${fileToProcess.id}/status`,
            });
            if (response.data.status === TTSUploadStatusType.Completed) {
              updateFileStatus(fileToProcess.id, TTSUploadStatusType.Completed);
            } else if (response.data.status === TTSUploadStatusType.Failed) {
              updateFileStatus(fileToProcess.id, TTSUploadStatusType.Progress);
            }
          } catch (err) {
            console.error(err);
            updateFileStatus(fileToProcess.id, TTSUploadStatusType.Pending);
          }
        }
      } else {
        try {
          const response: AxiosResponse = await get({
            url: `auth/api/tasks/${inProgressFiles[0].id}/status`
          })
          if (response.data.status === TTSUploadStatusType.Completed) {
            updateFileStatus(inProgressFiles[0].id, TTSUploadStatusType.Completed);
          } else if (response.data.status === TTSUploadStatusType.Failed) {
            updateFileStatus(inProgressFiles[0].id, TTSUploadStatusType.Progress);
          }
        } catch (err) {
          console.error(err);
          updateFileStatus(inProgressFiles[0].id, TTSUploadStatusType.Pending);
        }
      }
    }, 5000); // 10초 간격
    return () => clearInterval(intervalId);
  }, [files, updateFileStatus, getFilesByStatus]);
};