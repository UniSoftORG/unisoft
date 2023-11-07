import Renderer from "@/renderer/Render";
import useDynamicStates from "@/utils/React/Managers/StateManager";
import {useInterval} from "@/utils/React/Managers/TimeManager";
import {IComponentType} from "@/types";

const ClientRenderer: React.FC<{ component: IComponentType; index: number; passFromParent?: any }> = ({
                                                                                                          component,
                                                                                                          index,
                                                                                                          passFromParent
                                                                                                      }) => {
    const [states, setStateByKey] = component.states
        ? useDynamicStates(component.states, component.name)
        : [];

    return (
        <Renderer
            component={{
                ...component,
                passAttributes: {
                    ...component.passAttributes,
                    reactActions: {
                        [component.name]: {
                            setState: setStateByKey,
                            useInterval: (watchKeys: any, callbacks: any, delay: any) =>
                                callbacks && useInterval(watchKeys, callbacks, states, delay)
                        }
                    },
                },
            }}
            index={index}
            passFromParent={{...passFromParent, ...states}}
            fromClient={true}
        />
    );
};

export default ClientRenderer;