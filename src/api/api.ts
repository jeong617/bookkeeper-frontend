import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface RequestArgs<T = any> {
    url: string;
    headers?: AxiosRequestHeaders,
    data?: T;
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_NGROK,
    // baseURL: import.meta.env.VITE_API_URL,
    headers: {},
    withCredentials: true,
    timeout: 5000,
});

// 요청 인터셉터: token 설정 추가
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
      const token: string | null = localStorage.getItem('accessToken');
      if (token) {
          config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

// 응답 인터셉터: token 만료 시 token 갱신 또는 재로그인 유도
api.interceptors.response.use(
  (response: AxiosResponse) => {
    const newAccessToken = response.headers['authorization'];
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken.split(' ')[1]);
    }
    return response;
  },
  (error) => {
    if (error.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/auth';
      alert('다시 로그인해주세요.');
    }
    return Promise.reject(error);
  }
);

// TODO: 로그인 기능 구현 후 요청 인터셉터 추가 및 props에 header정보 추가

const get = async <T>({url}: RequestArgs): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
};

const post = async <T>({url,data}: RequestArgs): Promise<AxiosResponse<T>> => {
    return await api.post<T>(url, data);
};

const put = async <T>({url, data}: RequestArgs): Promise<T> => {
    const response = await api.put<T>(url, data);
    return response.data;
};

const del = async <T>({url}: RequestArgs): Promise<T> => {
    const response = await api.delete<T>(url);
    return response.data;
};

const putPresignedUrl = async <T>({url, headers, data}: RequestArgs): Promise<T> => {
    return axios.put(url, data, {
        baseURL: import.meta.env.VITE_API_URL,
        headers: headers,
    })
};

export {get, post, put, del, putPresignedUrl};
export default api;