import React from "react";
import { SlRefresh } from "react-icons/sl";

function Loading() {
  return (
    <div className="w-full flex items-center justify-center flex-col">
      <SlRefresh className="size-12 text-sky-600 p-2 rounded-full animate-spin duration-[8000]" />
      <p className="text-sm font-semibold animate-pulse select-none">Đang tải...</p>
    </div>
  );
}

export default Loading;
