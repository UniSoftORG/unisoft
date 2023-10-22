import componentsMap from "@/utils/Collections/components";
import {DetermineRendererProps, IComponentType} from "@/types";
import {setState, useDynamicStates} from "@/utils/React/StateManager";
import {replaceDynamicTargets} from "@/utils/Renderer/helpers";


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

    if (componentData.dynamic) {
        componentData = replaceDynamicTargets<any, any>(componentData, componentData.dynamic)
    }

    const [states, setStateByKey] = componentData.states ? useDynamicStates(componentData.states) : []

    const merged = {...componentData, passAttributes: {...componentData.passAttributes}}

    if (componentData.name === 'Slider') {
        // setStateByKey('current', 1)
        // setState(states.currentSetState, 1, () => {
        //     setStateByKey('current', 1)
        // })
    }


    return (
        <Component {...merged.passAttributes}
                   componentData={{...merged, passAttributes: {...merged.passAttributes}}}
                   key={`${merged.uuid}-${index}`}
        >

            {merged.children && merged.children.map((child: IComponentType, index: number) => {
                return <Renderer key={index}
                                 componentData={{...child, passAttributes: {...merged.passAttributes[child.name], ...componentData.passAttributes[child.name], ...{current: states?.current}}}}
                                 index={index}
                                 parentType={merged.type}
                                 parentUuid={merged.uuid}
                />
            })}
        </Component>
    );
};

export default Renderer;
