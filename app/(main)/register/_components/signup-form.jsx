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

export function SignupForm({ role }) {
  const [error, setError] = useState(null);

  const router = useRouter();

  //  handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const firstName = formData.get("first-name");
      const lastName = formData.get("last-name");
      const email = formData.get("email");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");
      const userRole =
        role === "student" || role === "instructor" ? role : "student";

      if (password != confirmPassword) {
        setError("Password ar not Match");
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          userRole,
        }),
      });

      if (res.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          {error && (
            <p className="text-red-500 text-md font-bold mb-2 text-center">
              {" "}
              {error}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  name="first-name"
                  placeholder="Max"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  name="last-name"
                  placeholder="Robinson"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Create an account
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
