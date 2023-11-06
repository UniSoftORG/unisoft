import {
  IComponentBase, IComponentType,
  IGenerateComponent,
  KnownComponentType,
  KnownElementTag,
} from "@/types";
import { v4 } from "uuid";

export const generateElement: any = (
  name: string,
  { ...props }: IGenerateComponent,
  type?: KnownElementTag,
): IComponentType => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Element,
    element: type ?? KnownElementTag.Div,
    ...props,
  };
};

export const generateTextField: any = (
    name: string,
    { ...props }: IGenerateComponent
): IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Text,
    ...props,
  };
};
