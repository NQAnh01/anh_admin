"use client";
import { navLinks } from "@/lib/constants";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Separator } from "../ui/separator";

const LeftSideBar = () => {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={150}
        height={70}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <Separator className="bg-grey-1 -my-10" />

      <div className="flex gap-4 text-body-medium items-center">
        {user ? (
          <>
            <UserButton showName={true} />
          </>
        ) : (
          <div className="flex justify-center items-center gap-2">
            <CircleUserRound />
            <Link href={"/sign-in"}>Sign-in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSideBar;
