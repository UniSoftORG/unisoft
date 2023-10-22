import {Collectors, Transformers, Filters, Getters, Setters} from "unisoft-utils";
import {IComponent, IComponentBase, IComponentType} from "@/types";

/**
 * Prepares the props to be passed to a component by merging, collecting, and filtering them.
 * @param componentData The component data
 * @param parentType The parent component type
 * @param parentUuid The parent component UUID
 * @param parentProps The parent component props
 */
export const prepareProps = (
    componentData: IComponentBase & IComponent,
    parentType: string,
    parentUuid: string,
    parentProps: any
): any => {
    return Filters.sanitizeObjectKeysRecursive(
        Transformers.deepMerge({
            parentType,
            parentUuid,
            ...componentData.attributes
        }, parentProps),
        Collectors.recursiveKeyCollection<IComponentBase>(
            componentData,
            'receiveAttributes',
            'children',
            {additionalProps: ['parentType', 'parentUuid', 'children']}
        ),
        {parentKey: 'parentProps'});
};

function checkChild(child: IComponent, parentName: string, passTo: any) {
    if (child.receiveAttributes) {
        for (const key in child.receiveAttributes) {
            const attrValue = child.receiveAttributes[key];
            if (attrValue.startsWith(parentName)) {
                passTo[child.name] = passTo[child.name] || {};
                passTo[child.name][key] = attrValue;
            }
        }
    }

    if (child.children) {
        child.children.forEach((grandChild: IComponent) => {
            passTo[child.name] = passTo[child.name] || {};
            checkChild(grandChild, parentName, passTo[child.name]);
        });
    }
}

type AnyObject  = { [key: string]: any };

export function replaceWithValuesFromMainObject(mainObject: AnyObject, passAttributes: AnyObject): AnyObject {
    for (const key in passAttributes) {
        if (typeof passAttributes[key] === 'object') {
            replaceWithValuesFromMainObject(mainObject, passAttributes[key]);
        } else if (typeof passAttributes[key] === 'string' && passAttributes[key].startsWith(mainObject.name)) {
            const paths = passAttributes[key].split('.');
            let currentValue: any = mainObject;
            if(paths[0] === currentValue.name){
                try {
                    const newVal = Getters.get(mainObject, passAttributes[key].replace(currentValue.name + '.', ''));
                    // if(typeof newVal !== 'object'){
                    currentValue = newVal;
                    // }
                } catch (e: any){
                    console.log(e)
                }
            }
            // for (const path of paths) {
            //     console.log(currentValue[path])
            //     if (currentValue[path] !== undefined) {
            //         currentValue = currentValue[path];
            //     } else {
            //         currentValue = null;
            //         break;
            //     }
            // }
            if (currentValue !== null) {
                passAttributes[key] = currentValue;
            }
        }
    }
    return passAttributes;
}


export function generatePassAttributes(node: IComponent, parentAttributes?: any) {
    const passAttributes: any = {};

    if (node.children) {
        for (const child of node.children) {
            checkChild(child, node.name, passAttributes);
        }
    }
    node.passAttributes = passAttributes

    // Merge with existing passAttributes
    node.passAttributes = {...node.passAttributes, ...passAttributes};
    // If parentAttributes contains a key matching the node's name, use it
    if (parentAttributes && parentAttributes[node.name]) {
        node.passAttributes = Transformers.deepMerge(passAttributes, parentAttributes)
    }

    if (node.children) {
        for (const child of node.children) {
            generatePassAttributes(child, node.passAttributes);
        }
    }
}