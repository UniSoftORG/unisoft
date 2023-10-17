import componentsMap from "@/utils/Collections/components";
import {IComponent, DetermineRendererProps} from "@/types";
import {prepareProps} from "@/utils/Renderer/propUtils";

const Renderer: React.FC<DetermineRendererProps> = ({
                                                              componentData,
                                                              parentType,
                                                              parentUuid,
                                                              parentProps,
                                                              index
                                                          }) => {
    // Map existing components
    const Component = componentsMap[componentData.type];
    // Check if component exists
    if (!Component) {
        return <div>Error: Component not found</div>
    }

    /** Prepares the props to be passed to a component by: merging, collecting, and filtering them.
     *  merge with parent and other props
     *  collect props from all definitions in order to determine witch ones should be passed
     *  filter & pass through props only that should be received to the end child
     */
    const propsToPass = prepareProps(componentData, parentType, parentUuid, parentProps)

    // For simplicity, extract only needed objects from definition
    const {mapProp, children, uuid} = componentData;

    // Render children with same renderer
    const renderChildren = (props = {}) => (
        children && (children as IComponent[]).map((child: IComponent, idx: number) => (
            <Renderer
                componentData={{...child, props: {...child.props}}}
                parentType={parentType}
                parentUuid={parentUuid}
                key={`${child.uuid}-${idx}`}
                index={idx}
            />
        ))
    );

    // If object has mapProp definition, get prop for mapping and render component with mapped props
    if (mapProp) {
        return propsToPass[mapProp].map((prop: any, idx: number) => {
            const propsForChild = {...propsToPass, ...prop, index: idx};

            return (
                <Component
                           componentData={{...componentData, props: propsForChild}} key={`${prop.uuid}-${idx}`} {...propsForChild}>
                    {renderChildren(propsForChild)}
                </Component>
            );
        });
    } else {
        // Finally render component
        return (
                <Component {...propsToPass}
                           componentData={{...componentData, props: propsToPass}}
                           key={`${componentData.uuid}-${index}`}>
                    {renderChildren()}
                </Component>
        );
    }
};

export default Renderer;
