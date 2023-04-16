import React from 'react';

const userContext = React.createContext(null);

export default userContext;
// const response = await fetch(
//           `https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`,
//           {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               session_id: accessToken
//             }),
//           }
//         );