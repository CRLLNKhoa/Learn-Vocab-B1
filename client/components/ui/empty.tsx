import React from "react";
import { RxValueNone } from "react-icons/rx";

function Empty() {
  return <div className="flex flex-col items-center justify-center">
    <RxValueNone className="size-12 mb-2 text-sky-600" />
    <p className="text-sm font-semibold select-none">Không tìm thấy dữ liệu</p>
  </div>;
}

export default Empty;
