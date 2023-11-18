import {
  IComponent,
  IComponentBase, IComponentType,
  KnownComponentType,
  KnownElementTag,
} from '@/types';
import { ImageProps } from 'next/dist/shared/lib/get-img-props';
import { v4 } from "uuid";

export const generateElement = (
  name: string,
  props: IComponent,
  type?: KnownElementTag
): IComponent & IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Element,
    element: type ?? KnownElementTag.Div,
    ...props,
  };
};

export const generateLink = (
  name: string,
  props: IComponent
): IComponent & IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Link,
    ...props,
  };
};

export const generateImage = (
  name: string,
  { ...props }: IComponent,
  squared?: number
): IComponentType => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Image,
    ...props,
    elementAttributes: {
      ...props.elementAttributes,
      alt: "",
      ...(squared !== undefined && { width: squared, height: squared }),
    } as ImageProps,
  };
};

export const generateTextField: any = (
  name: string,
  props: IComponent
): IComponent & IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Text,
    ...props,
  };
};
