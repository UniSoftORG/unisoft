import { SupportedApiMethods } from "@/types/request/generics";
import { Endpoints } from "@/utils/Request/new/endpoints";

export const getMainCategories = (objKey: string) => ({
  objKey: objKey,
  method: SupportedApiMethods.GET,
  url: (Endpoints.categories + "?include=stats, sub_categories") as Endpoints,
})

export const getLatestTopics = (objKey: string) => ({
  objKey: objKey,
  method: SupportedApiMethods.GET,
  url: (Endpoints.threads + "?limit=5&include=category") as Endpoints,
});

export const getLatestAnnouncements = (objKey: string) => ({
  objKey: objKey,
  method: SupportedApiMethods.GET,
  url: (Endpoints.threads +
    "?limit=4&category=announcements&include=category") as Endpoints,
})
