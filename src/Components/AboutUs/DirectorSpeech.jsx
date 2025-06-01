import React from 'react';
import { Users, Target, Eye, Heart, Award, ChevronRight, Quote } from 'lucide-react';
import image from "../../assets/Images/nadim.jpg"

const ChairmanSpeech = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            চেয়ারম্যানের বাণী ও সংগঠনের দিকনির্দেশনা
          </h1>
        </div>
      </div>

      {/* Chairman's Message Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="lg:flex">
              {/* Chairman's Photo */}
              <div className="lg:w-2/5 bg-gradient-to-br from-gray-50 to-blue-50 p-8 lg:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-56 h-56 mx-auto rounded-full overflow-hidden shadow-2xl ring-8 ring-white bg-gray-200">
                      <img 
                        src={image} 
                        alt="ডাঃ নাদিম পারভেজ ইমন" 
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-3 shadow-lg">
                      <Award size={24} className="text-yellow-800" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-2xl md:text-3xl font-bold text-gray-900">
                    ডাঃ নাদিম পারভেজ ইমন
                  </h3>
                  <p className="text-xl text-indigo-600 font-semibold mt-2">চেয়ারম্যান</p>
                  <p className="text-sm text-gray-600 mt-2">দ্যা ড্রিমার্স</p>
                </div>
              </div>
              
              {/* Chairman's Speech */}
              <div className="lg:w-3/5 p-8 lg:p-12">
                <div className="flex items-center mb-8">
                  <Quote className="text-indigo-500 mr-3" size={32} />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">চেয়ারম্যানের বাণী</h2>
                </div>
                
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg font-medium text-gray-800">
                    বিসমিল্লাহির রাহমানির রাহিম। আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু।
                  </p>
                  
                  <p className="text-lg">
                    আমাদের প্রিয় মাতৃভূমি বাংলাদেশের সামাজিক ও অর্থনৈতিক উন্নয়নে অবদান রাখতে পেরে আমি গর্বিত। 
                    এই সংগঠনের মাধ্যমে আমরা সমাজের সর্বস্তরের মানুষের কল্যাণে নিরলসভাবে কাজ করে যাচ্ছি।
                  </p>
                  
                  <p className="text-lg">
                    আমাদের মূল লক্ষ্য হলো শিক্ষা, স্বাস্থ্য, দারিদ্র্য বিমোচন এবং মানব সম্পদ উন্নয়নের মাধ্যমে 
                    একটি সুখী ও সমৃদ্ধ সমাজ গড়া। আমরা বিশ্বাস করি যে, একসাথে কাজ করলে আমরা যেকোনো 
                    চ্যালেঞ্জ মোকাবেলা করতে পারি।
                  </p>
                  
                  <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-500 my-8">
                    <div className="flex items-start">
                      <Quote className="text-indigo-400 mr-3 mt-1 flex-shrink-0" size={24} />
                      <p className="text-lg font-semibold text-indigo-900 italic">
                        "আমাদের তরুণ প্রজন্মের হাতে রয়েছে দেশের উজ্জ্বল ভবিষ্যৎ। তাদের সঠিক 
                        দিকনির্দেশনা এবং যথোপযুক্ত সুযোগ প্রদানের মাধ্যমে আমরা একটি আত্মনির্ভরশীল 
                        ও সমৃদ্ধ বাংলাদেশ গড়ে তুলতে পারি।"
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-lg font-medium text-gray-800">
                    আল্লাহর রহমতে এবং সকলের সহযোগিতায় আমরা আমাদের লক্ষ্য অর্জনে সফল হব ইনশাআল্লাহ।
                  </p>
                  
                  <div className="pt-4">
                    <p className="text-right text-gray-600 font-medium">
                      - ডাঃ নাদিম পারভেজ ইমন<br/>
                      <span className="text-sm">চেয়ারম্যান</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Core Values */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              আমাদের মূল নীতিমালা
            </h2>
            <p className="text-xl text-gray-600">যে আদর্শে আমরা পরিচালিত</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "সততা ও স্বচ্ছতা", 
                description: "জবাবদিহিতা ও নৈতিকতা", 
                color: "from-red-500 to-pink-600",
                icon: Heart
              },
              { 
                title: "নিঃস্বার্থ সেবা", 
                description: "মানুষের কল্যাণে নিবেদিত", 
                color: "from-blue-500 to-indigo-600",
                icon: Users
              },
              { 
                title: "ঐক্য ও সহযোগিতা", 
                description: "সবার সাথে মিলেমিশে কাজ", 
                color: "from-green-500 to-teal-600",
                icon: Target
              },
              { 
                title: "উৎকর্ষতার অন্বেষণ", 
                description: "গুণগত মানের প্রতি অঙ্গীকার", 
                color: "from-purple-500 to-indigo-600",
                icon: Award
              }
            ].map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg`}>
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChairmanSpeech;