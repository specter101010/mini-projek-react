import  { useState, useEffect } from "react";

function UserData({ apiKey, accessToken }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        const response = await fetch(
          `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${accessToken}`
        );
        const data = await response.json();
        setUserData(data);
      }
    };
    fetchUserData();
  }, [apiKey, accessToken]);

  return userData;
}

export default UserData;
