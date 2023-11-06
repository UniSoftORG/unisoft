"use client";
import Renderer from "@/renderer/Render";
import {useDynamicStates} from "@/utils/React/Managers/StateManager";
import {useInterval} from "@/utils/React/Managers/TimeManager";
import {IComponentType} from "@/types";

const ClientRenderer: React.FC<{ component: IComponentType; index: number }> = ({
                                                                         component,
                                                                         index,
                                                                     }) => {
    const [states, setStateByKey] = component.states
        ? useDynamicStates(component.states)
        : [];

    return (
        <Renderer
            component={{
                ...component,
                states: states,
                passAttributes: {
                    ...component.passAttributes,
                    reactActions: {
                        setState: setStateByKey,
                        useInterval: (watchKeys: any, callbacks: any, delay: any) =>
                            callbacks && useInterval(watchKeys, callbacks, states, delay),
                    },
                },
            }}
            index={index}
            passFromParent={{...states}}
            fromClient={true}
        />
    );
};

export default ClientRenderer;
