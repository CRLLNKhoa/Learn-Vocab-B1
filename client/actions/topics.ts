import { TTopic } from "@/app/admin/topics/page";
import { db } from "@/lib/firebase";
import { addDoc,collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";


export const addTopicIntoDB = async (newTopic: TTopic): Promise<any> => {
    try {
      const docRef = await addDoc(collection(db, "topics"), newTopic);
      return {
        status: 200,
        mess: "Lưu dữ liệu thành công !",
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return {
        status: 400,
        mess: "Gập lỗi khi lưu !"
      }
    }
  };


export const getTopicsFromDB = async () => {
  const q = query(collection(db, "topics"));
  const querySnapshot = await getDocs(q);
  const topics = querySnapshot.docs.map((doc) => doc.data() as TTopic);
  return topics;
}

export const getTopicByID = async (slug: string) => {
  const q = query(collection(db, "topics"), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  const topics = querySnapshot.docs.map((doc) => doc.data() as TTopic);
  return topics[0];
}

export const updateTopicDB = async (topic: TTopic) => {
    const topicsRef = collection(db, "topics"); // Giả sử "topics" là tên bộ sưu tập
    const q = query(topicsRef, where("topic_id", "==", topic.topic_id));
  
    try {
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log("Không tìm thấy tài liệu nào với topic ID này.");
        return;
      }
  
      querySnapshot.forEach(async (doc) => {
        // Thực hiện cập nhật tài liệu
       await updateDoc(doc.ref, topic);
        console.log(`Tài liệu với ID ${doc.id} đã được cập nhật.`);
      });
      return {
        status: 200,
        mess: "Cập nhật thành công !"
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật tài liệu: ", error);
      return {
        status: 400,
        mess: "Gập lỗi khi cập nhật !"
      }
    }
}

export const deleteTopicDB = async (topicId: string) => {
    const topicsRef = collection(db, "topics"); // Giả sử "topics" là tên bộ sưu tập
    const q = query(topicsRef, where("topic_id", "==", topicId));
  
    try {
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        return { status: "error", message: "Không tìm thấy tài liệu nào với topic ID này." };
      }
  
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
  
      return { status: "success", message: "Tài liệu đã được xóa thành công." };
  
    } catch (error:any) {
      return { status: "error", message: `Lỗi khi xóa tài liệu: ${error.message}` };
    }
}