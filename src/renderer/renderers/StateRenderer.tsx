import Renderer from '@/renderer/Render';
import useDynamicStates from '@/utils/React/Managers/StateManager';
import { IComponentType } from '@/types';
import { useInterval } from '@/utils/React/Managers/TimeManager';

const StateRenderer: React.FC<{
  component: IComponentType;
}> = ({ component }) => {
  const [states, setStateByKey] = component.states
    ? useDynamicStates(component.states)
    : [];
  const handleStateChange = (key: string, value: any) => {
    setStateByKey && setStateByKey(key, value);
    // Additional logic if needed
  };
  // useEffect(() => {
  //   if (component.name === 'TestMsap2') {
  //     setStateByKey && setStateByKey('hey', 's');
  //   }
  // }, [component.name]);

  return (
    <Renderer
      component={{
        ...component,
        states: states,
        passAttributes: {
          ...component.passAttributes,
          reactActions: {
            [`setState${component.uuid.replaceAll('-', '')}`]: setStateByKey,
            [`useInterval${component.uuid.replaceAll('-', '')}`]: (
              watchKeys: any,
              callbacks: any,
              delay: any
            ) => callbacks && useInterval(watchKeys, callbacks, states, delay),
          },
        },
      }}
      fromClient={true}
    />
  );
};

export default StateRenderer;
