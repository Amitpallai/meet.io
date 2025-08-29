import { type Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SocialAuthForm from "~/components/social-auth-form";
import { AuthLayout } from "~/components/auth/auth-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";

export const metadata: Metadata = {
  title: "Meet.io - Connect with Ease",
  description:
    "Sign in to Meet.io and start connecting with your friends, family, and colleagues through seamless video calls.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Card className="w-full max-w-md p-4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        {/* ✅ Wrap in Suspense to fix useSearchParams error */}
        <Suspense fallback={<div>Loading...</div>}>
          <SocialAuthForm />
        </Suspense>

        <CardFooter className="flex flex-col space-y-4 py-4">
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
