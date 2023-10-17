import {Collectors, Transformers, Filters} from "unisoft-utils";
import {IComponent} from "@/types";

/**
 * Prepares the props to be passed to a component by merging, collecting, and filtering them.
 * @param componentData The component data
 * @param parentType The parent component type
 * @param parentUuid The parent component UUID
 * @param parentProps The parent component props
 */
export const prepareProps = (
    componentData: IComponent,
    parentType: string,
    parentUuid: string,
    parentProps: any
): any => {
    return Filters.sanitizeObjectKeysRecursive(
        Transformers.deepMerge({
            parentType,
            parentUuid,
            ...componentData.props
        }, parentProps),
        Collectors.recursiveKeyCollection<IComponent>(
            componentData,
            'receiveProps',
            'children',
            {additionalProps: ['parentType', 'parentUuid', 'children']}
        ),
        {parentKey: 'parentProps'});
};