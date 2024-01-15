import { SupportedApiMethods } from "@/types/request/generics";
import { Endpoints } from "@/utils/Request/new/endpoints";

export const products = {
  method: SupportedApiMethods.GET,
  url: Endpoints.products,
};
