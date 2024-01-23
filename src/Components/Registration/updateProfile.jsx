import React, { useState } from 'react';
import axios from 'axios';

const UpdateProfile = ({ userId }) => {
  const [skills, setSkills] = useState('');
  const [lookingFor, setLookingFor] = useState('');

  const handleUpdateProfile = () => {
    axios.patch(`http://localhost:3001/profile/${userId}`, { skills, lookingFor })
      .then(response => {
        // Handle success
        console.log(response.data);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <div className="mb-4">
        <label htmlFor="skills" className="block text-sm font-medium text-gray-600">
          Skills (comma-separated)
        </label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lookingFor" className="block text-sm font-medium text-gray-600">
          Looking For
        </label>
        <input
          type="text"
          id="lookingFor"
          name="lookingFor"
          value={lookingFor}
          onChange={(e) => setLookingFor(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        type="button"
        onClick={handleUpdateProfile}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
  );
};
