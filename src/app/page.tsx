import {createElement, createTextField} from "@/renderer/helpers/creators";
import InitiateRenderer from "@/renderer/InitiateRenderer";

export default async function Home() {
    const inputJson: any = {
        test: "Test",
        props: {
            testKey: 0,
            testKey2: '1',
            val1: "Test",
            obj1: {
                obj2: {
                    val2: "Test2"
                }
            },
            array1: [
                "Test3",
                "Test4"
            ],
            array2: [
                {
                    obj3: {
                        val4: "Test5"
                    }
                }
            ]
        },
        target: {
            val: "example string with replacements ${props.val1}",
            val2: "example 2 ${props.obj1.obj2.val2}",
            val3: "example 3 ${props.array1.${props.testKey2}}",
            val4: "example 4 ${props.array2.${props.testKey}.obj3.val4}",
            val5: "example 5 ${test}"
        },
        dynamic: [
            "target.val",
            "target.val2",
            "target.val3",
            "target.val4",
            "target.val5"
        ]
    };


    const testComponents = [createTextField({
        name: 'CategoryTitleText',
        props: {text: 'Test'},
    })]

    const test = [
        createElement({
            name: "TestElement",
            childen: testComponents,
            attrs: {}
        })
    ];

    // return JSON.stringify(testComponents)
    return await InitiateRenderer(testComponents)

    // return (
    //     <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //         {/*{JSON.stringify(Transformers.replaceTargetedStrings(inputJson, inputJson.dynamic))}*/}
    //         {/*<InitiateRenderer template={testComponents}/>*/}
    //     </main>
    // )
}
