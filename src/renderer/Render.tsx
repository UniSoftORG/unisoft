import {IComponentType} from "@/types";
import PrepareRenderer from "@/renderer/PrepareRenderer";
import {
    processRenderer
} from "@/utils/Renderer/helpers";
import componentsMaps from "@/renderer/imports/components";
import {afterLast, before} from "unisoft-utils";

const Renderer: React.FC<{
    component: IComponentType;
    index: number;
    passFromParent?: any;
    fromClient?: boolean;
}> = ({component, index, passFromParent, fromClient}) => {
    const Component = componentsMaps[component.type];
    if (!Component) throw new Error("Component does not exists!");

    component = processRenderer(component, fromClient)

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
                    child.receiveAttributes && child.passAttributes && Object.keys(child.receiveAttributes).map((objKey) => {
                        if (before(child.receiveAttributes[objKey], '.') === component.name) {
                            return child.passAttributes[objKey] = passFromParent[afterLast(child.receiveAttributes[objKey], '.')] ?? component.passAttributes[afterLast(child.receiveAttributes[objKey], '.')]
                        }
                    })

                    return PrepareRenderer(
                        {
                            ...child,
                            passAttributes: {
                                ...component.passAttributes[child.name as string],
                                ...passFromParent,
                                ...child.passAttributes
                            }
                        },
                        cIndex,
                    );
                })}
        </Component>
    );
};

export default Renderer;
