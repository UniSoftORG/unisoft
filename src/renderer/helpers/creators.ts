import {IComponentBase, IComponent, KnownComponentType} from "@/types";
import {generateComponentBase} from "@/renderer/helpers/generators";
import {v4} from "uuid";

export const createTextField = ({...props}): IComponentBase => {
    const uniqueIdentity = v4();
    return {
        ...props,
        uuid: uniqueIdentity,
        name: 'TextField',
        type: KnownComponentType.Text,
        props: props.props,
        receiveProps: ['text'],
    }
}

// export const createTextField = (name: string, props: object): IComponent => {
//     return {
//         ...generateComponentBase(name, KnownComponentType.Text),
//         props: props,
//         receiveProps: ['text'],
//     }
// }

export const createElement = ({...props}: IComponent, type?: string): IComponentBase => {
    const uniqueIdentity = v4();
    return {
        ...props,
        uuid: uniqueIdentity,
        type: KnownComponentType.Element,
        element: type ?? 'div'
    }
}

export const createImage = ({...props}, squared?: number): IComponentBase => {
    const uniqueIdentity = v4();
    return {
        ...props,
        uuid: uniqueIdentity,
        type: 'Image',
        ...(squared !== undefined && {...{attrs: {width: squared, height: squared, ...props.attrs}}})
    }
}
// export const createElement = (props: { name: string, attrs?: object }, elementType: string = 'div'): IComponent => {
//     return {
//         ...generateComponentBase(props.name, KnownComponentType.Element),
//         element: elementType,
//         attrs: props.attrs || {}
//     }
// }