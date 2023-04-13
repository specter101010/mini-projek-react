import { useState, useEffect } from "react";

const UserData = ({ apiKey, accessToken }) => {
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

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Data:</h2>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
      <p>Name: {userData.name}</p>
      <p>Language: {userData.iso_639_1}</p>
    </div>
  );
};

export default UserData;
