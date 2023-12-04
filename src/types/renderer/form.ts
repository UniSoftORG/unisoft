import { FormSection } from "@/types";
import { SupportedApiMethods } from "@/types/request/generics";
import { Url } from "url";
import * as Yup from "yup";

export type FormProps = {
  name: FormSection;
  requestHandler?: (data: any) => void;
};

export type IFormOptions<TForm extends FormSection> = {
  name: TForm;
  url: Url;
  endpoint: string;
  method: SupportedApiMethods;
  fields: FormField[];
};

export enum ValidationType {
  required = "required",
  isEmail = "isEmail",
  minLength = "minLength",
  isTrue = "isTrue",
  oneOf = "oneOf",
}

export interface Validation<Type extends ValidationType> {
  type: Type;
  value?: string | number | boolean;
  message: string;
  ref?: React.Ref<string>;
}

export interface Opt {
  value: string | number;
  desc: string;
}

export interface FormField<
  TValue = string | number | readonly string[] | unknown,
> {
  label: string;
  type:
    | "text"
    | "radio"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "textarea"
    | "wysiwyg"
    | "date-picker"
    | "number"
    | "date-time"
    | "time"
    | "color"
    | "date-range";
  name: string;
  className?: string;
  placeholder?: string;
  value: TValue;
  typeValue?: "boolean" | "number";
  validations?: Validation<ValidationType>[];
  options?: Opt[];
}

// Generic type for form structure
export type FormStructure<T extends FormSection> = {
  [K in T]: FormField<unknown>[];
};

export type YupBoolean = Yup.BooleanSchema<
  boolean | Yup.Optionals<boolean | undefined>,
  Yup.Optionals<boolean>,
  boolean
>;
export type YupString = Yup.StringSchema<
  string | undefined,
  Yup.Optionals<string>,
  string | undefined
>;
