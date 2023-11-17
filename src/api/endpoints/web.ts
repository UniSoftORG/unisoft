import { webRequest } from "../../utils/Request/singletonApiRequest";

export const getPage = async (page: string) => {
  return await webRequest().get<{ components: any[] }>(`web/page/${page}`);
};

export const updatePage = async (page: string, content: string) => {
  return await webRequest().patch<any>(`web/page/${page}`, { data: content });
};

export const getTranslations = async (locale: string) => {
  return await webRequest().get<any>(`web/translations`);
};

export const updateTranslations = async (locale: string, content: string) => {
  return await webRequest().patch<any>(`web/translations`, { data: content });
};
