import React, { useState } from "react";
import { api } from "../../api/base"; 
import { toast } from "react-hot-toast";
import './MentorForm.css';


const MentorForm = () => {
  const [mentor, setMentor] = useState({
    name: "",
    description: "",
    linkedIn: "",
    email: "",
    url: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentor((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setMentor((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(mentor).forEach((key) => formData.append(key, mentor[key]));

    try {
      const response = await api.post("/mentors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      setMentor({ name: "", description: "", linkedIn: "", email: "", url: "", photo: null });
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data.error || "Failed to create mentor");
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} encType="multipart/form-data">
  //      <div className="username" style={{ marginTop: "1rem" }}>Name</div>
  //     <input type="text" name="name" value={mentor.name} onChange={handleChange} placeholder="Name" required />
  //     <div className="username" style={{ marginTop: "1rem" }}>Description</div>
  //     <textarea name="description" value={mentor.description} onChange={handleChange} placeholder="Description" required />
  //     <div className="username" style={{ marginTop: "1rem" }}>LinkedIn URL</div>
  //     <input type="url" name="linkedIn" value={mentor.linkedIn} onChange={handleChange} placeholder="LinkedIn URL" required />
  //     <div className="username" style={{ marginTop: "1rem" }}>Email</div>
  //     <input type="email" name="email" value={mentor.email} onChange={handleChange} placeholder="Email" required />
  //     <div className="username" style={{ marginTop: "1rem" }}>Website URL</div>
  //     <input type="url" name="url" value={mentor.url} onChange={handleChange} placeholder="Personal Website URL" />
  //     <div className="username" style={{ marginTop: "1rem" }}>Photo</div>
  //     <input type="file" name="photo" onChange={handleFileChange} accept="image/*" required />
  //     <button type="submit">Add Mentor</button>
  //   </form>
  // );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="username" style={{ marginTop: "1rem" }}>Name</div>
        <input type="text" name="name" value={mentor.name} onChange={handleChange} placeholder="Name" required />
        <div className="username" style={{ marginTop: "1rem" }}>Email</div>
        <input type="email" name="email" value={mentor.email} onChange={handleChange} placeholder="Email" required />
        <div className="username" style={{ marginTop: "1rem" }}>LinkedIn URL</div>
        <input type="url" name="linkedIn" value={mentor.linkedIn} onChange={handleChange} placeholder="LinkedIn URL" required />
        <div className="username" style={{ marginTop: "1rem" }}>Description</div>
        <textarea name="description" value={mentor.description} onChange={handleChange} placeholder="Description" required />
        <div className="username" style={{ marginTop: "1rem" }}>Website URL</div>
        <input type="url" name="url" value={mentor.url} onChange={handleChange} placeholder="Personal Website URL" />
        <div className="username" style={{ marginTop: "1rem" }}>Photo</div>
        <input type="file" name="photo" onChange={handleFileChange} accept="image/*" required />
        <button type="submit">Add </button>
      </form>
    </div>
  );
  
};

export default MentorForm;
