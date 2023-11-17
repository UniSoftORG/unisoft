import { SupportedApiMethods } from "@/interfaces/api/generics";

export const getMainCategories = {
  method: SupportedApiMethods.GET,
  url: "forum/categories?include=stats, sub_categories",
};

export const getLatestTopics = {
  method: SupportedApiMethods.GET,
  url: "forum/threads?limit=5&include=category",
};

export const getLatestAnnouncements = {
  method: SupportedApiMethods.GET,
  url: "forum/threads?limit=4&category=announcements&include=category",
};
