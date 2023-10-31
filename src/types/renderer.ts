import { ReactNode, ComponentType, FC } from "react";
import { DynamicProp, DynamicRequest } from "@/types/dynamic";
import { Conditional } from "unisoft";
import { CreateState } from "@/types/react";

/**
 * Configuration for component props.
 */
export interface PropConfig<T = unknown, ChildType = unknown> {
  fileProps?: unknown[];
  editableProps?: Array<keyof T>;
  translatableProps?: Array<keyof T>;
  propsTypes?: string[];
  defaultProps?: T;
  propOptions?: unknown;
  incrementalProps?: Array<keyof T>;
  dynamicAttributes?: string[];
  dynamicProps?: DynamicProp[];
  propReceivedFrom?: Record<string, unknown>;
}

/**
 * A unified type for child elements/components.
 */
export type ChildComponent<Type = unknown, ChildType = unknown> =
  | FC<ChildType>
  | ReactNode
  | IComponentBase<Type, Partial<ChildType>>;

export enum KnownComponentType {
  Element = "Element",
  Translation = "Translation",
  Component = "Component",
  Image = "Image",
  Text = "Text",
}

export enum KnownElementTag {
  Main = "main",
  Div = "div",
  Section = "section",
  Form = "form",
  Span = "span",
}

type KnownComponent =
  | "Element"
  | "Translation"
  | "Component"
  | "Image"
  | "Text";

/**
 * Represents data for components.
 */
export interface IComponentBase<Type = any, ChildType = any> {
  [key: string]: any;

  uuid: string;
  type: KnownComponent;
  element?: string;
  elementAttributes?: Record<string, any>;

  // component?: ReactNode | FC<Type> | ComponentType<Type>;
  // props?: Type;
  // receiveProps?: Array<{ parentProps?: string[] } | keyof Type | any>;
  // attrs?: Record<string, any>;
  // mapProp?: keyof Type;
  // data?: any;
  // dynamicProps?: DynamicProp[];
  // propConfig?: PropConfig<Type, ChildType>;
  // conditionalClasses?: { className: Conditional[] }[] | { [key: string]: Conditional[] }[];
  // conditional?: Conditional
  // style?: Record<string, any>;
  // canHaveChildren?: boolean;
  // childrenTypes?: Array<FC<ChildType> | ReactNode | IComponentBase<Type, Partial<ChildType>>>;
  // children?: IComponentBase<Type, ChildType>[] | React.ReactElement<{parentprops?: any}>[] | React.ReactElement<{parentprops?: any}>;
  // requests?: DynamicRequest[];
}

export interface IComponent<Type = any, ChildType = any> {
  name: string;
  renderer?: "server" | "client";
  attributes?: Record<string, any>;
  variables?: CreateState;
  states?: CreateState;
  elementAttributes?: Record<string, any> | undefined;
  dynamic?: any;
  receiveAttributes?: any;
  passAttributes?: any;
  children?: any;
  conditions?: string[];
  mapByKey?: string;
  mappedComponent?: IComponentType[];
  mapAttributes?: any;
  functions?: any;
  useEffects?: any;
  // children?: IComponentBase<Type, ChildType>[] | React.ReactElement<{parentprops?: any}>[] | React.ReactElement<{parentprops?: any}>;

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

export enum KnownConditions {
  "===" = "===",
  "!==" = "!==",
  "<" = "<",
  "<=" = "<=",
  ">" = ">",
  ">=" = ">=",
}

export interface Condition {
  firstParam: string | number | undefined | null;
  secondParam: string | number | undefined | null;
  condition: KnownConditions;
  expectedValue?: string | number | undefined | null;
  trueReturn?: string | number | undefined | null;
  falseReturn?: string | number | undefined | null;
}

export interface Component<Type = any, ChildType = any> {
  [key: string]: any;

  uuid?: string;
  type: KnownComponentType;
  name?: string;
  element?: KnownElementTag;
  component?: ReactNode | FC<Type> | ComponentType<Type>;
  attributes?: Type;
  variables?: string;
  elementAttributes?: Record<string, any>;
  conditions?: Conditional;

  receiveProps?: Array<{ parentProps?: string[] } | keyof Type | any>;
  attrs?: Record<string, any>;
  mapProp?: keyof Type;
  data?: any;
  dynamicProps?: DynamicProp[];
  propConfig?: PropConfig<Type, ChildType>;
  conditionalClasses?:
    | { className: Conditional[] }[]
    | { [key: string]: Conditional[] }[];
  conditional?: Conditional;
  style?: Record<string, any>;
  canHaveChildren?: boolean;
  childrenTypes?: Array<
    FC<ChildType> | ReactNode | IComponentBase<Type, Partial<ChildType>>
  >;
  children?:
    | IComponentBase<Type, ChildType>[]
    | React.ReactElement<{ parentprops?: any }>[]
    | React.ReactElement<{ parentprops?: any }>;
  requests?: DynamicRequest[];
}

export enum ReactHooks {
  useState = "useState",
  useEffect = "useEffect",
  useContext = "useContext",
  useReducer = "useReducer",
  useCallback = "useCallback",
  useMemo = "useMemo",
  useRef = "useRef",
  useImperativeHandle = "useImperativeHandle",
  useLayoutEffect = "useLayoutEffect",
  useDebugValue = "useDebugValue",
  useTransition = "useTransition",
  useDeferredValue = "useDeferredValue",

  // Custom hooks, to ensure the best practices
  useTimeOut = "useTimeOut",
  useInterval = "useInterval",
}
