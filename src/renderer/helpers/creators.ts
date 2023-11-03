import { IComponentBase, IComponent, KnownComponentType } from "@/types";
import { v4 } from "uuid";

// export const createTextField = (name: string, props: object): IComponent => {
//     return {
//         ...generateComponentBase(name, KnownComponentType.Text),
//         props: props,
//         receiveProps: ['text'],
//     }
// }

export const createElement = (
  { ...props }: IComponent,
  type?: string,
): IComponentBase => {
  const uniqueIdentity = v4();
  return {
    ...props,
    uuid: uniqueIdentity,
    type: KnownComponentType.Element,
    element: type ?? "div",
  };
};
