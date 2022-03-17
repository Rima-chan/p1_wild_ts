import { useState, useEffect } from "react";
import axios, { Method, AxiosRequestHeaders, AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    handlerEnabled: boolean;
  }
}

interface IRequest {
  url: string;
  method: Method | undefined;
  data?: object;
  headers?: AxiosRequestHeaders | undefined;
  handlerEnabled: boolean;
}

export interface IServerResponse<T> {
  success: boolean;
  result: T;
}

export interface IResponse<T> {
  response: IServerResponse<T>;
  error: boolean;
  loading: boolean;
}

export const useReadAxios = (axiosParams: IRequest) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async (params: IRequest) => {
    setLoading(true);
    try {
      const response = await axios.request<AxiosResponse>(params);
      setResponse(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData(axiosParams);
  }, []);
  return { response, error, loading };
};

export const useCreateUpdateAxios = () => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchData = async (axiosParams: IRequest) => {
    setLoading(true);
    try {
      const response = await axios.request<AxiosResponse>(axiosParams);
      setResponse(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return { response, error, loading, fetchData };
};
