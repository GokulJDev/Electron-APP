import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Role:</strong> Admin</p>
      </div>
    </div>
  );
};

export default Profile;
