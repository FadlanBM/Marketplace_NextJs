"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export async function registerUser(
  prevState: RegisterState,
  formData: FormData,
) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = registerSchema.safeParse({
    username,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed",
    };
  }

  const {
    username: userName,
    email: userEmail,
    password: userPassword,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (existingUser) {
      return {
        message: "Email already in use",
      };
    }

    await prisma.user.create({
      data: {
        username: userName,
        email: userEmail,
        password_hash: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  redirect("/login");
}
