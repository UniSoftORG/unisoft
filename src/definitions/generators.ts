import {
  IComponentBase,
  IGenerateComponent,
  KnownComponentType,
  KnownElementTag,
} from "@/types";
import { v4 } from "uuid";

export const generateElement: any = (
  name: string,
  { ...props }: IGenerateComponent,
  type?: KnownElementTag,
): IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Element,
    element: type ?? KnownElementTag.Div,
    ...props,
  };
};
