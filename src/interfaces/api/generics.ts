import {IBreadcrumbs, IHead, IMeta} from "@/interfaces/api/breadCrumbs";

export interface ApiResult<Type> extends IGenericApiError {
    data: Type;
    statusCode: number;
    breadCrumbs?: IBreadcrumbs;
    meta?: IMeta;
    head?: IHead;
}

export interface IGenericApiError {
    message?: string;
    errors?: {
        [key: string]: string[];
    };
    exception?: string;
}

export interface IIconOrImage {
    type?: string;
    label?: string;
    alt?: string;
    color?: string;
    background?: string;
    front_path?: string;
    back_path?: string;
}

export enum SupportedApiMethods {
    "GET" = "get",
    "PUT" = "put",
    "POST" = "post",
    "DELETE" = "delete",
    "PATCH" = "patch",
}
