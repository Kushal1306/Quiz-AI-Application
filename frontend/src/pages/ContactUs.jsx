import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Check } from 'lucide-react';
import InputBox2 from '../components/InputBox2';
import axios from 'axios';

const ContactUs = () => {
  const [sender, setSender] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsSubmitted(true);
       try {
        const response=await axios.post('https://quiz-ai-backend.vercel.app/user/sendMail',{
            sender,
            subject,
            content
        },{
          headers:{
            'Content-Type':'application/json'
          }
        });
        console.log(response);
        
       } catch (error) {
        console.log("error:",error);
       }
    // Reset form fields
    setSender('');
    setSubject('');
    setContent('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Contact Us</h2>
          <p className="text-center text-gray-600 mb-6">We'd love to hear from you!</p>
          {isSubmitted ? (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 flex items-center">
              <Check className="h-6 w-6 mr-2" />
              <p>We received your message. Thank you for contacting us!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputBox2
                id="sender"
                type="email"
                label="Email"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Enter your email address"
                required
                icon={Mail}
              />
              <InputBox2
                id="subject"a
                type="text"
                label="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter the subject"
                required
                icon={MessageSquare}
              />
              <InputBox2
                id="content"
                type="textarea"
                label="Message"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter your message"
                required
                icon={MessageSquare}
              />
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;