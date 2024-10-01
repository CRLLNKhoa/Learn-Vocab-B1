import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  index: number;
  name_topic: string;
  progress: number;
  slug: string;
};

function CardTopic({ index, name_topic, progress, slug }: Props) {
  return (
    <Link href={`/topic/${slug}`} className="flex flex-col rounded-md items-center p-3">
      <div
        className="w-full rounded-md p-2 cursor-pointer group overflow-hidden 
          border border-transparent hover:border-slate-200 duration-500 hover:shadow-md"
      >
        <div className="h-[160px] w-full rounded-md relative bg-slate-200 flex items-center justify-center">
          <div
            className="absolute bg-white h-10 w-8 rounded-full pt-2 select-none
              -top-4 right-1/2 translate-x-1/2 flex items-center justify-center font-semibold text-md text-slate-500"
          >
            {index}
          </div>
          <div className="h-2/3 w-1/2">
          <img
              src={cn(progress === 0 && "/level0.png",
                progress > 0 && progress < 25 && "/level1.png",
                progress > 25 && progress < 100 && "/level2.png",
                progress === 100 && "/level3.png"
              )}
              alt="icon-status"
              className="w-full h-full"
            />
          </div>

          {progress > 0 ? (
            <div
              className="h-2 rounded-sm shadow-xs bg-slate-300 absolute 
                left-2 right-2 bottom-2"
            >
              <div style={{ width: `${progress}%` }} className={cn("h-full bg-yellow-500 rounded-sm w-1/2"
              )}></div>
            </div>
          ) : (
            <p className="text-xs text-center absolute bottom-1">Nhấn để học</p>
          )}
        </div>
        <h2 className="text-center mt-2 text-sm font-semibold group-hover:text-sky-600 duration-300">
          {name_topic}
        </h2>
      </div>
    </Link>
  );
}

export default CardTopic;
