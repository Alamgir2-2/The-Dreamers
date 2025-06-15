import React, { useState } from 'react';
import { FaFacebookMessenger, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
const ContactUs = () => {
    const [isSubmitted, setIsSubmitted] = useState(false); // Form Submit
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Form Handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Confirmation Message

        console.log('Form Data:', formData);
    };

    // Input Change Handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className=" min-h-screen py-12">

            {/* Header */}
            <div className="bg-blue-50 py-20 -mt-12 text-center mb-12">
                <h1 className="text-5xl font-bold text-[#078d83] mb-4">Contact Us</h1>
                <p className="text-xl text-gray-600">We'd love to hear from you! Reach out to us for any inquiries or feedback.</p>
            </div>

            <div className="container mx-auto px-10">

                {/* Contact Info Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <p className="text-gray-700">+880 1234 567890</p>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-700">thedreamersbd.mail@gmail.com</p>
                            </div>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-gray-700">Samonta, Maheshpur, Jhenaidah, Bangladesh</p>
                            </div>

                            {/* Google Map */}
                            <div className="mt-6">
                                <h3 className="text-xl font-bold mb-4">Our Location</h3>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.8107557832936!2d88.7838362748309!3d23.249972607804818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8d3dcdfb062f1%3A0x99d044a06e1bb8c1!2sSamonta%20Bazar!5e0!3m2!1sen!2sbd!4v1741802261660!5m2!1sen!2sbd"
                                    width="100%"
                                    height="200"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>


                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                        {isSubmitted ? (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                                <p>Thank you for your message! We'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Your Message"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* //Social Media contact */}
                        <div className="mt-6 w-auto">
                            <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
                            <div className="flex space-x-4">

                                

                                {/* Whatsapp */}
                                <a
                                    href="https://wa.me/your-whatsapp-number"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    title="Message us on WhatsApp"
                                >
                                    <FaWhatsapp className="text-xl" />
                                </a>

                                {/* Telegram */}
                                <a
                                    href="https://t.me/your-telegram-username"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    title="Message us on Telegram"
                                >
                                    <FaTelegramPlane className="text-xl" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;