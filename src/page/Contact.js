import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';  
import Navbar from './Navbar';
import logoImage from "../assets/rect.png";
import Footer from './Footer';
import BASE_URL from './Appconfig';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    phonenumber: '',
    Description: ''
  });

  const updateProperty = (propertyName, value) => {
    setFormData(prevData => ({
      ...prevData,
      [propertyName]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
  
      const accessToken = localStorage.getItem('token');

      if (!accessToken) {
        throw new Error('Access token is missing');
      }

      console.log(accessToken)

  
  
      const response = await axios.post(
        `${BASE_URL}/api/contact/`,
        formData,
        {
          timeout: 5000,
          headers:{ 
            'Content-Type': 'multipart/form-data',
            'Authorization': `token ${accessToken}`,
          }
        }
      );
  
      if (response.data["Details"] === "Success") {
        console.log(response.data["Details"]);
        console.log(formData)
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 bg-slate-900'>
        <div className='container mx-auto px-4 py-8'>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">Connect with us for general enquiries</h1>
            <div className="flex flex-col md:flex-row justify-center items-center">
              <div className="md:w-1/2">
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="name">Name *</label>
                    <input
                      type="text"
                      value={formData.Name}
                      placeholder="Enter your name"
                      onChange={(e) => updateProperty("Name", e.target.value)}
                      className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">Email *</label>
                    <input
                      type="email"
                      value={formData.Email}
                      placeholder="Enter your email"
                      onChange={(e) => updateProperty("Email", e.target.value)}
                      className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="mobile">Mobile *</label>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={formData.phonenumber}
                      onChange={(e) => updateProperty("phonenumber", e.target.value)}
                      className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="message">Message *</label>
                    <textarea
                      value={formData.Description}
                      placeholder="Enter your message"
                      onChange={(e) => updateProperty("Description", e.target.value)}
                      rows="4"
                      className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
                    Submit
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 md:ml-4 mt-4 md:mt-0">
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold mb-2">Ways you can reach us</h2>
                  <img
                        loading="lazy"
                        src={logoImage}
                        className=' pl-[20%] py-[4%] '
                        alt="logo"
                    />
                  <div className="mb-2 pl-[35%] flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
                    <span>(0422) 222 4000</span>
                  </div>
                  <div className="mb-2 pl-[35%] flex items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
                    <span>(0422) 222 4001</span>
                  </div>
                  <div className="mb-2 pl-[35%] flex items-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
                    <span className='w-[50%]'>8/732 Avinashi Road, Coimbatore 641018, India</span>
                  </div>
                  <div className="flex pl-[35%] items-center">
                    <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 mr-2" />
                    <a href="mailto:admin@iccicbe.in" className="text-blue-500 hover:underline">admin@iccicbe.in</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
