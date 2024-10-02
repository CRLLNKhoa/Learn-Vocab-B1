"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdOutlineGTranslate } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";

function Header() {
    const pathname = usePathname()
  return (
    <header className="bg-white shadow-lg flex h-[80px] items-center z-50 sticky top-0 left-0 right-0">
      <div className="max-w-5xl mx-auto flex w-full">
        <div className="flex items-center gap-1 select-none cursor-pointer text-sky-500">
          <MdOutlineGTranslate className="mr-auto size-12" />
          <p className="text-2xl font-bold translate-y-1">VocabB1</p>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href={"/"}
            className={cn("flex items-center gap-2 text-muted-foreground font-bold px-4 py-2 rounded-md hover:bg-slate-200 duration-500",
                (pathname !== "/profile" && pathname !== "/setting") && "text-sky-500"
            )}
          >
            <TiHome className="size-6" />
            <p className="translate-y-[2px]"> Trang chủ</p>
          </Link>
          <Link
            href={"/profile"}
            className={cn("flex items-center gap-2 text-muted-foreground font-bold px-4 py-2 rounded-md hover:bg-slate-200 duration-500",
                pathname == "/profile" && "text-sky-500"
            )}
          >
            <FaUser className="size-5" />
            <p className="translate-y-[2px]"> Hồ sơ</p>
          </Link>
          <Link
            href={"/setting"}
            className={cn("flex items-center gap-2 text-muted-foreground font-bold px-4 py-2 rounded-md hover:bg-slate-200 duration-500",
                pathname == "/setting" && "text-sky-500"
            )}
          >
            <RiSettings4Fill className="size-6" />
            <p className="translate-y-[2px]"> Cài đặt</p>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
