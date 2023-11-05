import {IComponent, IComponentBase, KnownComponentType} from "@/types";
import {v4} from "uuid";

export const createElement = (
    name: string,
    {...props}: IComponent,
    type?: string,
): IComponentBase => {
    const uniqueIdentity = v4();
    return {
        ...props,
        name,
        uuid: uniqueIdentity,
        type: KnownComponentType.Element,
        element: type ?? "div",
    };
};