import { forms } from "@/data/forms/login";
import { FormField, FormSection, YupBoolean, YupString } from "@/types";
import * as Yup from "yup";

const generateValidations = (field: FormField) => {
  if (!field.validations) return null;

  let schema: Yup.Schema = Yup[field.typeValue || "string"]();

  for (const rule of field.validations) {
    switch (rule.type) {
      case "isTrue":
        schema = (schema as YupBoolean).isTrue(rule.message);
        break;
      case "isEmail":
        schema = (schema as YupString).email(rule.message);
        break;
      case "minLength":
        schema = (schema as YupString).min(rule?.value as number, rule.message);
        break;
      case "oneOf":
        schema = (schema as YupString).oneOf(
          [Yup.ref((rule as any).ref)],
          rule.message
        );
        break;
      default:
        schema = schema.required(rule.message);
        break;
    }
  }

  return schema;
};

export const getInputs = <T extends FormSection>(section: T) => {
  let initialValues: { [key: string]: any } = {};

  let validationsFields: { [key: string]: any } = {};

  for (const field of forms[section]) {
    initialValues[field.name] = field.value;

    if (!field.validations) continue;

    validationsFields[field.name] = generateValidations(field);
  }

  return {
    validationSchema: Yup.object({ ...validationsFields }),
    initialValues: initialValues,
    inputs: forms[section],
  };
};
