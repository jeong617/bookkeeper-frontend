import axios, {AxiosInstance, AxiosRequestHeaders} from 'axios';

interface RequestArgs<T = any> {
    url: string;
    headers?: AxiosRequestHeaders;
    data?: T;
}

const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_NGROK,
    headers: {
    },
    timeout: 5000,
});

// TODO: 로그인 기능 구현 후 요청 인터셉터 추가 및 props에 header정보 추가
// TODO: 상태코드 정한 후 응답 인터셉터 추가

const get = async <T>({url}: RequestArgs): Promise<T> => {
    const response = await api.get<T>(url);
    return response.data;
};

const post = async <T>({url, data}: RequestArgs): Promise<T> => {
    const response = await api.post<T>(url, data);
    return response.data;
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