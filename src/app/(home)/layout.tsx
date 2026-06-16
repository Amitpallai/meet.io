import Link from "next/link";
import FullNav from "~/components/layout/full-nav";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { getCurrentUser } from "~/lib/session";

export default async function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col">
      <FullNav>
        <div className="flex items-center gap-x-2.5">
          {user ? (
            <Link href="/calls">
              <Button size="sm" className="rounded-md">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button
                  className="mr-2 hidden rounded-md font-normal sm:block"
                  variant="ghost"
                  size="sm"
                >
                  Sign in
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  className="rounded-md text-xs font-normal md:text-[12px]"
                  size="sm"
                >
                  Get started
                </Button>
              </Link>
            </>
          )}

          <ModeToggle />
        </div>
      </FullNav>

      <main className="w-full flex-1">{children}</main>
    </div>
  );
}