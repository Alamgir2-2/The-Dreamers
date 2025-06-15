import React, { useEffect, useState } from 'react';

const HorizontalSlideGallery = () => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const imagesGlob = import.meta.glob('../../assets/Images/Gallery/*.{jpg,jpeg,png,svg}', {
      eager: true,
    });

    const imageUrls = Object.values(imagesGlob).map((mod) => mod.default);

    const shuffled = [...imageUrls].sort(() => Math.random() - 0.5);
    setImages(shuffled);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [images]);

  const getImageStyle = (index) => {
    const distance = (index - activeIndex + images.length) % images.length;
    const baseOffset = 60;

    let translateX = '0%';
    let opacity = 1;
    let scale = 1;
    let zIndex = 10;

    if (distance === 0) {
      translateX = `0%`;
    } else if (distance === 1 || distance === images.length - 1) {
      translateX = `${distance === 1 ? baseOffset : -baseOffset}%`;
      opacity = 0.85;
      scale = 0.9;
      zIndex = 9;
    } else if (distance === 2 || distance === images.length - 2) {
      translateX = `${distance === 2 ? baseOffset * 2 : -baseOffset * 2}%`;
      opacity = 0.7;
      scale = 0.8;
      zIndex = 7;
    } else if (distance === 3 || distance === images.length - 3) {
      translateX = `${distance === 3 ? baseOffset * 3 : -baseOffset * 3}%`;
      opacity = 0.5;
      scale = 0.7;
      zIndex = 5;
    } else if (distance === 4 || distance === images.length - 4) {
      translateX = `${distance === 4 ? baseOffset * 4 : -baseOffset * 4}%`;
      opacity = 0.35;
      scale = 0.6;
      zIndex = 3;
    } else {
      translateX = '400%';
      opacity = 0;
      scale = 0.5;
      zIndex = 0;
    }

    return {
      transform: `translateX(${translateX}) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 1s ease-in-out',
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-pink-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Image Gallery</h1>
      <div className="relative w-full max-w-7xl h-64 md:h-96 mx-auto overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 w-40 h-40 md:w-64 md:h-64 -mt-20 md:-mt-32 -ml-20 md:-ml-32"
            style={getImageStyle(index)}
          >
            <img
              src={img}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover rounded-xl shadow-xl border-4 border-white/60"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSlideGallery;
