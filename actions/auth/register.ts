"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
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
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validasi gagal",
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: "Email sudah terdaftar" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return { message: "Terjadi kesalahan saat pendaftaran" };
  }

  // Redirect ke login setelah sukses
  redirect("/login?message=Registrasi berhasil, silakan login");
}
