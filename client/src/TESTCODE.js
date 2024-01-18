import { useEffect, useState } from "react";

function TestCode() {

  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (data.length > 0) return;
  
    async function getData() {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTE0MGYxMTFhOTZmZmIwOWU0NGM5ZCIsImlhdCI6MTcwNTA2NjkyNn0.-GffXBG_rR-kBQJWpbs2COzW3GVNAHnL0aidwWMD10o'
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET',
        headers: {Authorization: `Token ${token}`}
      });
      const data = await response.json();
      setData(data);
    }
    getData()
  });
}
