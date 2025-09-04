import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Send, 
  AlertTriangle 
} from 'lucide-react';
import API_URL from '../constants/Constants';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
  
    try {
      const response = await fetch(`${API_URL}/contact/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const result = await response.json();
  
      if (result.success) {
        setStatus('success');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
        {/* Contact Info Section */}
        <div className="bg-slate-600 text-white p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
          
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 shrink-0" />
            <div className='flex flex-col'>
              <span>Beatitude House, </span>
            <span>Okapi Hotel, 4th Floor, Room 22</span>
            <span>Muhima Sector, Nyarugenge District, Kigali City</span>
            </div>
            
          </div>
          
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 shrink-0" />
            <div>
              <div>+250 788 67 64 58</div>
              <div>+250 785 025 495</div>
              <div>Hot Line: 6020</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 shrink-0" />
            <span>topinforwanda@gmail.com</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <p className="text-gray-600 mb-6">We reply within 24 hours!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700 flex items-center">
                <User className="mr-2 w-5 h-5 text-slate-600" /> Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700 flex items-center">
                <Mail className="mr-2 w-5 h-5 text-slate-600" /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-gray-700 flex items-center">
                <AlertTriangle className="mr-2 w-5 h-5 text-slate-600" /> Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Message Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-gray-700 flex items-center">
                <Send className="mr-2 w-5 h-5 text-slate-600" /> Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-slate-600 text-white py-3 rounded hover:bg-slate-700 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
            </button>

            {status === 'success' && (
              <div className="text-green-600 mt-4 flex items-center">
                <AlertTriangle className="mr-2 text-green-600" />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="text-red-600 mt-4 flex items-center">
                <AlertTriangle className="mr-2 text-red-600" />
                Failed to send message. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;