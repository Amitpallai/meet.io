"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { Icons } from "./ui/icons";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { GoogleIcon } from "@100mslive/react-icons";

const socialProviders = [
  { name: "google", color: "#0f172a", icon: GoogleIcon },
];

export default function SocialAuthForm() {
  const [isSocialLoading, setIsSocialLoading] = React.useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSocialSignIn = (provider: string) => {
    setIsSocialLoading((prevLoading) => ({
      ...prevLoading,
      [provider]: true,
    }));

    signIn(provider, {
      callbackUrl: searchParams?.get("from") || "/calls",
      redirect: true,
    })
      .then(() => {
        console.log(`Successfully signed in.`);
        router.push("/calls");
      })
      .catch((error) => {
        console.error(`Error during ${provider} sign-in:`, error);
        toast({
          title: "Error",
          description: `Failed to sign in with ${provider}. Please try again.`,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSocialLoading((prevLoading) => ({
          ...prevLoading,
          [provider]: false,
        }));
      });
  };

  return (
    <section className="w-full mx-auto flex flex-col gap-2">
      {socialProviders.map((provider) => (
        <Button
          key={provider.name}
          size="lg"
          className="font-normal px-1"
          variant="outline"
          onClick={() => handleSocialSignIn(provider.name)}
          disabled={isSocialLoading[provider.name]}
        >
          {isSocialLoading[provider.name] ? (
            <Icons.spinner
              width="16"
              height="16"
              className="mx-3 px-2"
            />
          ) : (
            <provider.icon
              color={provider.color}
              width="16"
              height="16"
              className="mr-3"
            />
          )}
          Continue with {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
        </Button>
      ))}
    </section>
  );
}
