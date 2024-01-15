import Button from "@/components/Atoms/Button";
import Input from "@/components/Atoms/Input";
import useModal from "@/core/Modals/hooks/useModal";
import { DefaultModalType } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const LoginModal = () => {
  const { activeComponent, onOpen } = useModal();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);

  const onToggle = useCallback(() => {
    onOpen(DefaultModalType.REGISTER);
  }, [onOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
      twoFactorCode: "",
    },
  });

  useEffect(() => {}, []);
  // useEffect(() => {
  //   if (searchParams?.get("callbackUrl")) {
  //     loginModal.onOpen();
  //   }
  // }, [searchParams]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        onOpen(undefined);
        router.refresh();
      } else if (callback?.error) {
        if (callback.error === "Two-factor authentication required") {
          toast.success("2FA code sent to your email!");
          setTwoFactorRequired(true);
        } else {
          setError("username", {
            type: "api",
            message: "Wrong credentials" as string,
          });
          setError("password", {
            type: "api",
            message: "Wrong credentials" as string,
          });
          toast.error(callback.error);
        }
      }
    });
  };

  return (
    <>
      <form
        className='flex flex-col gap-4 items-center justify-center'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/*<Heading*/}
        {/*    title="Welcome back"*/}
        {/*    subtitle="Login to your account!"*/}
        {/*/>*/}

        {twoFactorRequired ? (
          <Input
            id='twoFactorCode'
            label='Two-Factor Code'
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        ) : (
          <>
            <Input
              id='username'
              label='Email or username'
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
              register={register}
              errors={errors}
              required
            />

            <div className='flex justify-center items-center'>
              <span
                onClick={() => console.log("forgot password")}
                className='
    text-gray
    font-semibold
    cursor-pointer
    text-sm
    '
              >
                {" "}
                Forgot password?
              </span>
            </div>
          </>
        )}

        <Button
          gradient={"red-dark"}
          className={"mt-3 -mb-2 justify-center py-4 w-1/2"}
          label={"Login"}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <div className='flex flex-col gap-4'>
        <div
          className='
  text-neutral-500 text-center font-light'
        >
          <p>
            First time using KGB?
            <span
              onClick={onToggle}
              className='
  text-blue
  font-bold
  cursor-pointer
  hover:underline
  '
            >
              {" "}
              Create an account
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
