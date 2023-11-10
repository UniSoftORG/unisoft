'use client'
import { memo } from 'react'
import Renderer from '@/renderer/Render'
import { useDynamicStates } from '@/utils/React/Managers/StateManager'
import { useInterval } from '@/utils/React/Managers/TimeManager'
import { IComponentType } from '@/types'

const ClientRenderer: React.FC<{
  component: IComponentType
  index: number
  passFromParent?: any
}> = ({ component, index, passFromParent }) => {

  const [states, setStateByKey] = component.states
    ? useDynamicStates(component.states)
    : []

  return (
    <Renderer
      component={{
        ...component,
        states: states,
        passAttributes: {
          ...component.passAttributes,
            ...states,
          reactActions: {
            setState: setStateByKey,
            useInterval: (watchKeys: any, callbacks: any, delay: any) =>
              callbacks && useInterval(watchKeys, callbacks, states, delay),
            // useEffect: (watchKeys: any, callbacks: any) =>
            //   callbacks && useEffect(watchKeys, callbacks, states),
          },
        },
      }}
      index={index}
      passFromParent={{ ...passFromParent, ...states }}
      fromClient={true}
      key={`${component.uuid}-${index}`}
    />
  )
}

export default memo(ClientRenderer)
