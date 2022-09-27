import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestConfig = AxiosRequestConfig;
type FetchResponse<T> = AxiosResponse<T>;

function fetch<T = any>(url: string, config?: RequestConfig): Promise<FetchResponse<T>>{
    return axios.get<T>(url, config);
}

export default fetch;