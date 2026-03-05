"use client";

import { Button } from "@/src/components/ui/Button";
import { FormHeader } from "../../components/FormHeader";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/src/components/ui/Checkbox";
import Link from "next/link";

import {
  LoginFormSchema,
  loginFormSchema,
} from "../services/validations/loginFormValidation";
import { loginAction } from "../services/action";
import { toast } from "sonner";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userSearchValue: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = useWatch({
    control,
    name: "rememberMe",
  });

  const onSubmit = async (data: LoginFormSchema) => {
    const result = loginFormSchema.safeParse(data);
    console.log(data);

    if (!result.success) {
      toast.error("არასწორი ველები!");
      return;
    }

    try {
      await loginAction(data);
      reset();
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
        return;
      }
      toast.error("სერვერის შეცდომა. სცადე თავიდან.");
    }
  };

  return (
    <div className="flex flex-col gap-8 box-border max-w-114 w-full px-5 mx-auto mt-20 py-10 lg:mt-0 lg:py-0 lg:box-content lg:pl-22 lg:pr-20">
      <FormHeader
        header={"Sign In"}
        text={"Don't have an accout yet?"}
        linkText={"Sign Up"}
        href={"/auth/signup"}
      />

      <form
        className="flex flex-col gap-8 max-w-114 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          id="userSearchValue"
          placeholder="Your username or email address"
          {...register("userSearchValue")}
        />

        <PasswordInput register={register("password")} />

        <input type="hidden" name="rememberMe" value={String(rememberMe)} />

        <div className="flex justify-between items-center">
          <Checkbox
            id="rememberMe"
            checked={!!rememberMe}
            textHtmlFormat={<p>Remember Me</p>}
            {...register("rememberMe")}
          />

          <Link
            href="/auth/forgor-password"
            className="text-black font-semibold leading-6.5"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          text={isSubmitting ? "Signing In" : "Sign In"}
          mode="solid"
          rounded="square"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
