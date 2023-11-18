import { DynamicRequest } from "@/types/dynamic";
import { CreateState, ReactHooks } from '@/types/react';
import { IEvent, IFunction, IUseEffect } from '@/types/functions';
import { FunctionNames } from '@/types/uniFunctions';
import { Events } from 'unisoft-templates/src/types/events';
import { ImageProps } from 'next/dist/shared/lib/get-img-props';

// Utility type for nested property paths

export enum KnownComponentType {
  Element = "Element",
  Link = "Link",
  Translation = "Translation",
  Component = "Component",
  Image = "Image",
  Text = "Text",
}

export enum KnownElementTag {
  Main = "main",
  Div = "div",
  Li = "li",
  Section = "section",
  Button = "button",
  Nav = "nav",
  Form = "form",
  Span = "span",
  Ul = "ul",
  Paragraph = "p",
  Header = "header",
  Aside = "aside",
  Footer = "footer",
}

/**
 * Represents data for components.
 */
export interface IComponentBase {
  name: string;
  uuid: string;
  type: KnownComponentType;
  element?: KnownElementTag;
}

export type UniFunc = ReactHooks & FunctionNames
export interface IComponent {
  uuid?: string;
  renderer?: "server" | "client";
  variables?: CreateState;
  states?: CreateState;
  elementAttributes?: React.HTMLAttributes<any> | ImageProps;
  children?: IComponentType[];
  mapByKey?: string;
  functions?: IFunction<FunctionNames>[];
  onEvents?: IEvent<Events>[];
  requests?: DynamicRequest[];

  dynamic?: string[];
  rendererDynamic?: string[];
  conditions?: string[];
  rendererConditions?: string[];

  receiveAttributes?: any;
  passAttributes?: any;
}

export type IComponentType = IComponentBase & IComponent;


// Example usage of DeepKeyOf

