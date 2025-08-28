"use client";

import Link from "next/link";
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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/courses");
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required name="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required name="password" />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <p>
            Register as{" "}
            <Link href="/register/instructor" className="underline">
              Instructor
            </Link>{" "}
            or{" "}
            <Link href="/register/student" className="underline">
              Student
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
