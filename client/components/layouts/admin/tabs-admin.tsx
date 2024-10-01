"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function TabsAdmin() {
  return (
    <div className="flex flex-col gap-2">
      <Tab title="Thống kê chung" url={"/admin"} path={["/admin"]} />
      <Tab
        title="Quản lý topic"
        url={"/admin/topics"}
        path={["/admin/topics"]}
      />
      <Tab
        title="Quản lý từ vựng"
        url={"/admin/words"}
        path={["/admin/words"]}
      />
      <Tab
        title="Quản lý bài học"
        url={"/admin/lessons"}
        path={["/admin/lessons", "/admin/lessons/add"]}
      />
      <Tab
        title="Quản lý bài nghe"
        url={"/admin/listens"}
        path={["/admin/listens"]}
      />
      <Tab
        title="Quản lý bài đọc"
        url={"/admin/readings"}
        path={["/admin/readings"]}
      />
      <Tab
        title="Quản lý người dùng"
        url={"/admin/users"}
        path={["/admin/users"]}
      />
    </div>
  );
}

export default TabsAdmin;

const Tab = ({
  title,
  url,
  path,
}: {
  title: string;
  url: string;
  path: string[];
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      className={cn(
        "h-10 flex items-center pl-4 text-sky-600 font-bold rounded-sm cursor-pointer hover:text-white hover:bg-sky-600 duration-300",
        path.includes(pathname) && "bg-sky-600 text-white"
      )}
    >
      <p>{title}</p>
    </Link>
  );
};
