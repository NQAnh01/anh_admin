"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, Menu } from "lucide-react";

import { navLinks } from "@/lib/constants";
import { Separator } from "../ui/separator";

const TopBar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image
        src="/logo.png"
        alt="logo"
        width={150}
        height={70}
        onClick={() => router.push("/")}
        style={{ cursor: "pointer" }}
      />

      {/* <div className="flex gap-5 max-lg:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
        <div className="flex gap-4 text-body-medium items-center">
          {user ? (
            <>
              <UserButton showName={true} />
            </>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <Link href={"/sign-in"}>
                <CircleUserRound />
              </Link>
            </div>
          )}
        </div>
      </div> */}

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
            <Separator className="-my-5" />
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
        )}
      </div>
    </div>
  );
};

export default TopBar;
