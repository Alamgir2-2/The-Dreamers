import React from 'react';
import { motion } from 'framer-motion';

const AboutDreamers = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ===== Hero Section ===== */}
      <section className="relative h-screen flex items-center justify-center bg-blue-900 text-white overflow-hidden">
        <div className="text-center z-20 px-4 max-w-4xl">
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block text-blue-200">এসো তারুণ্য স্বপ্ন দেখি</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              transition={{ delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
            >
              <span className="block text-white">সমাজ সেবার প্রত্যয় রাখি</span>
            </motion.h1>
          </div>

          

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 1.2 }}
            className="flex justify-center gap-6 md:gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 p-4 rounded-lg backdrop-blur-sm border border-white/20"
            >
              <div className="text-3xl font-bold">৮</div>
              <p className="text-sm md:text-base">ব্রাঞ্চ</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 p-4 rounded-lg backdrop-blur-sm border border-white/20"
            >
              <div className="text-3xl font-bold">১৫০+</div>
              <p className="text-sm md:text-base">সদস্য</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== Mission Section ===== */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl font-bold text-center mb-12 text-blue-900"
        >
          আমাদের কাজ
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "আর্থিক সহায়তা",
              description: "আর্থিকভাবে পিছিয়ে পড়া শিক্ষার্থীদের আর্থিক সহয়তা প্রদান",
              icon: "💰",
              color: "from-yellow-100 to-yellow-50"
            },
            {
              title: "জ্ঞান অর্জনে উৎসাহ",
              description: "শিক্ষার্থীদের বাহ্যিক জ্ঞান অর্জনে উদ্ধুদ্ধকরণ",
              icon: "🧠",
              color: "from-indigo-100 to-indigo-50"
            },
            {
              title: "শিক্ষা বিষয়ক ইভেন্ট",
              description: "প্রতিযোগিতামূলক শিক্ষা বিষয়ক বিভিন্ন ইভেন্ট পরিচালনা করা",
              icon: "🏆",
              color: "from-pink-100 to-pink-50"
            },
            {
              title: "কৃতি সংবর্ধনা",
              description: "কৃতি শিক্ষার্থীদের সংবর্ধনা প্রদান",
              icon: "🎖️",
              color: "from-blue-100 to-blue-50"
            },
            {
              title: "দারিদ্র সহায়তা",
              description: "দারিদ্রকে সহায়তা প্রদান",
              icon: "🤝",
              color: "from-green-100 to-green-50"
            },
            {
              title: "রক্তদান কর্মসূচি",
              description: "নিয়মিত রক্তদান কর্মসূচি পরিচালনা করা",
              icon: "🩸",
              color: "from-red-100 to-red-50"
            },
            {
              title: "বৃক্ষরোপণ",
              description: "পরিবেশ রক্ষায় বৃক্ষরোপণ কর্মসূচি পরিচালনা করা",
              icon: "🌱",
              color: "from-emerald-100 to-emerald-50"
            },
            {
              title: "ইতিবাচক সামাজিক কাজ",
              description: "যেকোনো ইতিবাচক সামাজিক কাজে আমরা নিয়োজিত",
              icon: "🌟",
              color: "from-gray-100 to-gray-50"
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br ${item.color} p-6 rounded-xl shadow-md`}
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 bg-gradient-to-b from-blue-800 to-blue-900 text-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-4"
        >
          <h2 className="text-3xl font-bold mb-6">আপনিও অংশ হোন</h2>
          <p className="text-xl mb-8">
            আমাদের সাথে যুক্ত হয়ে সমাজ পরিবর্তনের এই যাত্রায় শরিক হোন
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-blue-900 rounded-full font-bold shadow-lg hover:shadow-xl transition"
          >
            যোগ দিন
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutDreamers;
