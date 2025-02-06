import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function BlogPage() {
    const blogs = [
        { id: 1, title: "The Future of AI in Education", desc: "Exploring how AI is transforming learning.", image: "https://source.unsplash.com/600x400/?technology" },
        { id: 2, title: "Effective Learning Strategies", desc: "Top techniques to boost your learning process.", image: "https://source.unsplash.com/600x400/?study" },
        { id: 3, title: "How to Stay Motivated", desc: "Tips to keep you inspired in your learning journey.", image: "https://source.unsplash.com/600x400/?motivation" },
        { id: 4, title: "Best Online Courses in 2024", desc: "A curated list of top courses you should take.", image: "https://source.unsplash.com/600x400/?books" },
        { id: 5, title: "Time Management for Students", desc: "Master the art of managing your time effectively.", image: "https://source.unsplash.com/600x400/?time" },
        { id: 6, title: "The Role of Coding in Education", desc: "Why programming skills are essential for students.", image: "https://source.unsplash.com/600x400/?coding" },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 py-16 px-6">
            {/* Featured Blog */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto mb-16 text-center"
            >
                <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Latest Blogs
                </h2>
                <p className="text-lg text-gray-400">Stay updated with insightful articles and industry trends.</p>
            </motion.div>

            {/* Blog Grid */}
            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => (
                    <motion.div 
                        key={blog.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                    >
                        <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-semibold mb-3 text-gray-100 hover:text-blue-400 transition duration-300">
                                {blog.title}
                            </h3>
                            <p className="text-gray-400 mb-4">{blog.desc}</p>
                            <Link 
                                to={`/blogs/${blog.id}`} 
                                className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition duration-300"
                            >
                                Read More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}