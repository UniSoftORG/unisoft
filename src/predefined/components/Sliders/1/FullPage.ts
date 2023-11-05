import {createElement} from "@/definitions/creators";

const FullPageSliderBackground = createElement('SliderBackground', {
    mapByKey: "Slider.variables.slides",
    elementAttributes: {
        className:
            "absolute w-full bg-cover bg-center h-full pl-8 pr-8 lg:pl-52 lg:pr-12 grid content-center transition duration-500 #{${passAttributes.index} === ${passAttributes.activeSlide} ? opacity-100 : opacity-0}",
        style: {
            backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 80%), url(${passAttributes.image})",
            backgroundPosition: "60% center",
            backgroundRepeat: "no-repeat",
        },
    },
    receiveAttributes: {
        slides: "Slider.variables.slides",
        activeSlide: "Slider.states.activeSlide",
        parent: "Slider.name",
    },
    dynamic: [
        "elementAttributes.style.backgroundImage",
        "elementAttributes.className",
    ],
    conditions: ["elementAttributes.className"]
})