"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <div className="h-[180px] bg-white shadow-lg mt-4 rounded-lg grid grid-cols-3 p-4">
      <div className="flex col-span-2 flex-col items-center justify-center pr-4">
        <p>{`58 / 248 words learned (51 in long term memory)`}</p>
        <div className="h-5 bg-slate-200 w-full rounded-lg shadow-md relative mt-4">
          <div className="h-5 bg-black w-1/2 rounded-lg shadow-md"></div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button size={"sm"} variant="default">
            Speed test
          </Button>
          <Button size={"sm"} variant="default">
            Học ngay
          </Button>
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center border-l gap-4 flex-col">
        <p>Đăng nhập để lưu kết quả học tập</p>
        <Button size={"sm"}>Đăng nhập</Button>
      </div>
    </div>
  );
}

export default Hero;
