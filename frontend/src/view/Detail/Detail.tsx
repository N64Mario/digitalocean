import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { parameter } = useParams();
  const [link, setLink] = useState(null); // Initialize with null
  const dataFetchedRef = useRef(false);
  const fetchData = async () => {
    if (parameter) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/get/${parameter}`
        );
        window.location.href = response.data.link;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    fetchData();
  }, []);

  return (
    <div className="body__detail">
      <div className="spinner"></div>
    </div>
  );
}

export default Detail;
