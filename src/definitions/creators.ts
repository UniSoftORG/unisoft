"use server"
import {IComponent, IComponentBase, KnownComponentType} from "@/types";
import {v4} from "uuid";

export async function createElsement(name: string, props: any, type = 'div', parent:any = null) {
    // We'll use an object to hold all our elements for easy lookups.
    const elements = {};
    const uniqueIdentity = v4();
    const newElement = {
        ...props,
        name,
        type: KnownComponentType.Element,
        element: type ?? "div",
        uuid: uniqueIdentity,
        // getInitialParentName returns the name of the topmost parent in the chain.
        // async getInitialParentName() {
        //     let initialParent = (this as any).parent;
        //     while (initialParent && initialParent.parent) {
        //         initialParent = initialParent.parent;
        //     }
        //     return initialParent ? initialParent.name : null;
        // },
        // // getParentName returns the name of the immediate parent.
        // async getParentName() {
        //     return (this as any).parent ? (this as any).parent.name : null;
        // },
    };

    // If there's a parent, set the reference and push this element into the parent's children array.
    if (parent) {
        (newElement as any).parent = parent;
        parent?.children && parent.children.push(newElement);
    }
    //
    // // Save the newly created element in the elements object.
    (elements as any)[newElement.uuid] = newElement;

    // Return the new element object.
    return newElement;
}

// export const createElement = (
//     name: string,
//     {...props}: IComponent,
//     type?: string,
//     parentUuid?: string,
//     initialParentUuid?: string,
// ): IComponentBase => {
//     const uniqueIdentity = v4();
//     return {
//         ...props,
//         name,
//         uuid: uniqueIdentity,
//         type: KnownComponentType.Element,
//         element: type ?? "div",
//         parentUuid,  // Optional parent UUID
//         initialParentUuid: initialParentUuid || parentUuid,  // Optional initial parent UUID
//         getParentName: async function() {
//             "use server"
//             // Logic to get the parent's name using the parentUuid
//             // This would typically involve looking up the parent by UUID in your application's state
//             return this.parentUuid; // Placeholder logic
//         },
//         getInitialParentName: async function() {
//             "use server"
//             // Logic to get the initial parent's name using the initialParentUuid
//             // This would also involve looking up the parent by UUID in your application's state
//             return this.initialParentUuid; // Placeholder logic
//         },
//     };
// };

export const createElement:any = (
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