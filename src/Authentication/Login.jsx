import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // এখানে API কল বা লগিন ভেরিফিকেশন করো
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);

        // সফল লগিন টোস্ট দেখাও
        toast.success("Login successful! Redirecting...", {
            position: "top-right",
            style: { top: "80px" },
            autoClose: 1500,
        });

        // ১.৫ সেকেন্ড পরে ড্যাশবোর্ড বা হোম পেজে নিয়ে যাও
        setTimeout(() => {
            navigate("/dashboard"); // তোমার লগিন সফল হলে যেই পেজে যাবে সেটা দিতে পারো
        }, 1700);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 -mt-8">
            <ToastContainer />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-gray-100 rounded-3xl shadow-2xl shadow-green-500 overflow-hidden border border-gray-300 p-8">
                    <div className="text-center mb-8">
                        <motion.div whileHover={{ scale: 1.05 }} className="inline-block mb-4">
                            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                                <FaUser className="text-white text-2xl" />
                            </div>
                        </motion.div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Login to your account</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-5 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaUser className="text-gray-500 h-5 w-5" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-10 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition"
                                required
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FaLock className="text-gray-500 h-5 w-5" />
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-500 hover:text-gray-700 h-5 w-5" />
                                ) : (
                                    <FaEye className="text-gray-500 hover:text-gray-700 h-5 w-5" />
                                )}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition flex items-center justify-center ${isSubmitting ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                        Logging in...
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </motion.button>
                        </div>
                    </form>

                    {/* Forgot Password */}
                    <div className="mt-6 text-center text-gray-600 text-sm">
                        <p>
                            Forgot your password?{" "}
                            <a href="#" className="text-purple-600 font-medium hover:underline">
                                Reset here
                            </a>
                        </p>
                    </div>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center text-gray-600 text-sm">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/registration" className="text-purple-600 font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
