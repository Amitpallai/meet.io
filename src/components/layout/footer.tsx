import Link from "next/link";
import React from "react";

export default function SiteFooter() {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <footer className="bottom-0 mt-auto w-screen pb-8 pt-8">
      <div
        className="
                  container mx-auto flex max-w-[1400px]
                  flex-col justify-center gap-4 font-normal text-neutral-700
                 items-center
                "
      >
        <p className="flex text-xs leading-5 text-neutral-500 justify-center gap-1 ">
          &copy; {`${year}`} Built by 
          <Link
            href="https://amitpallai.vercel.app"
            className="underline hover:text-neutral-600"
          >
             Amit pallai
          </Link>
         {". "}
          All rights reserved.</p>
      </div>
    </footer>
  );
}
