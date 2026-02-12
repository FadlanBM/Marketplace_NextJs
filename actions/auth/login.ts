"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type LoginState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function loginUser(prevState: LoginState, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validasi gagal",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/user-dashboard", // Or use callbackUrl if passed
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Email atau password salah" };
        default:
          return { message: "Terjadi kesalahan sistem" };
      }
    }
    throw error; // Let Next.js handle the redirect
  }
}

export async function loginWithSocial(provider: string) {
  try {
    await signIn(provider, { redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: `Gagal login dengan ${provider}` };
    }
    throw error;
  }
}
