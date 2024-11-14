// src/ProtectedPage.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProtectedPage = () => {
  const [message, setMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Make a GET request to the protected route with the token
      axios
        .get("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token as Authorization header
          },
        })
        .then((response) => {
          // Set the response data to the state
          setMessage(response.data.message);
          setUserId(response.data.userId);
        })
        .catch((error) => {
          console.error("Error accessing the protected route:", error);
        });
    } else {
      // If no token is found, set an error message
      setMessage("No token found. Please log in first.");
    }
  }, []);  // This runs only once when the component is mounted

  return (
    <div>
      <h1>Protected Page</h1>
      {message ? (
        <div>
          <p>{message}</p>
          {userId && <p>Your user ID: {userId}</p>} {/* Show userId if available */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProtectedPage;
