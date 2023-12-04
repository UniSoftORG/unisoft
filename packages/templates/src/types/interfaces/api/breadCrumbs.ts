import { IIconOrImage } from './generics';

export interface IBreadcrumbItem {
  title?: string;
  icon?: IIconOrImage;
  slug: string;
  link?: string;
  image?: string;
}

export interface IBreadcrumbs extends Array<IBreadcrumbItem> {}

export interface IHead {
  title: string | null;
  description: string | null;
  image?: string;
  is_locked?: boolean;
}

export interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  to: number;
  total: number;
  links?: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
}
