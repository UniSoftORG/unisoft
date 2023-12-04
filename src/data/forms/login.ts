import { FormSection, FormStructure, ValidationType } from "@/types";

export const forms: FormStructure<FormSection> = {
  [FormSection.Login]: [
    {
      label: "E-mail address",
      type: "email",
      name: "email",
      placeholder: "correo@correo.com",
      value: "",
      validations: [
        {
          type: ValidationType.required,
          message: "Email is required",
        },
        {
          type: ValidationType.isEmail,
          message: "Email no valid",
        },
      ],
    },
  ],
};
