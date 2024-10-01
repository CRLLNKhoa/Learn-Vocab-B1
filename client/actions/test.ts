import { db } from "@/lib/firebase";
import { question } from "@/types/questions";
import { addDoc,collection, getDocs, query, where } from "firebase/firestore";

export type TTest = {
    id: string
    slug: string
    content: question[]
    created_at: string
}

export const saveTestData = async (newTest: TTest): Promise<any> => {
    try {
      const docRef = await addDoc(collection(db, "tests"), newTest);
      return {
        status: 200,
        mess: "Lưu dữ liệu thành công !",
        data: newTest,
        id: docRef.id
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return {
        status: 400,
        mess: "Gập lỗi khi lưu !"
      }
    }
  };

  // Hàm để lấy dữ liệu người dùng từ Firestore
export const fetchTestData = async (): Promise<TTest[]> => {
    const usersCollection = collection(db, "tests");
    const userSnapshot = await getDocs(usersCollection);
    const testList: TTest[] = userSnapshot.docs.map((doc) => ({
      id: doc.id, // Lấy ID tài liệu
      ...doc.data(),
    })) as TTest[]; // Chuyển đổi dữ liệu sang kiểu
  
    return testList;
  };


export const fetchTestBySlug = async (slug: string): Promise<TTest> => {
    const testCollection = collection(db, "tests");
    const q = query(testCollection, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    const TestList: TTest[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as TTest[];
  
    return TestList[0];
  };