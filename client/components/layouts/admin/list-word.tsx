"use client";
import { TWord } from "@/actions/words";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import Word from "@/components/ui/word";

function ListWord({ data }: { data: TWord[] }) {

  return (
    <div className="flex flex-col mt-4 gap-2">
      {data.map((item, index) => (
        <Word word={item} index={index} />
      ))}
    </div>
  );
}

export default ListWord;
