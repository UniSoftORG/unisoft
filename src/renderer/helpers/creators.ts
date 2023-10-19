import {IComponent, KnownComponentType} from "@/types";
import {generateComponentBase} from "@/renderer/helpers/generators";
import {v4} from "uuid";

export const createTextField = ({...props}): IComponent => {
    const uniqueIdentity = v4();
    return {
        uuid: uniqueIdentity,
        name: 'TextField',
        type: KnownComponentType.Text,
        props: props.props,
        receiveProps: ['text'],
        ...props
    }
}

// export const createTextField = (name: string, props: object): IComponent => {
//     return {
//         ...generateComponentBase(name, KnownComponentType.Text),
//         props: props,
//         receiveProps: ['text'],
//     }
// }

export const createElement = ({...props}, type?: string, editable?: boolean): IComponent => {
    const uniqueIdentity = v4();
    return {
        uuid: uniqueIdentity,
        name: props.name,
        type: KnownComponentType.Element,
        element: type ?? 'div',
        attrs: {
            ...props.attrs,
        },
        ...props
    }
}
// export const createElement = (props: { name: string, attrs?: object }, elementType: string = 'div'): IComponent => {
//     return {
//         ...generateComponentBase(props.name, KnownComponentType.Element),
//         element: elementType,
//         attrs: props.attrs || {}
//     }
// }