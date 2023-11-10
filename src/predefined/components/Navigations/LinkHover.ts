import {generateElement, generateTextField} from "@/definitions/generators";
import {KnownElementTag} from "@/types";
import {customCondition, ternaryCondition} from "@/definitions/evaluators";
import {getAttribute} from "@/definitions/getters";

export const LinkHover = generateElement(
    "NavLinkHover",
    {
        renderer: 'client',
        receiveAttributes: {
            hovered: "NavLink.states.hovered"
        },
        elementAttributes: {
            className: `${customCondition('${passAttributes.hovered} === ${passAttributes.index} ? animate-slideIn : hidden')} absolute cursor-default box bg-neural-dark bg-opacity-90 arrow-center w-48 rounded-2xl flex flex-col justify-center items-center pl-4  py-3 pr-2 text-center z-40`,
            style: {left: "6.5rem", marginTop: "-4.6rem", minHeight: "5rem"}
        },
        rendererDynamic: ['elementAttributes.className'],
        rendererConditions: ['elementAttributes.className'],
        children: [
            generateElement('TitleText', {
                elementAttributes: {
                    className: 'font-extrabold text-primary text-md'
                },
                children: [
                    generateTextField('Title', {passAttributes: {text: 'test'}}),
                ]
            }, KnownElementTag.Span),
            generateElement('TitleText2', {
                elementAttributes: {
                    className: 'text-xs text-gray-light'
                },
                children: [
                    generateTextField('Title2', {passAttributes: {text: 'test'}})
                ]
            }, KnownElementTag.Paragraph)
        ]
    });
