import React from "react";
import CardTopic from "./card-topic";

const listtopic = [
  {
    index: 1,
    name_topic: "Transport (Giao thông)",
    progress: 100,
    slug: "vocab-topic-1",
  },
  {
    index: 2,
    name_topic: "City (Thành phố)",
    progress: 100,
    slug: "vocab-topic-2",
  },
  {
    index: 3,
    name_topic: "Countryside (Miền quê)",
    progress: 90,
    slug: "vocab-topic-3",
  },
  {
    index: 4,
    name_topic: "Health (Sức khỏe)",
    progress: 20,
    slug: "vocab-topic-4",
  },
  {
    index: 5,
    name_topic: "Hobbies (Sở thích)",
    progress: 5,
    slug: "vocab-topic-5",
  },
  {
    index: 6,
    name_topic: "Environment (Môi trường)",
    progress: 0,
    slug: "vocab-topic-6",
  },
  {
    index: 7,
    name_topic: "Describe a person (Miêu tả người)",
    progress: 0,
    slug: "vocab-topic-7",
  },
  {
    index: 8,
    name_topic: "Technology (Công nghệ)",
    progress: 0,
    slug: "vocab-topic-8",
  },
  {
    index: 9,
    name_topic: "Holiday (Du lịch)",
    progress: 0,
    slug: "vocab-topic-9",
  },
  {
    index: 10,
    name_topic: "Job/Study (Công việc/Học tập)",
    progress: 0,
    slug: "vocab-topic-10",
  },
  {
    index: 11,
    name_topic: "Crime (Tội phạm)",
    progress: 0,
    slug: "vocab-topic-11",
  },
  {
    index: 12,
    name_topic: "Machine (Máy mốc)",
    progress: 0,
    slug: "vocab-topic-12",
  },
  {
    index: 13,
    name_topic: "Foreign languages (Ngoại ngữ)",
    progress: 0,
    slug: "vocab-topic-13",
  },
  {
    index: 14,
    name_topic: "House/Flat (Nhà/Căn hộ)",
    progress: 0,
    slug: "vocab-topic-14",
  },
  {
    index: 15,
    name_topic: "Pollution (Ô nhiễm không khí",
    progress: 0,
    slug: "vocab-topic-15",
  },
  {
    index: 16,
    name_topic: "Tourism and Pollution (Du lịch và ô nhiễm)",
    progress: 0,
    slug: "vocab-topic-16",
  },
];

function ListTopic() {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col">
      <h1 className="font-semibold text-lg ml-5">Danh sách chủ đề</h1>
      <p className='-translate-y-1 text-sm ml-5'>Các chủ đề phổ biến thường gặp nhất trong các bài thi tiếng Anh B1.</p>
      <div className="grid grid-cols-6 mt-4">
        {listtopic.map((item) => (
          <CardTopic
            key={item.index}
            index={item.index}
            name_topic={item.name_topic}
            progress={item.progress}
            slug={item.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default ListTopic;
