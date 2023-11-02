import {createElement} from "@/renderer/helpers/creators";


const functionTaskss = [
    {
        name: "setState",
        attributes: {
            key: "current",
            value: "#{${states.current} === 1 ? '0' : 1}"
        }
    },

];

const functionTasks = [
    {
        name: "useInterval",
        attributes: {
            watchKeys: ["current"],
            delay: 1500
        },
        callbacks: [
            {
                name: "setState",
                attributes: {
                    key: "current",
                    value: "#{${states.current} === 1 ? '0' : 1}"
                }
            }
        ]
    }
];
//
// const functionTasks = [
//     {
//         name: "after",
//         attributes: {
//             subject: "parentReturn",
//             search: "pa"
//         },
//         callbacks: [
//             {
//                 name: "before",
//                 attributes: {
//                     subject: "parentReturn",
//                     search: "rn"
//                 },
//                 callbacks: [
//                     {
//                         name: "consoleLog",
//                         attributes: {
//                             value: "parentReturn",
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// ];

export const Slider = createElement(
    {
        name: "Slider",
        renderer: "client",
        elementAttributes: {
            className: "relative h-screen w-full",
        },
        variables: {
            slides: [
                {
                    image: "/images/slider/bg-test.webp",
                    href: "/",
                },
                {
                    image: "/images/slider/bg-test2.webp",
                    href: "/",
                }
            ],
        },
        functions: functionTasks,
        states: {
            current: 0,
            testState: "Rade",
        },
        dynamic: ['functions.0.callbacks.1.attributes.value', 'functions.0.callbacks.0.attributes.value'],
        conditions: ['functions.0.callbacks.0.attributes.value'],
        children: [
            createElement({
                name: "SliderBackground",
                renderer: "client",
                mapByKey: "Slider.variables.slides",
                elementAttributes: {
                    className:
                        "absolute w-full bg-cover bg-center h-full pl-8 pr-8 lg:pl-52 lg:pr-12 grid content-center transition duration-500 #{${passAttributes.index} === ${passAttributes.current} ? opacity-100 : opacity-0}",
                    style: {
                        backgroundImage:
                            "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 80%), url(${passAttributes.image})",
                        backgroundPosition: "60% center",
                        backgroundRepeat: "no-repeat",
                    },
                },
                receiveAttributes: {
                    slides: "Slider.variables.slides",
                    current: "Slider.states.current",
                    parent: "Slider.name"
                },
                dynamic: [
                    "elementAttributes.style.backgroundImage",
                    "elementAttributes.className"
                ],
                conditions: ["elementAttributes.className"],
            }),
        ],
    },
    "section",
);
