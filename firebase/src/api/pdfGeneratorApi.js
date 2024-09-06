import axios from 'axios';

const API_URL = 'https://us1.pdfgeneratorapi.com/api/v4/documents/generate';
const API_KEY = 'YOUR_API_KEY'; // Replace with your API Key
const TEMPLATE_ID = '1193798'; // Replace with your template ID

export const generateResume = async (formData) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        template: {
          id: TEMPLATE_ID,
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
        }
      }
    );
    
    return response.data.download_url;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
