import api from "../services/api";

export default class API {
  public static get(url: string) {
    return api.get(url);
  }

  public static post(url: string, options: any) {
    return api.post(url, options);
  }

  public static put(url: string, options: any) {
    return api.put(url, options);
  }

  public static delete(url: string) {
    return api.delete(url);
  }
}