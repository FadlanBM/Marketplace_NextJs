"use client";

import Link from "next/link";
import { useActionState, Suspense } from "react";
import { registerUser, type RegisterState } from "@/actions/auth/register";
import { loginWithSocial } from "@/actions/auth/login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/ui/border-beam";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

function RegisterForm() {
  const [state, action, isPending] = useActionState<RegisterState, FormData>(
    registerUser,
    undefined,
  );

  return (
    <Card className="relative w-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Daftar Akun</CardTitle>
        <CardDescription>
          Masukkan informasi Anda untuk membuat akun baru
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={action} className="grid gap-4">
            {state?.message && (
              <Alert variant="destructive" className="w-full">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Pendaftaran Gagal</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="johndoe"
                required
              />
              {state?.errors?.username && (
                <p className="text-destructive text-xs">
                  {state.errors.username[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {state?.errors?.email && (
                <p className="text-destructive text-xs">
                  {state.errors.email[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && (
                <p className="text-destructive text-xs">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Mendaftarkan..." : "Daftar Akun"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau daftar dengan
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => loginWithSocial("google")}
            >
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => loginWithSocial("github")}
            >
              GitHub
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link href="/login" className="underline">
              Masuk
            </Link>
          </div>
        </div>
      </CardContent>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
