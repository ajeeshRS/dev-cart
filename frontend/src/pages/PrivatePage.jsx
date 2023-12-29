import axios from "axios";
import React, { useEffect, useState } from "react";
import { getHeaders } from "../utils/auth";

function PrivatePage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/user/protected-route",
          {
            headers: getHeaders,
          }
        );
        setData(response.data);
      } catch (err) {
        console.log("error in fetching data");
      }
    };
    fetchData();
  }, []);
  return <div>{data.message}</div>;
}

export default PrivatePage;
