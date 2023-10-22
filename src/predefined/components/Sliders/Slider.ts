import {createElement} from "@/renderer/helpers/creators";

export const Slider = createElement({
    name: "Slider",
    renderer: "client",
    variables: {
        slides: [
            {
                image: '/images/slider/bg-test.webp',
                href: "/",
            },
            {
                image: '/images/slider/bg-test2.webp',
                href: "/",
            }
        ]
    },
    states: {
        current: "0"
    },
    children: [
        createElement({
            name: 'SliderBackground',
            renderer: "client",
            elementAttributes: {
                className: 'relative w-full bg-cover bg-center h-screen pl-8 pr-8 lg:pl-52 lg:pr-12 grid content-center',
                style: {
                    backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 80%), url(${passAttributes.slides.${passAttributes.current}.image})",
                    backgroundPosition: '60% center',
                    backgroundRepeat: 'no-repeat'
                }
            },
            receiveAttributes: {
                slides: 'Slider.variables.slides',
                current: "Slider.states.current"
            },
            dynamic: ['elementAttributes.style.backgroundImage'],
        })
    ]
}, 'section')