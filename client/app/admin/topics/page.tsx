"use client";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdEditNote, MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useTopicStore } from "@/stores/topicStore";
import Loading from "@/components/ui/loading";
import Empty from "@/components/ui/empty";
import toast from "react-hot-toast";
import { IoSaveOutline, IoTimeOutline } from "react-icons/io5";
import useCurrentDateTime from "@/hooks/useTime";
import { FaTruckLoading } from "react-icons/fa";
import AddTopic from "@/components/ui/add-topic";
import { deleteTopicDB, getTopicsFromDB, updateTopicDB } from "@/actions/topics";

export type TTopic = {
  topic_id: string;
  topic_name: string;
  topic_status: boolean;
  topic_created_at: string;
  topic_note: string;
  topic_index?: number;
};

const data = [
  {
    topic_id: "1",
    topic_name: "Tiêu đề 1",
    topic_status: true,
    topic_note: "Đã thêm 2 giờ trước",
    topic_created_at: "2023-01-01 00:00:00",
  },
  {
    topic_id: "2",
    topic_name: "Tiêu đề 2",
    topic_status: false,
    topic_note: "Đã thêm 2 giờ trước",
    topic_created_at: "2023-01-01 00:00:00",
  },
];

function TopicsPage() {
  const listTopic = useTopicStore((state: any) => state.listTopic);
  const getListTopic = useTopicStore((state: any) => state.getListTopic);
  const status = useTopicStore((state: any) => state.status);
  const setStatus = useTopicStore((state: any) => state.setStatus);

  useEffect(() => {
    const get = async () => {
      const request = await getTopicsFromDB();
      getListTopic(request);
      setStatus("success");
    };
    get();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold text-xl">Quản lý chủ đề</h1>
      <div className="flex items-center justify-end">
        <AddTopic />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {status === "success" &&
          listTopic.map((item: TTopic) => (
            <CardTopic
              topic_id={item.topic_id}
              topic_name={item.topic_name}
              topic_status={item.topic_status}
              topic_note={item.topic_note}
              key={item.topic_id}
              topic_created_at={item.topic_created_at}
            />
          ))}
      </div>
      {status === "loading" && <Loading />}
      {status === "success" && listTopic.length === 0 && <Empty />}
    </div>
  );
}

export default TopicsPage;

const CardTopic = ({
  topic_id,
  topic_name,
  topic_status,
  topic_note,
  topic_created_at,
}: TTopic) => {
  const [state, setState] = useState<TTopic>({
    topic_id: topic_id,
    topic_name: topic_name,
    topic_status: topic_status,
    topic_created_at: topic_created_at,
    topic_note: topic_note,
  });
  const currentDateTime = useCurrentDateTime();
  const removeTopic = useTopicStore((state: any) => state.removeTopic);
  const updateTopic = useTopicStore((state: any) => state.updateTopic);
  const [isEdit, setIsEdit] = useState(false);
  const [valueInput, setValueInput] = useState(topic_name);
  const [processing, setProcessing] = useState(false);

  const handleEdit = async () => {
    setIsEdit(false);
    setProcessing(true);
    if (valueInput === "") {
      toast.error("Vui long nhập tên cho chủ đề !");
      return;
    }
    const request = await updateTopicDB({
      ...state,
      topic_name: valueInput,
      topic_note: `Đã chỉnh sửa lúc: ${currentDateTime}`,
    });
    if (request?.status === 200) {
      setState({
        ...state,
        topic_name: valueInput,
        topic_note: `Đã chỉnh sửa lúc: ${currentDateTime}`,
      });
      updateTopic({
        ...state,
        topic_note: `Đã chỉnh sửa lúc: ${currentDateTime}`,
      });
      toast.success(request?.mess);
      setProcessing(false);
    } else {
      setProcessing(false);
      toast.error("Cập nhật dữ liệu không thành công !");
    }
  };

  const handleDelete = async () => {
    setProcessing(true);
    const confirmDelete = window.confirm("Bạn có muốn xoá chủ đề này ?");
    if (confirmDelete) {
      const data = await deleteTopicDB(state.topic_id);
      if (data?.status === "success") {
        removeTopic(state.topic_id);
        setProcessing(false)
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
        setProcessing(false)
      }
    }
  };

  const handleStatus = async () => {
    setProcessing(true);
    if (state.topic_status === true) {
      const request = await updateTopicDB({
        ...state,
        topic_status: false,
      });
      if (request?.status === 200) {
        setState({
          ...state,
          topic_status: !state.topic_status,
          topic_note: `Đã ẩn lúc: ${currentDateTime}`,
        });
        updateTopic({
          ...state,
          topic_status: !state.topic_status,
          topic_note: `Đã ẩn lúc: ${currentDateTime}`,
        });
      }
      setProcessing(false);
    } else {
      const request = await updateTopicDB({
        ...state,
        topic_status: true,
      });
      if (request?.status === 200) {
        setState({
          ...state,
          topic_status: true,
          topic_note: `Đã công khai: ${currentDateTime}`,
        });
        updateTopic({
          ...state,
          topic_status: true,
          topic_note: `Đã công khai: ${currentDateTime}`,
        });
      }
      setProcessing(false);
    }
  };

  return (
    <div className="w-full h-40 bg-[#DCE7E9] rounded-lg flex flex-col p-4">
      {isEdit ? (
        <input
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          type="text"
          className=" outline-none border bg-white border-sky-600 px-4 py-2 rounded-lg"
          placeholder="Nhập tên chủ đề"
        />
      ) : (
        <h2 className="text-lg font-semibold line-clamp-1">
          {state.topic_name}
        </h2>
      )}
      <p className="text-sm  flex items-center gap-1">
        <IoTimeOutline className="size-4" /> {state.topic_created_at}
      </p>
      <p className="flex items-center gap-1 mt-2">
        <MdEditNote className="size-6" />
        {state.topic_note}
      </p>
      {isEdit ? (
        <Button
          onClick={handleEdit}
          className="text-sm bg-sky-600 hover:bg-sky-500 duration-300 mt-auto"
        >
          <IoSaveOutline className="mr-2 text-lg" /> Lưu lại
        </Button>
      ) : (
        <div className="flex items-center justify-end mt-auto gap-4">
          <button
            disabled={processing}
            onClick={handleStatus}
            id={`#btn-toogle-${state.topic_id}`}
            className="border-sky-600 border text-sky-600 h-8 w-12 rounded-lg
      flex items-center justify-center"
          >
            {!processing &&
              (state.topic_status ? (
                <FaRegEye className="size-5" />
              ) : (
                <FaRegEyeSlash className="size-5" />
              ))}
            {processing && (
              <AiOutlineLoading3Quarters className="size-5 animate-spin" />
            )}
          </button>
          <button
            disabled={processing}
            onClick={() => setIsEdit(!isEdit)}
            id="btn-edit"
            className="border-sky-600 border text-sky-600 h-8 w-12 rounded-lg
      flex items-center justify-center"
          >
            {processing ? (
              <AiOutlineLoading3Quarters className="size-5 animate-spin" />
            ) : (
              <MdOutlineEdit className="size-5" />
            )}
          </button>
          <button
            disabled={processing}
            onClick={handleDelete}
            id="btn-delete"
            className="border-sky-600 border text-sky-600 h-8 w-12 rounded-lg
      flex items-center justify-center"
          >
            {processing ? (
              <AiOutlineLoading3Quarters className="size-5 animate-spin" />
            ) : (
              <AiOutlineDelete className="size-5" />
            )}
          </button>

          <Tooltip hidden={processing} anchorSelect="#btn-edit" place="top">
            Chỉnh sửa
          </Tooltip>
          <Tooltip hidden={processing} anchorSelect="#btn-delete" place="top">
            Xóa chủ đề
          </Tooltip>
          <Tooltip
            hidden={processing}
            anchorSelect={`#btn-toogle-${state.topic_id}`}
            place="top"
          >
            {state.topic_status ? "Ẩn chủ đề" : "Công khai"}
          </Tooltip>
        </div>
      )}
    </div>
  );
};
