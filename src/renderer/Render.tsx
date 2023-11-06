import {IComponentType} from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";
import {runMappedFunctions} from "@/utils/Functions/DynamicFunctionLibrary";
import {processReactClientData} from "@/utils/Renderer/helpers";
import componentsMaps from "@/renderer/imports/components";

const Renderer: React.FC<{
    component: IComponentType;
    index: number;
    passFromParent?: any;
    fromClient?: boolean;
}> = ({component, index, passFromParent, fromClient}) => {
    const Component = componentsMaps[component.type];
    if (!Component) throw new Error("Component does not exists!");

    if (fromClient) component = processReactClientData(component);
    if (component.functions) runMappedFunctions(component.functions);

    delete component.receiveAttributes

    return (
        <Component
            {...component}
            componentData={{
                ...component,
                passAttributes: {...component.passAttributes}
            }}
            key={`${component.uuid}-${index}`}
        >
            {component.children &&
                component.children.map((child: IComponentType, cIndex: number) => {
                    child.receiveAttributes && Object.keys(child.receiveAttributes).map((objKey) => {
                        return child.passAttributes[objKey] = passFromParent[objKey]
                    })
                    delete child.receiveAttributes
                    return PrepareRenderer(
                        {
                            ...child,
                            // passAttributes: {
                            //     ...child.passAttributes,
                            //     ...component.passAttributes[child.name as string],
                            //     ...passFromParent,
                            // }
                        },
                        cIndex,
                    );
                })}
        </Component>
    );
};

export default Renderer;
