/* eslint-disable prefer-promise-reject-errors */
const Method = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Delete: "DELETE",
};

type Options = {
  method: any;
  data?: any;
  formData?: boolean;
}

// function queryStringify(data: Options) {
//   if (typeof data !== "object") {
//     throw new Error("Data must be object");
//   }

//   const keys = Object.keys(data);
//   return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
// }

export default class HTTPTransport {
  static API_URL = "https://ya-praktikum.tech/api/v2";

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(path = "/"): Promise<Response> {
    return this.request<Response>(this.endpoint + path);
  }

  public post<Response = void>(path: string, data?: unknown): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Post,
      data,
    });
  }

  public put<Response = void>(path: string, data?: unknown, formData?: boolean): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Put,
      data,
      formData,
    });
  }

  public delete<Response>(path: string): Promise<Response> {
    return this.request<Response>(this.endpoint + path, {
      method: Method.Delete,
    });
  }

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data, formData } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });
      if (!formData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.withCredentials = true;
      xhr.responseType = "json";

      if (formData) {
        xhr.send(data);
      } else if (method === Method.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}