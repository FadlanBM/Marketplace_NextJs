"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "@/actions/register";
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

const initialState = {
  message: "",
  errors: undefined,
};

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerUser, initialState);

  return (
    <Card className="relative w-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                name="firstName"
                placeholder="Max"
                required
              />
              {state?.errors?.firstName && (
                <p className="text-red-500 text-xs">{state.errors.firstName}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                name="lastName"
                placeholder="Robinson"
                required
              />
              {state?.errors?.lastName && (
                <p className="text-red-500 text-xs">{state.errors.lastName}</p>
              )}
            </div>
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
              <p className="text-red-500 text-xs">{state.errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
            {state?.errors?.password && (
              <p className="text-red-500 text-xs">{state.errors.password}</p>
            )}
          </div>

          {state?.message && (
            <p className="text-red-500 text-sm text-center">{state.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Create an account"}
          </Button>
          <Button variant="outline" className="w-full" type="button">
            Sign up with GitHub
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
      <BorderBeam duration={8} size={100} />
    </Card>
  );
}
