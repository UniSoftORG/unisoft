import { useEffect as useFromReact } from 'react'

export const useEffect = (
  watchKeys: string[],
  callbacks: () => void,
  states: any
) => {
    useFromReact(
    () => {
        if(callbacks){
            callbacks()
        }
    },
    watchKeys.map((key) => states[key])
  )
}
