"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
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
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = registerSchema.safeParse({
    firstName,
    lastName,
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
    firstName: fName,
    lastName: lName,
    email: userEmail,
    password: userPassword,
  } = validatedFields.data;

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
        name: `${fName} ${lName}`,
        email: userEmail,
        password: userPassword,
        role: Role.USER,
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
