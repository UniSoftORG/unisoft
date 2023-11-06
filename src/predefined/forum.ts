import {KnownElementTag} from "@/types";
import {generateElement, generateTextField} from "@/definitions/generators";
import {useFunction} from "@/definitions/executors";
import {FunctionNames} from "@/types/uniFunctions";

export const Forum = generateElement(
    "Forum",
    {
        elementAttributes: {
            className: "relative w-full",
        },
        variables: {
            news: []
        },
        functions: [
            useFunction(FunctionNames.consoleLog, {value: "sdf"})
        ],
        dynamic: ['functions.0.attributes.value'],
        children: [
            generateElement('News', {
                mapByKey: "Forum.variables.news",
                children: [
                    generateTextField('TextTest', {
                        receiveAttributes: {
                            title: "News.passAttributes.title",
                            slug: "News.passAttributes.slug"
                        },
                    })
                ],

            }),
        ],
        requests: [
            {
                objKey: 'news',
                method: 'get',
                url: 'forum/threads?limit=4&category=announcements&include=category',
            },
            {
                objKey: 'latest_topics',
                method: 'get',
                url: 'forum/threads?limit=5&include=category',
            },
            {
                objKey: 'mainCategories',
                method: 'get',
                url: 'forum/categories?include=stats, sub_categories',
            }
        ]
    },
    KnownElementTag.Section,
);
