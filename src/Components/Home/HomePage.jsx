import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Droplet, Users, BookOpen, Heart, TreePine, Award, ChevronDown } from "lucide-react";
import image1 from "../../assets/Images/image1.JPG";
import image2 from "../../assets/Images/image2.JPG";
import image3 from "../../assets/Images/image3.JPG";
import image4 from "../../assets/Images/image4.JPG";
import image5 from "../../assets/Images/image5.JPG";
import img1 from "../../assets/Images/img1.jpg";
import ImageGellary from "./ImageGellary.jsx";

const STATS = [
  { value: "500+", label: "Members" },
  { value: "1200+", label: "Lives Saved" },
  { value: "20+", label: "Campaigns" },
  { value: "6+", label: "Branches" },
];

const MISSIONS = [
  { icon: BookOpen,  color: "text-blue-600",   bg: "bg-blue-100",   num: "01", title: "Financial Support for Students",   desc: "Helping economically disadvantaged students continue their education without financial burdens. We provide scholarships, stationery, and direct financial aid.",        image: image1, accent: "#3b82f6" },
  { icon: Award,     color: "text-amber-600",  bg: "bg-amber-100",  num: "02", title: "Recognition of Excellence",          desc: "Honoring outstanding students for their academic and extracurricular achievements through annual award ceremonies and public recognition.",                          image: image2, accent: "#d97706" },
  { icon: Droplet,   color: "text-red-600",    bg: "bg-red-100",    num: "03", title: "Blood Donation Drives",              desc: "Conducting regular blood donation programs and blood grouping campaigns to support patients in need and build an emergency donor database.",                        image: image3, accent: "#dc2626" },
  { icon: TreePine,  color: "text-green-600",  bg: "bg-green-100",  num: "04", title: "Tree Plantation Initiatives",        desc: "Promoting environmental awareness by organizing tree plantation drives in schools, communities, and public spaces across the region.",                             image: image4, accent: "#16a34a" },
  { icon: Users,     color: "text-purple-600", bg: "bg-purple-100", num: "05", title: "Community Engagement",               desc: "Building a strong network of students and volunteers dedicated to creating positive impact through collaborative social initiatives.",                            image: image5, accent: "#9333ea" },
  { icon: Heart,     color: "text-rose-600",   bg: "bg-rose-100",   num: "06", title: "Support for the Underprivileged",    desc: "Providing financial and material assistance to those in poverty — including relief programs, winter clothing drives, and food distribution.",                       image: img1,   accent: "#e11d48" },
];

const IMAGES = [image1, image2, image3];

