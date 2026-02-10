"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
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
  const email = formData.get("email");
  const password = formData.get("password");

  const validated = loginSchema.safeParse({
    email,
    password,
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Validasi gagal",
    };
  }

  const { email: userEmail, password: userPassword } = validated.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return { message: "Email atau password salah" };
    }

    const isPasswordMatch = await bcrypt.compare(userPassword, user.password_hash);

    if (!isPasswordMatch) {
      return { message: "Email atau password salah" };
    }
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Gagal melakukan login." };
  }

  redirect("/");
}
