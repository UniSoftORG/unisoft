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
export type ChildComponent<Type = unknown, ChildType = unknown> = FC<ChildType> | ReactNode | ComponentData<Type, Partial<ChildType>>;

type KnownComponentType = 'Element' | 'Translation' | 'Component' | 'Image';

/**
 * Represents data for components.
 */
export interface ComponentData<Type = unknown, ChildType = unknown> {
    [key: string]: unknown;
    name?: string;
    uuid: string;
    type: KnownComponentType;
    element?: string;
    component?: ReactNode | FC<Type> | ComponentType<Type>;
    props?: Type;
    receiveProps?: Array<{ parentProps?: string[] } | keyof Type | unknown>;
    attrs?: Record<string, unknown>;
    mapProp?: keyof Type;
    data?: unknown;
    dynamicProps?: DynamicProp[];
    propConfig?: PropConfig<Type, ChildType>;
    conditionalClasses?: { className: Conditional[] }[] | Record<string, Conditional[]>;
    conditional?: Conditional[];
    style?: Record<string, any>;
    canHaveChildren?: boolean;
    childrenTypes?: ChildComponent<Type, ChildType>[];
    children?: ComponentData<Type, ChildType>[] | React.ReactElement<{ parentprops?: unknown }>[];
    requests?: DynamicRequest[];
}

/**
 * Props for determining how to render a component.
 */
export interface DetermineRendererProps {
    componentData: ComponentData;
    parentType: string;
    parentUuid: string;
    parentProps?: unknown;
    index?: string | number;
}
