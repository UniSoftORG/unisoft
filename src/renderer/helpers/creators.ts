import {IComponent, KnownComponentType} from "@/types";
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