import { useState, useEffect } from 'react';

const useCurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Sử dụng định dạng 24 giờ
      });
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 60000); // Cập nhật mỗi phút

    return () => clearInterval(intervalId); // Clear interval khi component unmount
  }, []);

  return currentDateTime;
};

export default useCurrentDateTime;
