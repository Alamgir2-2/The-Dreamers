import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, MapPin, Heart, BookOpen, Droplets, TreePine, Sparkles, Star, ArrowRight } from 'lucide-react';

const AboutDreamers = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState({});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const GradientCard = ({ children, className = "", delay = 0 }) => (
        <div
            className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
            style={{
                animationDelay: `${delay}ms`
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {children}
        </div>
    );

    const stats = [
        { label: "ব্রাঞ্চ", value: "৮", icon: MapPin, color: "from-blue-400 to-cyan-400" },
        { label: "সদস্য", value: "১৫০+", icon: Users, color: "from-purple-400 to-pink-400" },
        { label: "বছর", value: "৯+", icon: Heart, color: "from-orange-400 to-red-400" }
    ];

    const educationWork = [
        { text: "আর্থিকভাবে পিছিয়ে পড়া শিক্ষার্থীদের সহায়তা", icon: Heart },
        { text: "বাহ্যিক জ্ঞান অর্জনে উৎসাহ প্রদান", icon: BookOpen },
        { text: "শিক্ষা ভিত্তিক ইভেন্ট আয়োজন", icon: Sparkles },
        { text: "কৃতি শিক্ষার্থীদের সংবর্ধনা", icon: Star }
    ];

    const socialWork = [
        { text: "দারিদ্র্য দূরীকরণ সহায়তা", icon: Heart },
        { text: "রক্তদান কর্মসূচি", icon: Droplets },
        { text: "বৃক্ষরোপণ কর্মসূচি", icon: TreePine },
        { text: "ইতিবাচক সকল কাজে অংশগ্রহণ", icon: Sparkles }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                {/* Hero Content */}
                <div className="text-center px-6 z-20 max-w-6xl">
                    <div className="mb-8 animate-fade-in">
                        <h1 className="text-5xl md:text-8xl font-black leading-tight mb-4">
                            <span className="block mt-12 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
                                এসো তারুণ্য স্বপ্ন দেখি
                            </span>
                        </h1>
                        <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                            সমাজ সেবার প্রত্যয় রাখি
                        </h2>
                    </div>

                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
                        তরুণদের নিয়ে একটি স্বপ্নময় সমাজ গড়ে তোলার প্রত্যয়ে নিরলসভাবে কাজ করে যাচ্ছে দ্যা ড্রিমার্স
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                        {stats.map((stat, i) => {
                            const IconComponent = stat.icon;
                            return (
                                <GradientCard key={i} delay={i * 200}>
                                    <div className="p-6 text-center relative z-10">
                                        <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-3xl md:text-4xl font-black mb-2">{stat.value}</div>
                                        <p className="text-blue-200 font-medium">{stat.label}</p>
                                    </div>
                                </GradientCard>
                            );
                        })}
                    </div>

                    {/* Scroll Indicator */}
                    <div className="animate-bounce">
                        <ChevronRight className="w-8 h-8 mx-auto rotate-90 text-white/60" />
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-32 px-6 bg-slate-900">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl py-2 md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            আমাদের গল্প
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
                    </div>

                    <GradientCard className="p-12">
                        <div className="space-y-8 text-justify">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <div className="flex-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-30" />
                            </div>

                            <p className="text-xl md:text-2xl leading-relaxed text-gray-100 mb-6">
                                ২০১৫ সালের শেষের দিকে কিছু উদ্যমী উচ্চমাধ্যমিক শিক্ষার্থীর স্বপ্ন আর সাহসিকতার সংমিশ্রণে শুরু হয় ‘দ্যা ড্রিমার্স’-এর পথচলা। তারা বিশ্বাস করত—ছোট্ট কিছু পদক্ষেপ থেকেই বড় পরিবর্তনের সূচনা সম্ভব। সমাজে ইতিবাচক প্রভাব ফেলার লক্ষ্যেই যাত্রা শুরু হয় এই সংগঠনের, যা আজ পরিণত হয়েছে ১৫০+ সদস্যের এক প্রাণবন্ত ও উদ্যমী পরিবারে।
                            </p>

                            <p className="text-xl md:text-2xl leading-relaxed text-gray-100 mb-6">
                                এই স্বপ্নকে আনুষ্ঠানিক রূপ দেওয়া হয় ২০১৬ সালের ২রা জানুয়ারি — দিনটি আজ “স্বপ্নযাত্রার সূচনাদিবস” হিসেবে উদযাপিত হয় দ্যা ড্রিমার্স পরিবারে। সেই দিনটিকে কেন্দ্র করেই প্রতিবছর আমরা ফিরে দেখি আমাদের শুরু, উদযাপন করি অগ্রযাত্রা। আজ ৮টি শাখায় ছড়িয়ে থাকা একঝাঁক তরুণ নিষ্ঠা ও ভালোবাসা নিয়ে কাজ করে যাচ্ছে সমাজের প্রতিটি স্তরে আলো ছড়িয়ে দিতে — আগের চেয়ে আরও দৃঢ় প্রত্যয়ে, আরও বিস্তৃত স্বপ্ন নিয়ে।
                            </p>


                            <p className="text-xl md:text-2xl leading-relaxed text-gray-100">
                                দ্যা ড্রিমার্স-এর বর্তমান সদস্যদের অনেকেই দেশের সেরা বিশ্ববিদ্যালয়, মেডিকেল কলেজ ও জাতীয় বিশ্ববিদ্যালয়ে কৃতিত্বের সাথে পড়াশোনা চালিয়ে যাচ্ছে। পাশাপাশি, অনেকেই দেশের বিভিন্ন কলেজে উচ্চমাধ্যমিকে অধ্যয়নরত অবস্থায়ও সমাজ পরিবর্তনের এই যাত্রায় সমানভাবে যুক্ত রয়েছে। পড়াশোনার পাশাপাশি তারা সমাজের জন্য সময় দিচ্ছে, কাজ করছে, স্বপ্ন দেখছে — এবং দেখাচ্ছে।
                            </p>



                            <div className="flex justify-end mt-8">
                                <div className="flex-1 h-1 bg-gradient-to-l from-blue-400 to-purple-400 rounded-full opacity-30" />
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center ml-4">
                                    <Heart className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </GradientCard>
                </div>
            </section>

            {/* Work Section */}
            <section className="py-32 px-6 bg-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl py-2 md:text-6xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            আমাদের কর্মকান্ড সমূহ
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
                    </div>

                    {/* Education Section */}
                    <div className="mb-20">
                        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            শিক্ষার্থীদের কল্যাণে
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {educationWork.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <GradientCard key={index} className="p-8 group" delay={index * 100}>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">{item.text}</p>
                                        </div>
                                    </GradientCard>
                                );
                            })}
                        </div>
                    </div>

                    {/* Social Work Section */}
                    <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            সামাজিক কল্যাণমূলক কাজ
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {socialWork.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <GradientCard key={index} className="p-8 group" delay={index * 100}>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                <IconComponent className="w-8 h-8 text-white" />
                                            </div>
                                            <p className="text-lg md:text-xl text-gray-100 leading-relaxed">{item.text}</p>
                                        </div>
                                    </GradientCard>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-900">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
                            আপনিও অংশ হোন
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
                            আমাদের সাথে যুক্ত হয়ে সমাজ পরিবর্তনের এই যাত্রায় শরিক হোন
                        </p>
                    </div>

                    <button className="group relative px-12 py-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full font-bold text-xl text-white shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            যোগ দিন
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </section>

            <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
        </div>
    );
};

export default AboutDreamers;