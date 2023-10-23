"use client"
import Renderer from "@/renderer/Render";
import componentsMaps from "@/renderer/imports/components";
import {delaySetState, useDynamicStates} from "@/utils/React/StateManager";

const ClientRenderer: React.FC<{ componentProps: any; index: number }> = ({ componentProps, index }) => {
    const Component = componentsMaps[componentProps.type];
    if (!Component) throw new Error('Component does not exists!')

    const [states, setStateByKey] = componentProps.states ? useDynamicStates(componentProps.states) : []

    // if (componentProps.name === 'Slider' && states && setStateByKey) {
    //     // setStateByKey('current', 1)
    //     delaySetState(states.currentSetState, 1, () => {
    //         setStateByKey('current', 1)
    //     })
    // }

    return <Renderer Component={Component} componentProps={{...componentProps, passAttributes: {...componentProps.passAttributes, ...states}}} index={index} passFromParent={{...states}}/>
};

export default ClientRenderer;
