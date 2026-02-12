"use client";

import { useActionState, Suspense } from "react";
import { loginUser, loginWithSocial } from "@/actions/auth/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BorderBeam } from "@/components/ui/border-beam";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const urlError =
    searchParams.get("error") === "OAuthSignin"
      ? "Gagal login dengan penyedia eksternal."
      : "";

  const [state, formAction, isPending] = useActionState(loginUser, undefined);

  return (
    <Card className="relative w-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Masukkan email Anda di bawah ini untuk masuk ke akun Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form action={formAction} className="grid gap-4">
            {(state?.message || urlError) && (
              <Alert variant="destructive" className="w-full">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Login Gagal</AlertTitle>
                <AlertDescription>
                  {state?.message || urlError}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && (
                <p className="text-destructive text-xs">
                  {state.errors.password[0]}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sedang masuk..." : "Login"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau lanjut dengan
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
        </div>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm w-full">
          Belum punya akun?{" "}
          <Link href="/register" className="underline">
            Daftar
          </Link>
        </div>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <LoginForm />
    </Suspense>
  );
}
