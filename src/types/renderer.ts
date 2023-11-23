import { ReactNode } from 'react';
import { DynamicRequest } from '@/types/dynamic';
import { CreateState } from '@/types/react';

export type AnyObject = { [key: string]: any };

export enum KnownComponentType {
  Element = 'Element',
  Link = 'Link',
  Translation = 'Translation',
  Component = 'Component',
  Image = 'Image',
  Text = 'Text',
}

export enum KnownElementTag {
  Main = 'main',
  Div = 'div',
  Link = 'a',
  Li = 'li',
  Section = 'section',
  Button = 'button',
  Nav = 'nav',
  Form = 'form',
  Span = 'span',
  Ul = 'ul',
  Paragraph = 'p',
  Header = 'header',
  Aside = 'aside',
  Footer = 'footer',
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

export interface IComponent {
  uuid?: string;
  renderer?: 'server' | 'client';
  attributes?: Record<string, any>;
  variables?: CreateState;
  states?: CreateState;
  elementAttributes?: React.HTMLAttributes<any>;
  dynamic?: any;
  rendererDynamic?: any;
  receiveAttributes?: AnyObject;
  passAttributes?: any;
  children?: any;
  conditions?: string[];
  rendererConditions?: string[];
  mapByKey?: string;
  mappedComponent?: IComponentType[];
  mapAttributes?: any;
  functions?: any;
  useEffects?: any;
  // children?: IComponentBase<Type, ChildType>[] | React.ReactElement<{parentprops?: any}>[] | React.ReactElement<{parentprops?: any}>;
  onEvents?: any;
  requests?: DynamicRequest[];
}

export type IComponentType = IComponentBase & IComponent;

/**
 * Props for determining how to render a component.
 */
export interface DetermineRendererProps {
  Component?: any;
  componentData: IComponentType;
  parentType?: string;
  parentUuid?: string;
  parentProps?: unknown;
  index?: string | number;
  children?: ReactNode;
}
