"use client";

import { Checkbox } from "@/src/components/ui/Checkbox";
import { Button } from "@/src/components/ui/Button";
import { PasswordInput } from "../../components/PasswordInput";
import { Input } from "../../components/Input";
import { FormHeader } from "../../components/FormHeader";
import { registerAction } from "../services/actions";
import {
  postUserSchema,
  type PostUserSchema,
} from "../services/validations/post.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PostUserSchema>({
    resolver: zodResolver(postUserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const agree = useWatch({
    control,
    name: "agree",
  });

  const onSubmit = async (data: PostUserSchema) => {
    if (!agree) {
      toast.error("გთხოვთ დაეთანხმოთ.");
      return;
    }
    try {
      const res = await registerAction(data);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      reset();
      router.push("/auth/login");
    } catch {
      toast.error("სერვერის შეცდომა. სცადე თავიდან.");
    }
  };

  return (
    <div className="flex flex-col gap-8 box-border max-w-114 w-full px-5 mx-auto mt-20 py-10 lg:mt-0 lg:py-0 lg:box-content lg:pl-22 lg:pr-20 overflow-hidden">
      <FormHeader
        header="Sign Up"
        text="Already have an account?"
        linkText="Sign In"
        href="/auth/login"
      />

      <form
        className="flex flex-col gap-8 max-w-114 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          id="name"
          placeholder="Your Name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          type="text"
          id="username"
          placeholder="Username"
          error={errors.username?.message}
          {...register("username")}
        />

        <Input
          type="email"
          id="email"
          placeholder="Email address"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          register={register("password")}
          error={errors.password?.message}
        />

        <Checkbox
          id="agree"
          textHtmlFormat={
            <p className="text-(--neutral-light-grey) text-[12px] sm:text-[16px]">
              I agree with{" "}
              <span className="text-black font-semibold">Privacy Policy</span>{" "}
              and <span className="text-black font-semibold">Terms of Use</span>
            </p>
          }
          {...register("agree")}
        />

        <Button
          text={isSubmitting ? "Signing Up..." : "Sign Up"}
          mode="solid"
          rounded="square"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
