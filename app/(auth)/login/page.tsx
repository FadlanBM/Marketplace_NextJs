"use client";

import Link from "next/link";
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
import { loginUser } from "@/actions/login";
import { useActionState } from "react";

const initialState = {
  message: "",
  errors: undefined,
};

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginUser, initialState);

  return (
    <Card className="relative w-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              {isPending ? "Logging in..." : "Login with Google"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm w-full">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
