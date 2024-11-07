import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000
})

// TODO: 로그인 기능 구현 후 요청 인터셉터 추가
// TODO: 상태코드 정한 후 응답 인터셉터 추가

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

const post = async <T>(url: string, data?: T): Promise<T> => {
  const response = await axios.post<T>(url, data);
  return response.data;
};

const put = async <T>(url: string, data?: T): Promise<T> => {
  const response = await axios.put<T>(url, data);
  return response.data;
};

const del = async <T>(url: string): Promise<T> => {
  const response = await axios.delete<T>(url);
  return response.data;
};

export { get, post, put, del };
export default api;