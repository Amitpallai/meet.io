import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthLayout } from "~/components/auth/auth-layout";
import SocialAuthForm from "~/components/social-auth-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Meet.io - Sign Up",
  description:
    "Create your account today and start connecting with friends, family, and colleagues through seamless video calls.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        {/* ✅ Suspense wrapper for useSearchParams */}
        <Suspense fallback={<div>Loading...</div>}>
          <SocialAuthForm />
        </Suspense>

        <CardFooter className="flex flex-col space-y-4 py-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
