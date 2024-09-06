import React, { useState } from 'react';
import axios from 'axios';

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

    const templateId = '1193798'; // Replace with your template ID

    try {
      const response = await axios.post(
        'https://us1.pdfgeneratorapi.com/api/v4/documents/generate',
        {
          template: {
            id: templateId,
            data: formData
          },
          format: 'pdf',
          output: 'url',
          name: 'Resume'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhMjIwYzBjYzg1ZWIzNDMzOWY4MWUwNTJjYTJlMjNhZTQyYjRmNGEwNzhmMGI0NzExNDM0YmIwOGY1MjczMTQwIiwic3ViIjoidmlsbGFoZXJtb3NhZnJhbmNpc2NvNkBnbWFpbC5jb20iLCJleHAiOjE3MjU1MTY5NjZ9.KwpmAO38HlMZQudhxTmbSd_ZwCgl0KA2sP0vDnn6C9c",
            "Content-Type": "application/json",
          }
        }
      );

      const pdfLink = response.data.download_url;
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
