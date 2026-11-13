import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const STACK_SIZE = 5; // total visible: center + 2 left + 2 right

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const glob = import.meta.glob('../../assets/Images/Gallery/*.{jpg,jpeg,png,svg,JPG,JPEG}', { eager: true });
    const urls = Object.values(glob).map(m => m.default);
    setImages(urls);
  }, []);

  useEffect(() => {
    if (paused || images.length === 0) return;
    const t = setInterval(() => setActive(i => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [paused, images.length]);

  useEffect(() => {
    const glob = import.meta.glob('../../assets/Images/Gallery/*.{jpg,jpeg,png,svg,JPG,JPEG}', { eager: true });
    const urls = Object.values(glob).map(m => m.default);
    setImages(urls);
  }, []);

  const prev = () => setActive(i => (i - 1 + images.length) % images.length);
  const next = () => setActive(i => (i + 1) % images.length);
  const lbPrev = () => setLightbox(i => (i - 1 + images.length) % images.length);
  const lbNext = () => setLightbox(i => (i + 1) % images.length);

  if (images.length === 0) return null;

  // pos: -2, -1, 0, 1, 2
  const cards = [-2, -1, 0, 1, 2].map(pos => ({
    pos,
    idx: (active + pos + images.length) % images.length,
  }));

  const getStyle = (pos) => {
    const abs = Math.abs(pos);
    return {
      zIndex: 10 - abs,
      transform: `translateX(${pos * 200}px) rotate(${pos * 5}deg) scale(${1 - abs * 0.1})`,
      filter: abs > 0 ? `blur(${abs * 1.5}px)` : 'none',
      opacity: abs === 0 ? 1 : abs === 1 ? 0.75 : 0.45,
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: pos === 0 ? 'pointer' : 'default',
    };
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-bold tracking-widest text-[#078d83] uppercase mb-3">The Dreamers · Since 2016</p>
        {/* <h2 className="text-4xl font-black text-gray-900 mb-3">
          মানবতার টানে, এগিয়ে আসি
        </h2> */}
        <p className="text-gray-500 text-sm mb-2 max-w-xl mx-auto leading-relaxed">
          The Dreamers — একটি স্বপ্নবাজ তরুণদের গল্প, যারা শিক্ষা, রক্তদান ও সমাজসেবায় নিরলসভাবে কাজ করে যাচ্ছে সারা বাংলাদেশে।
        </p>
        <div className="flex justify-center gap-3 flex-wrap mt-5">
          {["● রক্তদান", "● শিক্ষা সহায়তা", "● বৃক্ষরোপণ", "● সমাজকল্যাণ"].map(tag => (
            <span key={tag} className="text-xs font-semibold text-[#078d83] bg-[#078d83]/10 border border-[#078d83]/25 px-4 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stack + arrows */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: '460px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-20 w-11 h-11 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center hover:border-[#078d83] hover:text-[#078d83] transition-colors text-gray-400"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Cards */}
        <div className="relative w-full max-w-xl mx-16" style={{ height: '420px' }}>
          {cards.map(({ pos, idx }) => (
            <div
              key={pos}
              className="absolute inset-0"
              style={getStyle(pos)}
              onClick={() => pos === 0 && setLightbox(idx)}
            >
              <div className="w-full h-full bg-white rounded-3xl overflow-hidden p-3"
                style={{ boxShadow: pos === 0 ? '0 25px 60px rgba(0,0,0,0.15)' : '0 8px 24px rgba(0,0,0,0.1)' }}
              >
                {pos === 0 ? (
                  <div className="flex flex-col gap-2 h-full">
                    <div className="grid grid-cols-4 grid-rows-2 gap-2 flex-1">
                      <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative">
                        <AnimatePresence mode="sync">
                          <motion.img key={idx} src={images[idx]} alt=""
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </AnimatePresence>
                      </div>
                      {[1,2,3,4].map(n => (
                        <div key={n} className="rounded-2xl overflow-hidden relative">
                          <AnimatePresence mode="sync">
                            <motion.img key={idx+n} src={images[(idx+n)%images.length]} alt=""
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, delay: n * 0.05 }}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 h-20">
                      {[5,6,7].map(n => (
                        <div key={n} className="rounded-2xl overflow-hidden relative">
                          <AnimatePresence mode="sync">
                            <motion.img key={idx+n} src={images[(idx+n)%images.length]} alt=""
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              transition={{ duration: 0.6, delay: n * 0.05 }}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <AnimatePresence mode="sync">
                      <motion.img key={idx} src={images[idx]} alt=""
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-20 w-11 h-11 bg-white border border-gray-100 shadow-md rounded-full flex items-center justify-center hover:border-[#078d83] hover:text-[#078d83] transition-colors text-gray-400"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? '20px' : '6px',
              height: '6px',
              backgroundColor: i === active ? '#078d83' : '#d1d5db',
            }}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 text-white/60 hover:text-white"><X size={22} /></button>
            <button onClick={e => { e.stopPropagation(); lbPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"><ChevronLeft size={36} /></button>
            <button onClick={e => { e.stopPropagation(); lbNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"><ChevronRight size={36} /></button>
            <AnimatePresence mode="wait">
              <motion.img
                key={lightbox} src={images[lightbox]} alt=""
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl"
                onClick={e => e.stopPropagation()}
              />
            </AnimatePresence>
            <p className="absolute bottom-5 text-white/30 text-xs">{lightbox + 1} / {images.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGallery;
