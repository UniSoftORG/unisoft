// @ts-nocheck
import componentsMap from "@/utils/Collections/components";
import {IComponentBase, DetermineRendererProps, CreateState, IComponent} from "@/types";
import {prepareProps} from "@/utils/Renderer/propUtils";
import {createAllStates, createState, generateStates, getAllStates, setState} from "@/utils/React/StateManager";
import {Collectors, Filters, Transformers} from "unisoft-utils";


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

    let states;
    let createProps = componentData;
    componentData.dynamic ? createProps = Transformers.replaceDynamicTargets(createProps, createProps.dynamic) : undefined;
    createProps.states ? states = generateStates(createProps.states) : undefined
    // createProps = processComponent({...createProps, states: states})

    if(componentData.name === 'TestElement'){
        setState(states.testStateSetState, 'tsest')
    }

    return <>
        <pre
            className="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6">
            {/*{JSON.stringify({...componentData.attributes, ...componentData.states}, null, 2)}*/}
            {JSON.stringify({test: componentData.name, ...componentData.attributes, ...createProps.states}, null, 2)}

            {createProps.children && createProps.children.map((child: IComponent, index: number) => {
                return <Renderer key={index}
                                 componentData={{...child, ...{attributes: {...componentData.attributes, ...createProps.states}}}}
                                 index={index}
                                 parentType={createProps.type}
                                 parentUuid={createProps.uuid}
                                 parentProps={createProps.states} />


                // </Renderer>/**/
            })}
            {/*<Renderer componentData={} parentType={} parentUuid={} />*/}
        </pre>

    </>
    // if(componentData.name === 'TestElement'){
    //     setState(states.testStateSetState, 'tsest')
    // }
    // const test = {...createProps.attributes, ...states};
    //
    // const renderChildren = (props = {}) => (
    //     createProps.children && (createProps.children as IComponent[]).map((child: IComponent, idx: number) => (
    //         <Renderer
    //             componentData={{...child, props: {...child.attributes, ...child.states, ...test}}}
    //             parentType={parentType}
    //             parentUuid={parentUuid}
    //             key={`${child.uuid}-${idx}`}
    //             index={idx}
    //         />
    //     ))
    // );
    //
    // return (
    //     <Component {...test}
    //                componentData={{...createProps, props: test}}
    //                key={`${createProps.uuid}-${index}`}>
    //
    //         {createProps.name} {JSON.stringify(test)}
    //         {renderChildren(test)}
    //     </Component>
    // );

    // console.log(prepareProps)
};

// const Renderer: React.FC<DetermineRendererProps> = ({
//                                                         componentData,
//                                                         parentType,
//                                                         parentUuid,
//                                                         parentProps,
//                                                         index
//                                                     }) => {
//     // Map existing components
//     const Component = componentsMap[componentData.type];
//     // Check if component exists
//     if (!Component) {
//         return <div>Error: Component not found</div>
//     }
//
//     /** Prepares the props to be passed to a component by: merging, collecting, and filtering them.
//      *  merge with parent and other props
//      *  collect props from all definitions in order to determine witch ones should be passed
//      *  filter & pass through props only that should be received to the end child
//      */
//     const propsToPass = prepareProps(componentData, parentType, parentUuid, parentProps)
//
//     // For simplicity, extract only needed objects from definition
//     const {mapProp, children, uuid} = componentData;
//
//     // Render children with same renderer
//     const renderChildren = (props = {}) => (
//         children && (children as IComponent[]).map((child: IComponent, idx: number) => (
//             <Renderer
//                 componentData={{...child, props: {...child.props}}}
//                 parentType={parentType}
//                 parentUuid={parentUuid}
//                 key={`${child.uuid}-${idx}`}
//                 index={idx}
//             />
//         ))
//     );
//
//     // If object has mapProp definition, get prop for mapping and render component with mapped props
//     if (mapProp) {
//         return propsToPass[mapProp].map((prop: any, idx: number) => {
//             const propsForChild = {...propsToPass, ...prop, index: idx};
//
//             return (
//                 <Component
//                     componentData={{...componentData, props: propsForChild}} key={`${prop.uuid}-${idx}`} {...propsForChild}>
//                     {renderChildren(propsForChild)}
//                 </Component>
//             );
//         });
//     } else {
//         // Finally render component
//         return (
//             <Component {...propsToPass}
//                        componentData={{...componentData, props: propsToPass}}
//                        key={`${componentData.uuid}-${index}`}>
//                 {renderChildren()}
//             </Component>
//         );
//     }
// };

export default Renderer;
