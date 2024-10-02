import { db } from "@/lib/firebase";
import { UniqueIdentifier } from "@dnd-kit/core";
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

export type TWord = {
  word_id: string;
  word: string;
  transcription: string
  mean: string;
  example: string;
  topic_id: string;
  audio: string;
  created_at: string;
  id: number;
  word_index?: number;
};

export const addWordIntoDB = async (newWord: TWord): Promise<any> => {
  const index = new Date().getTime();
  try {
    const docRef = await addDoc(collection(db, "words"), {
      ...newWord,
      word_index: Number(index),
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

export const updateWordDB = async (word: TWord) => {
  const wordsRef = collection(db, "words"); // Giả sử "words" là tên bộ sưu tập
  const q = query(wordsRef, where("word_id", "==", word.word_id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: "error", message: "Không tìm thấy tài liệu nào với word ID không." };
    }

    querySnapshot.forEach(async (doc) => {
      await updateDoc(doc.ref, {
        word: word.word,
        transcription: word.transcription,
        mean: word.mean,
        example: word.example,
        topic_id: word.topic_id,
        audio: word.audio,
      });
    });

    return { status: "success", message: "Đã thay đổi dữ liệu !" };
  } catch (error:any) {
    return { status: "error", message: `Lỗi khi thay đổi dữ liệu: ${error.message}` };
  }
}

export const deleteWordDB = async (word_id: string) => {
  const wordsRef = collection(db, "words"); // Giả s,..."words" là tên bộ súu tập
  const q = query(wordsRef, where("word_id", "==", word_id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: "error", message: "Khong t,Integero v-that!" };
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return { status: "success", message: "Xóa từ vựng thành công !" };
  } catch (error:any) {
    return { status: "error", message: `Lỗi khi xóa dữ liệu: ${error.message}` };
  }
}

export const getWordByIDTopic = async (topic_id: string) => {
  const q = query(collection(db, "words"), where("topic_id", "==", topic_id));
  const querySnapshot = await getDocs(q);
  const words = querySnapshot.docs.map((doc) => doc.data() as TWord);
  return words;
};
