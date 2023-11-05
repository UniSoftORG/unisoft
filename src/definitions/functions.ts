import {IFunction, IUseEffect} from "@/types/functions";


export const useFunction = (watchKeys: string[], executeFunctions: IFunction[], delay: number): IFunction => ({
    name: "useInterval",
    attributes: {
        watchKeys: watchKeys,
        executeFn: [
            {
                name: "setState",
                attributes: {
                    key: "activeSlide",
                    value: "#{${states.activeSlide} === 1 ? 0 : 1}",
                }
            },
        ],
        delay: 4500,
    }
})


export const useInterval = (watchKeys: string[], executeFunctions: IFunction[], delay: number): IUseEffect => ({
    name: "useInterval",
    attributes: {
        watchKeys: watchKeys,
        executeFn: [
            {
                name: "setState",
                attributes: {
                    key: "activeSlide",
                    value: "#{${states.activeSlide} === 1 ? 0 : 1}",
                }
            },
        ],
        delay: 4500,
    }
})