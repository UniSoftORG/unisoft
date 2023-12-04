"use client";
import Input from "@/components/Atoms/Input";
import { signUp } from "@/core/Backend/Auth/login";
import { IRegisterRequest } from "@/types";
import { isGenericApiError } from "@/types/guards/api";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IRegisterRequest>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<IRegisterRequest> = async (data) => {
    setIsLoading(false);

    const response = await signUp(data);

    if (!isGenericApiError(response)) {
      toast.success("Registered! Check your email for verification!");
      // registerModal.onClose();
    } else {
      toast.error(response.message ?? "Something went wrong");
      if (response.errors) {
        Object.entries(response.errors).forEach(([field, error]) => {
          setError(field as keyof IRegisterRequest, {
            type: "api",
            message: (error as string[]).join(", "),
          });
        });
      }
    }
    setIsLoading(false);
  };

  // const onToggle = useCallback(() => {
  //   registerModal.onClose();
  //   loginModal.onOpen();
  // }, [registerModal, loginModal]);

  return (
    <div className='flex flex-col gap-4'>
      {/*<Heading*/}
      {/*    title="Welcome to Airbnb"*/}
      {/*    subtitle="Create an account!"*/}
      {/*/>*/}
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='username'
        label='Username'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={(field) =>
          register(field, {
            required: true,
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })
        }
        errors={errors}
      />
      <Input
        id='password_confirmation'
        label='Confirm password'
        type='password'
        disabled={isLoading}
        autocomplete={"off"}
        register={(field) =>
          register(field, {
            required: true,
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Passwords does not match";
              }
            },
          })
        }
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <div
        className='
          text-neutral-500
          text-center
          mt-4
          font-light
        '
      >
        <p>
          Already have an account?
          <span
            // onClick={onToggle}
            className='
              text-neutral-800
              cursor-pointer
              hover:underline
            '
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
