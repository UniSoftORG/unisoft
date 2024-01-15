import {
  CreateState,
  DynamicRequest, ElementTag,
  FunctionNames,
  IEvent,
  IFunction,
  IUserData,
  KnownComponentType,
  ElementTags, TextTags,
} from '@/types';
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import { Events } from "unisoft-templates/src/types/events";

/**
 * Represents data for components.
 */
export interface IComponentBase {
  name: string;
  uuid: string;
  type: KnownComponentType;
  element?: ElementTag;
}

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
  session?: IUserData | null;
  dynamic?: string[];
  rendererDynamic?: string[];
  conditions?: string[];
  rendererConditions?: string[];

  receiveAttributes?: any;
  passAttributes?: any;
}

export type IComponentType = IComponentBase & IComponent;
