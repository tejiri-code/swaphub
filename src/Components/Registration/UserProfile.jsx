import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/profile/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, [userId]);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Skills:</strong> {user.skills}</p>
      <p><strong>Looking For:</strong> {user.lookingFor}</p>
    </div>
  );
};
export default UserProfile;