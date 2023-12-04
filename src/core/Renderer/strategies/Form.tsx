"use client";
import { CustomInput } from "@/core/Forms/Fields/Input";
import { getInputs } from "@/core/Forms/generateFields";
import { FormField, FormProps, FormSection } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

export const Form: React.FC<FormProps> = ({ name, requestHandler }) => {
  const { initialValues, inputs, validationSchema } =
    getInputs<FormSection>(name);

  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { ...(initialValues as any) },
  });

  const createInputs = () =>
    inputs.map(
      ({ validations, typeValue, value, ...inputProps }: FormField) => {
        return <CustomInput {...inputProps} key={inputProps.name} />;
      }
    );

  const handleSubmit = async (data: any) => {
    if (requestHandler) {
      requestHandler(data);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className='bg-secondary rounded-md p-10 pt-5 shadow-2xl shadow-primary/30 flex flex-col gap-2 border border-primary w-full min-h-[390px]'>
        <section className='flex-1 flex flex-col gap-3'>
          {createInputs()}
        </section>

        <button
          className='bg-primary transition-opacity text-white w-full rounded-md py-2 hover:opacity-90 active:opacity-100 font-bold mt-4'
          onClick={formMethods.handleSubmit(handleSubmit)}
        >
          ad
        </button>
      </form>
    </FormProvider>
  );
};
