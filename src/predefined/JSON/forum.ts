import {
  getLatestAnnouncements,
  getLatestTopics,
  getMainCategories,
} from "@/core/Backend/Endpoints/forum";
import {
  generateElement,
  generateTextField,
} from "@/core/Renderer/definitions/generators";
import { KnownElementTag } from "@/types";

export const Forum = generateElement(
  "Forum",
  {
    elementAttributes: {
      className: "relative w-full",
    },
    variables: {
      news: [],
      latest_topics: [],
      mainCategories: [],
    },
    dynamic: ["functions.py.ts.0.attributes.value"],
    children: [
      generateElement("News", {
        mapByKey: "Forum.variables.news",
        children: [
          generateTextField("TextTest", {
            receiveAttributes: {
              text: "News.passAttributes.title",
              slug: "News.passAttributes.slug",
            },
          }),
        ],
      }),
    ],
    requests: [
      {
        objKey: "news",
        ...getLatestAnnouncements,
      },
      {
        objKey: "latest_topics",
        ...getLatestTopics,
      },
      {
        objKey: "mainCategories",
        ...getMainCategories,
      },
    ],
  },
  KnownElementTag.Section
);
