import {ReactNode, ComponentType, FC} from 'react';
import {DynamicProp, DynamicRequest} from "@/types/dynamic";
import {Conditional} from "unisoft";
import {CreateState} from "@/types/react";

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
    FC<ChildType>
    | ReactNode
    | IComponentBase<Type, Partial<ChildType>>;

export enum KnownComponentType {
    Element = 'Element',
    Translation = 'Translation',
    Component = 'Component',
    Image = 'Image',
    Text = 'Text'
}

export enum KnownElementTag {
    Main = 'main',
    Div = 'div',
    Section = 'section',
    Form = 'form',
    Span = 'span'
}


type KnownComponent = 'Element' | 'Translation' | 'Component' | 'Image' | 'Text';

/**
 * Represents data for components.
 */
export interface IComponentBase<Type = any, ChildType = any> {
    [key: string]: any;

    uuid: string;
    type: KnownComponent;
    element?: string;
    elementAttributes?: Record<string, any>
}

export interface IComponent<Type = any, ChildType = any> {
    name: string;
    renderer?: 'server' | 'client';
    attributes?: Record<string, any>;
    variables?: CreateState;
    states?: CreateState;
    elementAttributes?: Record<string, any> | undefined
    dynamic?: any;
    receiveAttributes?: any;
    passAttributes?: any;
    children?: any;
    requests?: DynamicRequest[];
}

export type IComponentType = IComponentBase & IComponent

/**
 * Props for determining how to render a component.
 */

export enum KnownConditions {
    "===" = '===',
    "!==" = "!==",
    "<" = "<",
    "<=" = "<=",
    ">" = ">",
    ">=" = ">="
}


export enum ReactHooks {
    useState = 'useState',
    useEffect = 'useEffect',
    useContext = 'useContext',
    useReducer = 'useReducer',
    useCallback = 'useCallback',
    useMemo = 'useMemo',
    useRef = 'useRef',
    useImperativeHandle = 'useImperativeHandle',
    useLayoutEffect = 'useLayoutEffect',
    useDebugValue = 'useDebugValue',
    useTransition = 'useTransition',
    useDeferredValue = 'useDeferredValue',

    // Custom hooks, to ensure the best practices
    useTimeOut = 'useTimeOut',
    useInterval = 'useInterval'
}
