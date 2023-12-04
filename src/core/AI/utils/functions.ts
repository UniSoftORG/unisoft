import { Message, nanoid } from "ai";

export const functionResponse = (
  chatMessages: Message[],
  functionCallName: string,
  message: string,
  role: Message["role"] = "function"
) => {
  return {
    messages: [
      ...chatMessages,
      {
        id: nanoid(),
        name: functionCallName,
        role: role,
        content: message,
      },
    ],
  };
};
