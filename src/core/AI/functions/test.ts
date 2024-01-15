import { functionResponse } from "@/core/AI/utils/functions";
import { generateElement } from "@/core/Renderer/definitions/generators";
import { Slider } from "@/predefined/JSON/Sliders/Slider";
import { HomePage } from "@/template/pages/home";
import { FunctionCall, Message } from "ai";

export const functionCallHandler = async (
  chatMessages: Message[],
  functionCall: FunctionCall
) => {
  if (functionCall.name === "create_element") {
    const parsedFunctionCallArguments = functionCall.arguments
      ? JSON.parse(functionCall.arguments)
      : {};
    const el = generateElement(
      parsedFunctionCallArguments.name as string,
      {
        elementAttributes: {
          className: parsedFunctionCallArguments.className,
        },
      },
      parsedFunctionCallArguments.type
    );
    return functionResponse(
      chatMessages,
      functionCall.name,
      JSON.stringify(el)
    );
  } else if (functionCall.name == "example_component") {
    return functionResponse(
      chatMessages,
      functionCall.name,
      JSON.stringify(Slider)
    );
  } else if (functionCall.name == "current_page_components") {
    return functionResponse(
      chatMessages,
      functionCall.name,
      JSON.stringify(HomePage)
    );
  }
};
