import {createElement, createTextField} from "@/renderer/helpers/creators";
import InitiateRenderer from "@/renderer/InitiateRenderer";
import {Slider} from "@/predefined/components/Sliders/Slider";

export default async function Home() {
    const pageComponents = [
        createElement({
            name: "TestElement",
            variables: {
                data: [
                    {
                        test1: 'test1'
                    },
                    {
                        test2: 'test2'
                    }
                ]
            },
            states: {
                dynamicState: "${variables.data}",
                staticState: 'defaultTestValues',
                testState: 'asdasd'
            },
            children: [
                createElement({
                    name: 'ChildTest',
                    receiveAttributes: {
                        attributeName: 'TestElement.states.staticState'
                    },
                    states: {
                        cde: 'Rade'
                    },
                    children: [
                        createElement({
                            name: 'ChildChildTest',
                            receiveAttributes: {
                                attributeName: 'TestElement.states.staticState',
                                attributeName2: 'TestElement.states.dynamicState'
                            },
                            children: [
                                createElement({
                                    name: 'ERa',
                                    receiveAttributes: {
                                        as: 'ChildTest.states.cde',
                                        ata: 'TestElement.states.testState'
                                    },
                                    children: [
                                        createElement({
                                            name: 'Rade',
                                            receiveAttributes: {
                                                ata: 'TestElement.states.staticState'
                                            }
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ],
            dynamic: [
                "states.dynamicState"
            ]
        }, 'div')
    ];

    return await InitiateRenderer([Slider])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/*{JSON.stringify(Transformers.replaceTargetedStrings(inputJson, inputJson.dynamic))}*/}
            {/*<InitiateRenderer template={testComponents}/>*/}
        </main>
    )
}
