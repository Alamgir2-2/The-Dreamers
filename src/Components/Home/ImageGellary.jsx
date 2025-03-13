import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import img1 from "../../assets/Images/img1.jpg";
import img2 from "../../assets/Images/img2.jpg";
import img3 from "../../assets/Images/image1.JPG";

const images = [
  {
    src: img1,
    title: "Giving trees as gifts",
    details: {
      date: "2023-10-01",
      purpose: "Tree Plantation",
      program: "Cricket Tournament",
    },
  },
  {
    src: img2,
    title: "Champion Brothers",
    details: {
      date: "2023-09-15",
      purpose: "Prize Giving Ceremony",
      program: "Cricket Tournament",
    },
  },
  {
    src: img3,
    title: "The Dreamers",
    details: {
      date: "2023-08-20",
      purpose: "Group Photography",
      program: "Annual Conference",
    },
  },
  {
    src: img1,
    title: "Giving trees as gifts",
    details: {
      date: "2023-10-01",
      purpose: "Tree Plantation",
      program: "Cricket Tournament",
    },
  },
  {
    src: img2,
    title: "Champion Brothers",
    details: {
      date: "2023-09-15",
      purpose: "Prize Giving Ceremony",
      program: "Cricket Tournament",
    },
  },
  {
    src: img3,
    title: "The Dreamers",
    details: {
      date: "2023-08-20",
      purpose: "Group Photography",
      program: "Annual Conference",
    },
  },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="bg-[#e8fbfa] flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-6 md:px-20 py-16">
      {/* Left Side - Image Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-2/3">
        {images.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative group"
            onClick={() => openModal(image)}
          >
            <img
              src={image.src}
              alt={`Gallery ${index + 1}`}
              className="w-full h-64 object-cover rounded-xl"
            />
            {/* Image Title with Slide-up Animation */}
            <div className="absolute inset-x-0 bottom-0 bg-glass bg-opacity-50 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-lg font-semibold">{image.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side - Large Text */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-end mb-10 md:mb-0 text-center md:text-right">
        <h1 className="text-4xl md:text-6xl font-bold uppercase bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Image <br /> Gallery
        </h1>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-w-lg w-11/12 md:w-1/2 p-6 bg-white shadow-2xl shadow-green-500 rounded-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-red-500 text-4xl hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Image with Zoom */}
            <Zoom>
              <img
                src={selectedImage.src}
                alt="Enlarged"
                className="w-full h-auto max-h-[70vh] rounded-lg object-cover"
              />
            </Zoom>

            {/* Image Details */}
            <div className="mt-4 text-gray-800">
              <h2 id="modal-title" className="text-2xl font-bold mb-2">
                {selectedImage.title}
              </h2>
              <p><strong>Date Taken:</strong> {selectedImage.details.date}</p>
              <p><strong>Purpose:</strong> {selectedImage.details.purpose}</p>
              <p><strong>Program:</strong> {selectedImage.details.program}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;