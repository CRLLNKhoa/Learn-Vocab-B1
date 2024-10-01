import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { MdOutlineDragIndicator } from "react-icons/md";
import { PiTagSimpleLight } from "react-icons/pi";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

function CardQuestion({ id, content }: { id: number; content: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="select-none flex items-center bg-white shadow-lg p-2 rounded-md cursor-pointer"
    >
      <div className="flex items-center justify-center p-2 hover:bg-slate-100 rounded-md duration-300 cursor-move">
        <MdOutlineDragIndicator className="size-5" />
      </div>
      <p className="text-slate-800 font-semibold ml-4">{content.word.word}</p>
      <div className="ml-auto flex items-center gap-2">
        <PiTagSimpleLight />
        <p
          className={cn(
            "text-sm font-semibold uppercase",
            content.type === "new" && "text-sky-500",
            content.type === "typing" && "text-green-500",
            content.type === "options" && "text-red-500"
          )}
        >
          {content.type}
        </p>
      </div>
    </div>
  );
}

export default CardQuestion;
