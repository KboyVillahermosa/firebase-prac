import React, { useState } from 'react';
import { generateResume } from '../api/pdfGeneratorApi';

const ResumeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    workExperience: '',
    education: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pdfLink = await generateResume(formData);
      window.open(pdfLink);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone" onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" onChange={handleChange} />
      <textarea name="workExperience" placeholder="Work Experience" onChange={handleChange}></textarea>
      <textarea name="education" placeholder="Education" onChange={handleChange}></textarea>
      <button type="submit">Generate Resume</button>
    </form>
  );
};

export default ResumeForm;
