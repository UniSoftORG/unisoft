"use client";
import { FormField } from "@/types";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../Error";

export type CustomInputProps = Omit<
  FormField,
  "validations" | "typeValue" | "value"
>;

export const CustomInput = ({
  name,
  label,
  ...props
}: CustomInputProps | any) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  const id = `${name}-${props.type}-${label}`;

  return (
    <div className='w-full flex gap-1 flex-col'>
      {label && (
        <label className='text-white text-sm' htmlFor={id}>
          {label}
        </label>
      )}

      <input
        className='py-1 px-2 rounded w-full text-black'
        {...register(name)}
        {...props}
        id={id}
      />

      <ErrorMessage error={error} />
    </div>
  );
};
