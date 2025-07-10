import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaSpinner
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(formData);
    setIsSubmitting(false);

    // টোস্ট দেখাও
    toast.success("Registration complete. Please log in.", {
      position: "top-right",
      style: { top: "80px" },
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // ৩ সেকেন্ড অপেক্ষা করে Login পেজে নিয়ে যাও
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 -mt-4">
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-100 rounded-3xl shadow-2xl shadow-green-500 overflow-hidden border border-gray-300 relative">
          <div className="p-8">
            <div className="text-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <FaUser className="text-white text-2xl" />
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Join Dreamers
              </h2>
              <p className="text-gray-600">Create your account in seconds</p>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-5 py-3 bg-white text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition"
                  required
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500 h-5 w-5" />
                </div>
              </div>

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
                  <FaEnvelope className="text-gray-500 h-5 w-5" />
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
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500 hover:text-gray-700 h-5 w-5" />
                  ) : (
                    <FaEye className="text-gray-500 hover:text-gray-700 h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition flex items-center justify-center ${isSubmitting
                      ? "bg-purple-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Processing...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>
              </div>
            </div>

            {/* Sign In */}
            <div className="mt-6 text-center text-gray-600 text-sm">
              <p>
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-purple-600 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Success Animation */}
          <div
            id="success-checkmark"
            className="hidden absolute inset-0 bg-black/80 flex items-center justify-center rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 rounded-2xl text-center"
            >
              <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Registration Successful!
              </h3>
              <p className="text-gray-600">
                Welcome to Dreamers community. Check your email for verification.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Registration;
