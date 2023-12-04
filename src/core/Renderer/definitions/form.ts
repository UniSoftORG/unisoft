import { FormField, FormSection, IFormOptions } from "@/types";

export const generateForm = <TForm extends FormSection>(
  form: IFormOptions<TForm>,
  fields: FormField[]
) => ({
  form,
});

export const generateInput = (props: FormField) => props;

// export const forms: { [K in FormSection]: InputProps[] } =
//   {
//     [K]: [],
//   }
