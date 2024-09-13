// ContactForm.js
import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import { FaFacebook, FaInstagramSquare, FaGithubSquare } from "react-icons/fa";

import './Contact.css'


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        timestamp: new Date(),
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  
    <div className="contact-header p-4  rounded-lg">
       <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="contact-image">
      <h1 className='text-4xl font-medium text-pink-500 font-bold mb-2'>Contact Us</h1>
      <p className='text-gray-600'>We'd love to hear from you! Whether you have questions, feedback, or need assistance, feel free to reach out.
         Our team is here to help with any inquiries you may have. Simply fill out our contact form, and we’ll get back to you as soon as possible.
          We're committed to providing top-notch support, so don't hesitate to get in touch!</p>
          <div className="social-icons inline-flex mt-3 gap-2">
          <FaFacebook className='text-3xl text-pink-500 hover:text-pink-600'/>
          <FaInstagramSquare className='text-3xl text-pink-500 hover:text-pink-600' />
          <FaGithubSquare  className='text-3xl text-pink-500 hover:text-pink-600'/>
          </div>
      </div>
      <div className="contact-content">
      {success && <p className="text-green-500 mb-4">Your message has been sent successfully!</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-1 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
    </div>
    </>
  );
};

export default ContactForm;
