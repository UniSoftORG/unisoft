import {
  ElementTag,
  IComponent,
  IComponentBase,
  IComponentType,
  KnownComponentType,
  ElementTags, TextTags,
} from '@/types';
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import { v4 } from "uuid";

export const generateElement = (
  name: string,
  props: IComponent,
  type?: ElementTag
): IComponent & IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    type: KnownComponentType.Element,
    element: type ?? ElementTags.Div,
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
      ...(typeof squared !== "undefined" && { width: squared, height: squared }),
    } as ImageProps,
  };
};

export const generateTextField = (
  name: string,
  props: IComponent,
  type?: TextTags
): IComponent & IComponentBase => {
  const uniqueIdentity = v4();
  return {
    name,
    uuid: uniqueIdentity,
    element: type ?? TextTags.Span,
    type: KnownComponentType.Text,
    ...props,
  };
};
