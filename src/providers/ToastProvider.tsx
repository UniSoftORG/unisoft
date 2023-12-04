"use client";
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        className: "",
        style: {
          background: "#8A33E2",
          color: "#E6EAF2",
        },
        success: {
          style: {
            border: "1px solid #24B25D",
            background: "#0F1114",
            color: "#E6EAF2",
            borderRadius: "60px",
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          iconTheme: {
            primary: "#24B25D",
            secondary: "#E6EAF2",
          },
        },
        error: {
          style: {
            border: "1px solid #E23F33",
            background: "#0F1114",
            color: "#E6EAF2",
            borderRadius: "60px",
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          iconTheme: {
            primary: "#E23F33",
            secondary: "#E6EAF2",
          },
        },
      }}
    />
  );
};

export default ToasterProvider;
