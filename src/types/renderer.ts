import { ReactNode, ComponentType, FC } from 'react';
import { DynamicProp, DynamicRequest } from "@/types/dynamic";
import {Conditional} from "unisoft-utils/@utils/interfaces";

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
export type ChildComponent<Type = unknown, ChildType = unknown> = FC<ChildType> | ReactNode | IComponent<Type, Partial<ChildType>>;

export enum  KnownComponentType {
    Element = 'Element',
    Translation = 'Translation',
    Component = 'Component',
    Image = 'Image',
    Text = 'Text'
}


// type KnownComponentType = 'Element' | 'Translation' | 'Component' | 'Image';

/**
 * Represents data for components.
 */
export interface IComponent<Type = any, ChildType = any> {
    [key: string]: any;
    name?: string;
    uuid: string;
    type: KnownComponentType;
    element?: string;
    component?: ReactNode | FC<Type> | ComponentType<Type>;
    props?: Type;
    receiveProps?: Array<{ parentProps?: string[] } | keyof Type | any>;
    attrs?: Record<string, any>;
    mapProp?: keyof Type;
    data?: any;
    dynamicProps?: DynamicProp[];
    propConfig?: PropConfig<Type, ChildType>;
    conditionalClasses?: { className: Conditional[] }[] | { [key: string]: Conditional[] }[];
    conditional?: Conditional
    style?: Record<string, any>;
    canHaveChildren?: boolean;
    childrenTypes?: Array<FC<ChildType> | ReactNode | IComponent<Type, Partial<ChildType>>>;
    children?: IComponent<Type, ChildType>[] | React.ReactElement<{parentprops?: any}>[] | React.ReactElement<{parentprops?: any}>;
    requests?: DynamicRequest[];
}

/**
 * Props for determining how to render a component.
 */
export interface DetermineRendererProps {
    componentData: IComponent;
    parentType: string;
    parentUuid: string;
    parentProps?: unknown;
    index?: string | number;
}