const Home = () => {
  const [imgIndex, setImgIndex] = useState(0);
  const [activeM, setActiveM] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIndex(i => (i + 1) % IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Right image panel */}
        <div className="absolute right-0 top-0 w-full md:w-[55%] h-full">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
              style={{ backgroundImage: `url(${img})`, opacity: i === imgIndex ? 1 : 0 }}
            />
          ))}
          {/* Fade left edge into white */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-transparent md:via-white/30" />
        </div>

        {/* Left content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-20 max-w-2xl -mt-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#078d83] uppercase mb-6 border border-[#078d83]/30 px-3 py-1.5 rounded-full bg-[#078d83]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#078d83] animate-pulse" />
              Student & Social Welfare Organization
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight mb-6">
              THE<br />
              <span className="text-[#078d83]">DREAMERS</span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
              Empowering students, saving lives, and building communities, one dream at a time.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/about/the-dreamers"
                className="inline-flex items-center gap-2 bg-[#078d83] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#056e66] transition-colors"
              >
                Discover Our Story <ArrowRight size={16} />
              </Link>
              <Link
                to="/registration"
                className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm hover:border-[#078d83] hover:text-[#078d83] transition-colors"
              >
                Join Us
              </Link>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 grid grid-cols-4 gap-4 border-t border-gray-100 pt-8"
          >
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-black text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#078d83] py-3 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["-0%", "-50%"] }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-white/80 text-xs font-medium tracking-widest uppercase flex-shrink-0 px-10">
              Blood Donation &nbsp;·&nbsp; Education Support &nbsp;·&nbsp; Tree Plantation &nbsp;·&nbsp; Community Service &nbsp;·&nbsp; Student Welfare &nbsp;·&nbsp; Social Impact &nbsp;·&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── ABOUT STRIP ── */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-bold tracking-widest text-[#078d83] uppercase mb-4">Who We Are</p>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-6">
              Dreamers who turn<br />
              <span className="text-[#078d83]">vision into action</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              The Dreamers is a student-led social welfare organization committed to education, health, and community development. Since our founding, we have been working tirelessly to uplift lives across Bangladesh.
            </p>
            <Link to="/about/the-dreamers" className="inline-flex items-center gap-2 text-[#078d83] font-semibold text-sm hover:gap-3 transition-all">
              Learn more about us <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Bento-style stat boxes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "500+", label: "Registered Members", color: "bg-[#078d83] text-white" },
              { value: "1200+", label: "Lives Saved Through Blood Donation", color: "bg-gray-900 text-white" },
              { value: "20+", label: "Campaigns Organized", color: "bg-gray-50 text-gray-900 border border-gray-100" },
              { value: "6+", label: "Active Branches", color: "bg-gray-50 text-gray-900 border border-gray-100" },
            ].map(({ value, label, color }) => (
              <div key={label} className={`${color} rounded-2xl p-6`}>
                <p className="text-3xl font-black mb-1">{value}</p>
                <p className="text-sm opacity-70 leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4"
          >
            <div>
              <p className="text-xs font-bold tracking-widest text-[#078d83] uppercase mb-3">What We Do</p>
              <h2 className="text-4xl font-black text-gray-900">Our Mission</h2>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed sm:text-right">
              Committed to education, health, and community development across Bangladesh.
            </p>
          </motion.div>

          <div className="flex gap-8 items-start">

            {/* Left — 7/11 sticky image */}
            <div className="hidden lg:block sticky top-24 flex-shrink-0" style={{ width: "63.6%" }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <AnimatePresence mode="sync">
                  <motion.img
                    key={activeM}
                    src={MISSIONS[activeM].image}
                    alt={MISSIONS[activeM].title}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {/* Fade edges into bg */}
                <div className="absolute inset-x-0 top-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to bottom, #f9fafb, transparent)" }} />
                <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to top, #f9fafb, transparent)" }} />
                <div className="absolute inset-y-0 left-0 w-28 pointer-events-none" style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }} />
                <div className="absolute inset-y-0 right-0 w-28 pointer-events-none" style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }} />

                {/* Label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeM + "-label"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-8 left-8"
                  >
                    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 w-fit">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: MISSIONS[activeM].accent }}>
                        {React.createElement(MISSIONS[activeM].icon, { size: 15, className: "text-white" })}
                      </div>
                      <p className="text-gray-800 font-bold text-sm">{MISSIONS[activeM].title}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="absolute top-6 right-6 flex flex-col gap-1.5">
                  {MISSIONS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveM(i)}
                      className="w-1.5 rounded-full transition-all duration-300"
                      style={{
                        height: i === activeM ? "20px" : "6px",
                        backgroundColor: i === activeM ? MISSIONS[activeM].accent : "rgba(0,0,0,0.15)"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right — 4/11 mission list, same height as image, internal scroll */}
            <div
              className="flex-shrink-0 divide-y divide-gray-200 overflow-y-auto scrollbar-hide"
              style={{ width: "36.4%", maxHeight: "calc(63.6vw * 0.75)" }}
            >
              {MISSIONS.map(({ icon: Icon, color, bg, num, title, desc, accent }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setActiveM(i)}
                  className={`group flex items-start gap-4 py-5 cursor-pointer transition-all duration-200 rounded-2xl px-3 -mx-3 ${
                    activeM === i ? "bg-white shadow-sm" : "hover:bg-white/60"
                  }`}
                >
                  <span className="text-xs font-black w-5 flex-shrink-0 pt-0.5" style={{ color: activeM === i ? accent : "#d1d5db" }}>{num}</span>

                  <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${activeM === i ? "scale-110" : ""}`}>
                    <Icon size={15} className={color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm mb-1 transition-colors ${activeM === i ? "text-gray-900" : "text-gray-500"}`}>{title}</h3>
                    <AnimatePresence>
                      {activeM === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-xs text-gray-400 leading-relaxed overflow-hidden"
                        >
                          {desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <ArrowRight
                    size={13}
                    className="flex-shrink-0 mt-0.5 transition-all duration-200"
                    style={{ color: activeM === i ? accent : "#e5e7eb" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-20 overflow-hidden" style={{ backgroundColor: '#f0fafa' }}>
        <div className="px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        <ImageGellary />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-gray-900 rounded-3xl px-10 py-16 text-center"
        >
          <p className="text-xs font-bold tracking-widest text-[#078d83] uppercase mb-4">Be Part of the Change</p>
          <h2 className="text-4xl font-black text-white mb-4">Join The Dreamers</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Become a member and help us build a better community through education, health, and social welfare.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/registration"
              className="inline-flex items-center gap-2 bg-[#078d83] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#056e66] transition-colors"
            >
              Register Now <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:border-white/40 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
