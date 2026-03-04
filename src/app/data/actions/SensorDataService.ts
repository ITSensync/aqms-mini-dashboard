import axios, { AxiosInstance } from "axios";

export class SensorDataService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getlatest = () => {
    return this.instance
      .get(`/latest`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };

  get = (tanggal: string) => {
    return this.instance
      .get(`?tanggal=${tanggal}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };

  getPagination = (page: number, limit: number, param: string) => {
    return this.instance
      .get(`/pagination/${param}?page=${page}&limit=${limit}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if (error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          };
          return errorResponse;
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name,
          };
          return errorResponse;
        }
      });
  };
}
