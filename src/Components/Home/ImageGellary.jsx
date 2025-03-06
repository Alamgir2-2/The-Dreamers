import React from "react";
import img1 from "../../assets/Images/img1.jpg";
import img2 from "../../assets/Images/img2.jpg";
import img3 from "../../assets/Images/image1.JPG";

const images = [
  img1,
  img2,
  img3,
  img1,
  img2,
  img3,
];

const ImageGallery = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-20 py-16 bg-gray-100">
      {/* Left Side - Image Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-2/3">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <img src={src} alt={`Gallery ${index + 1}`} className="w-full h-64 object-cover rounded-xl" />
          </div>
        ))}
      </div>

      {/* Right Side - Large Text */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-end mb-10 md:mt-0 text-center md:text-right">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 uppercase">
          Image <br /> Gallery
        </h1>
      </div>
    </section>
  );
};

export default ImageGallery;
