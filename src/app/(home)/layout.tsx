import Link from "next/link";
import SiteFooter from "~/components/layout/footer";
import FullNav from "~/components/layout/full-nav";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <FullNav>
        <div className="flex gap-x-2.5 items-center">
          <Link href={"/login"}>
            <Button
              className="mr-2 hidden rounded-md font-normal sm:block"
              variant="ghost"
              size="sm"
            >
              Sign in
            </Button>
          </Link>
          <Link href={"/register"}>
            <Button
              className="rounded-md text-xs font-normal md:text-[12px]"
              size="sm"
            >
              Get started
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </FullNav>
      <main className="w-full flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
