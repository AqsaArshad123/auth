import React, { useState, useEffect } from "react";
import { getMe } from "../../apis/api.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await getMe();
      setProfile(response.data);
    } catch (err) {
      setError("Failed to fetch profile data. Please login again.");
      console.error("Error fetching profile:", err);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchProfile();
  });

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
      <p>Email: {profile.email}</p>
      <p>Contact: {profile.contact}</p>
      <p>Gender: {profile.gender}</p>
      <p>Country: {profile.country}</p>
    </div>
  );
};

export default Profile;
