"use client";
import { functionCallHandler } from "@/core/AI/functions/test";
import { useChat } from "ai/react";

export const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/ai",
    experimental_onFunctionCall: functionCallHandler,
  });

  return (
    <div>
      {messages.map((m) => {
        return (
          <div key={m.id}>
            {m.role}: {m.content}
          </div>
        );
      })}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder='Say something...'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
};
