import { defaultDefinitions } from "@/ai/definitions/functions";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG,
});

const openai = new OpenAIApi(config);

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Hello, I'm Uni, engineered by UniSoft to guide you through website creation with ease.",
      },
      {
        role: "system",
        content:
          "I specialize in assembling websites using predefined objects, aligning them to meet our clients' visions.",
      },
      {
        role: "system",
        content:
          "Our platform is built on the latest version of NextJS, ensuring a robust and efficient rendering experience.",
      },
      {
        role: "system",
        content:
          "I operate using JSON components, allowing for precise customization as per client specifications.",
      },
      {
        role: "system",
        content:
          "My role is to assist you in leveraging our dynamic website builder to craft your ideal website.",
      },
      {
        role: "system",
        content:
          "UniSoft, the innovative software company behind this technology, was founded by Rade Ilijev.",
      },
      ...messages,
    ],
    functions: defaultDefinitions,
    function_call: "auto",
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
