import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TWord } from "./words";
import { TTopic } from "@/app/admin/topics/page";

export type TLesson = {
  id?: string;
  lesson_id: string;
  lesson_index?: number;
  topic_id: string;
  lesson_name: string;
  lesson_description: string;
  lesson_status: boolean;
  lesson_content: Array<any>;
  lesson_created_at: string;
  lesson_word: Array<TWord>;
  lesson_topic?: TTopic;
  lesson_image?: string;
};

export const addLessonToDB = async (newLesson: TLesson): Promise<any> => {
  const index = new Date().getTime();
  try {
    const docRef = await addDoc(collection(db, "lessons"), {
      ...newLesson,
      lesson_index: Number(index),
    });
    return {
      status: 200,
      mess: "Lưu dữ liệu thành công !",
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      status: 400,
      mess: "Gập lỗi khi lưu !",
    };
  }
};

export const getLessionsFromDB = async (): Promise<any> => {
  const lessonsCollection = collection(db, "lessons");
  const lessonsSnapshot = await getDocs(lessonsCollection);
  const lessons: TLesson[] = lessonsSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as TLesson)
  );

  const lessonsWithTopics = await Promise.all(
    lessons.map(async (lesson) => {
      const topicSnapshot = await getDocs(
        query(
          collection(db, "topics"),
          where("topic_id", "==", lesson.topic_id)
        )
      );
      const topic = topicSnapshot.docs.map(
        (doc) => ({ topic_id: doc.id, ...doc.data() } as TTopic)
      )[0];
      return { ...lesson, lesson_topic: topic }; // Thêm topic vào bài học
    })
  );

  return lessonsWithTopics;
};

export const updateLessonDB = async (lesson: TLesson) => {
  const lessonsRef = collection(db, "lessons"); // Giả sử "lessons" là tên bộ sưu tập
  const q = query(lessonsRef, where("lesson_id", "==", lesson.lesson_id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        status: "error",
        message: "Không tìm thấy tài liệu nào với lesson ID không.",
      };
    }

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, lesson);
    });

    return { status: "success", message: "Đã thay đổi dữ liệu !" };
  } catch (error: any) {
    return {
      status: "error",
      message: `Lỗi khi thay đổi dữ liệu: ${error.message}`,
    };
  }
};

export const deleteLessonDB = async (lesson_id: string) => {
  const lessonsRef = collection(db, "lessons"); // Giả sử "lessons" là tên bộ súu tập
  const q = query(lessonsRef, where("lesson_id", "==", lesson_id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        status: "error",
        message: "Không tìm thấy tài liệu nào với lesson ID không.",
      };
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return { status: "success", message: "Tài liệu đã được xóa này !" };
  } catch (error: any) {
    return {
      status: "error",
      message: `Lỗi khi xóa tài liệu: ${error.message}`,
    };
  }
};
