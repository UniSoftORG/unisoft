import {KnownElementTag, Operators} from "@/types";
import {generateElement, generateImage, generateTextField} from "@/definitions/generators";
import User from "@/public/icons/user.svg";
import {LinkHover} from "@/predefined/components/Navigations/LinkHover";
import {createEvent, setState, useFunction, useInterval} from "@/definitions/executors";
import {Events} from "@/types/events";
import {getState} from "@/definitions/getters";
import {ternaryCondition} from "@/definitions/evaluators";

export const Link = generateElement(
    "NavLink",
    {
        renderer: 'client',
        mapByKey: 'Nav.variables.links',
        elementAttributes: {
            className: 'animate-zoomIn',
        },
        states: {
            hovered: 'as'
        },
        functions: [
            useInterval(["hovered"],
                [
                    setState("hovered", 'false'),
                ], 10000,
            ),
        ],
        // onEvents: [
        //     createEvent(Events.onClick, [
        //         setState('hovered', 'true'),
        //         useFunction('consoleLog', {value: '${states.hovered}'}),
        //     ]),
        //     // createEvent(Events.onMouseLeave, [
        //     //     setState('hovered', 'falsessss'),
        //     //
        //     // ])
        // ],
        // functions: [
        //     useFunction('consoleLog', {value: '${states.hovered}'}),
        // ],
        rendererDynamic: ['functions.0.attributes.callbacks.1.attributes.value'],
        children: [
            generateElement('Link', {
                // onEvents: [
                //     // createEvent(Events.onClick, [
                //     //     useFunction('consoleLog', {value: getState('hovered')}),
                //     // ]),
                //     // createEvent(Events.onMouseLeave, [
                //     //     setState('hovered', 'falsessss'),
                //     //
                //     // ])
                // ],
                // receiveAttributes: {
                //     hovered: "NavLink.states.hovered"
                // },
                // rendererDynamic: ['onEvents.0.callbacks.1.attributes.value'],
                children: [
                    generateElement('LinkButton', {
                        elementAttributes: {
                            className: 'flex justify-center items-center rounded-lg px-8 py-6 z-50',
                            style: {minWidth: "2.5rem"}
                        },
                        children: [
                            generateImage('LinkIcon', {
                                elementAttributes: {
                                    ['src' as any]: User,
                                    className: 'transition-transform duration-500 ease-in-out'
                                }
                            }, 24),
                            // generateTextField('LinkText', {
                            //     passAttributes: {
                            //         text: 'asdasd'
                            //     }
                            // })
                        ]
                    }, KnownElementTag.Button)
                ]
            }),
            LinkHover
        ]
    },
    KnownElementTag.Li,
);
