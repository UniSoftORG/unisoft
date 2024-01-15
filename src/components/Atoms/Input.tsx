"use client";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  hidden?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
  errors?: FieldErrors<T>;
  autocomplete?: string;
  scale?: boolean;
}

const InputField = <T extends FieldValues>({
  id,
  label,
  type = "text",
  hidden,
  disabled,
  register,
  required,
  error,
  errors,
  autocomplete,
  scale,
}: InputProps<T>) => {
  return (
    <div
      className={`${hidden ? "hidden" : "w-full relative"} ${
        scale ? "scale-y-90" : ""
      }`}
    >
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        autoComplete={autocomplete}
        className={`
          peer
          w-full
          p-4
          pt-6
          bg-neural-dark
          font-light
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
          ${error ? "border-red-darker" : "border-gray-700"}
          ${errors && errors[id] ? "border-red-darker" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute 
          duration-150 
          transform 
          top-5 
          z-10 
          origin-[0] 
          left-4
          text-blue
          scale-75
          -translate-y-4
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:text-white
          peer-focus:scale-75
          peer-focus:text-blue
          peer-focus:-translate-y-4
          pointer-events-none
          font-semibold
          ${error ? "text-red" : "text-zinc-400"}
          ${errors && errors[id] && "text-red"}
        `}
      >
        {label}
        {error && (
          <span className={"text-orange text truncate"}>
            {" "}
            ({error.message !== "" ? error.message : `required`})
          </span>
        )}
        {errors && errors[id] && (
          <span className={"text-red text truncate"}>
            {" "}
            (
            {errors[id]?.message !== ""
              ? (errors[id]?.message as string)
              : `required`}
            )
          </span>
        )}
      </label>
    </div>
  );
};

export default InputField;
