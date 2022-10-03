import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig = AxiosRequestConfig;
type FetchResponse<T> = AxiosResponse<T>;

export default function fetch<T = any>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>{
    return axios.get<T>(url, config);
}
