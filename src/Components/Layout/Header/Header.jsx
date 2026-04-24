import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../../../assets/Images/logo.png";
import API_URL from '../../../config/api';

const branches = [
    { name: "Samonta", path: "/branches/1" },
    { name: "Jhinnah Nagar", path: "/branches/2" },
    { name: "Mahespur", path: "/branches/3" },
    { name: "Jhenaidah", path: "/branches/4" },
    { name: "Jashore", path: "/branches/5" },
    { name: "Rajshahi", path: "/branches/6" },
    { name: "Dhaka", path: "/branches/7" },
    { name: "Centrally controlled", path: "/branches/8" }
];

const aboutUsLinks = [
    { name: "About The Dreamers", path: "/about/the-dreamers" },
    { name: "Director Speech", path: "/about/director-speech" },
    { name: "Advisory", path: "/about/advisory", protected: true },
    { name: "Members", path: "/about/members", protected: true },
    { name: "FAQs", path: "/about/faqs" },
    { name: "Support Us", path: "/about/support-us" },
];

const UserDropdown = ({ user, navigate, handleLogout, setIsUserMenuOpen }) => (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-2xl z-50 overflow-hidden border border-gray-100">
        {user ? (
            <>
                <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                        {user.photo ? (
                            <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-white/20 flex items-center justify-center">
                                <FaUser className="text-white" />
                            </div>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="font-bold text-white truncate">{user.name}</p>
                        <p className="text-xs text-white/80 truncate">{user.orgPosition || 'Member'}</p>
                    </div>
                </div>
                <div className="p-2">
                    <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 text-sm font-medium">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUser className="text-blue-600" size={12} />
                        </div>
                        My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <FaSignOutAlt className="text-red-600" size={12} />
                        </div>
                        Logout
                    </button>
                </div>
            </>
        ) : (
            <div className="p-4">
                <p className="text-gray-500 text-sm text-center mb-3">Sign in to your account</p>
                <button onClick={() => { navigate('/login'); setIsUserMenuOpen(false); }} className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-2.5 rounded-xl text-sm font-semibold">
                    Login
                </button>
            </div>
        )}
    </div>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBranchesOpen, setIsBranchesOpen] = useState(false);
    const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const desktopUserMenuRef = useRef(null);
    const mobileUserMenuRef = useRef(null);

    useEffect(() => {
        setIsUserMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const inDesktop = desktopUserMenuRef.current?.contains(e.target);
            const inMobile = mobileUserMenuRef.current?.contains(e.target);
            if (!inDesktop && !inMobile) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
            fetchUserProfile();
        }

        const handleStorage = () => {
            const userData = localStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('userUpdated', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('userUpdated', handleStorage);
        };
    }, []);

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/user/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setUser(data);
            localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email, photo: data.photo, orgPosition: data.orgPosition }));
        } catch (error) {
            console.error('Failed to fetch profile');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsUserMenuOpen(false);
        window.dispatchEvent(new Event('userUpdated'));
        navigate('/');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    let timeoutId;
    const handleMouseEnter = (setter) => { clearTimeout(timeoutId); setter(true); };
    const handleMouseLeave = (setter) => { timeoutId = setTimeout(() => setter(false), 200); };

    return (
        <header className="bg-white sticky top-0 shadow-xs shadow-green-800 z-50">
            <div className="max-w-7xl mx-auto px-4 md:py-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/"><img src={logo} alt="The Dreamers" className="w-16 h-auto" /></Link>
                    </div>

                    {/* Mobile Header Right */}
                    <div className="md:hidden flex items-center gap-2">
                        <div className="relative" ref={mobileUserMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300">
                                {user?.photo ? (
                                    <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                                ) : (
                                    <FaUser className="text-gray-600" size={14} />
                                )}
                            </button>
                            {isUserMenuOpen && (
                                <UserDropdown user={user} navigate={navigate} handleLogout={handleLogout} setIsUserMenuOpen={setIsUserMenuOpen} />
                            )}
                        </div>
                        <button onClick={toggleMenu} className="text-black focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 relative px-1">
                        <Link to="/" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
                        <Link to="/blood" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Blood Bank</Link>

                        {/* Branches Dropdown */}
                        <div className="relative">
                            <button onMouseEnter={() => handleMouseEnter(setIsBranchesOpen)} onMouseLeave={() => handleMouseLeave(setIsBranchesOpen)} className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-200 hover:after:w-full flex items-center gap-1">
                                Branches
                                <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isBranchesOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isBranchesOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10" onMouseEnter={() => handleMouseEnter(setIsBranchesOpen)} onMouseLeave={() => handleMouseLeave(setIsBranchesOpen)}>
                                    {branches.map((branch) => (
                                        <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-black hover:bg-green-600">{branch.name}</Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link to="/events" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Events</Link>
                        <Link to="/contact" className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full">Contact Us</Link>

                        {/* About Us Dropdown */}
                        <div className="relative">
                            <button onMouseEnter={() => handleMouseEnter(setIsAboutUsOpen)} onMouseLeave={() => handleMouseLeave(setIsAboutUsOpen)} className="relative text-black hover:text-green-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-green-500 after:transition-all after:duration-200 hover:after:w-full flex items-center gap-1">
                                About Us
                                <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isAboutUsOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isAboutUsOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md shadow-green-500 z-10" onMouseEnter={() => handleMouseEnter(setIsAboutUsOpen)} onMouseLeave={() => handleMouseLeave(setIsAboutUsOpen)}>
                                    {aboutUsLinks.filter(link => !link.protected || user).map((link) => (
                                        <Link key={link.path} to={link.path} className="block px-4 py-2 text-black hover:bg-green-600">{link.name}</Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <button className="bg-[#078d83] hover:bg-white hover:text-black hover:border border-[#078d83] text-white py-2 px-4 rounded-lg">Donate</button>
                        <button onClick={() => navigate("/registration")} className="bg-blue-500 hover:bg-white hover:text-black hover:border border-blue-500 text-white py-2 px-4 rounded-lg">Join Us</button>
                        <div className="relative" ref={desktopUserMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300">
                                {user?.photo ? (
                                    <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <FaUser className="text-gray-600" />
                                )}
                            </button>
                            {isUserMenuOpen && (
                                <UserDropdown user={user} navigate={navigate} handleLogout={handleLogout} setIsUserMenuOpen={setIsUserMenuOpen} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`fixed right-0 h-max w-1/2 bg-white p-4 z-10 shadow-xl shadow-green-800 transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <nav className="space-y-4 text-black">
                    <Link to="/" className="block text-green-900 hover:text-green-500">Home</Link>
                    <Link to="/blood" className="block text-green-900 hover:text-green-500">Blood Bank</Link>
                    <Link to="/events" className="block text-green-900 hover:text-green-500">Events</Link>

                    {/* Mobile Branches Dropdown */}
                    <div>
                        <button onClick={() => setIsBranchesOpen(!isBranchesOpen)} className="text-green-900 hover:text-green-500 w-full text-left flex items-center gap-2">
                            Branches <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isBranchesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isBranchesOpen && (
                            <div className="mt-2 bg-white shadow-lg shadow-green-600 rounded-lg">
                                {branches.map((branch) => (
                                    <Link key={branch.path} to={branch.path} className="block px-4 py-2 text-black hover:bg-green-600">{branch.name}</Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/contact" className="block text-green-900 hover:text-green-500">Contact Us</Link>

                    {/* Mobile About Us Dropdown */}
                    <div>
                        <button onClick={() => setIsAboutUsOpen(!isAboutUsOpen)} className="text-green-900 hover:text-green-500 w-full text-left flex items-center gap-2">
                            About Us <FaChevronDown size={10} className={`transition-transform mt-1.5 duration-300 ${isAboutUsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isAboutUsOpen && (
                            <div className="mt-2 bg-white shadow-lg shadow-green-600 rounded-lg">
                                {aboutUsLinks.filter(link => !link.protected || user).map((link) => (
                                    <Link key={link.path} to={link.path} className="block px-4 py-2 text-black hover:bg-green-600">{link.name}</Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 space-y-2">
                        <button className="bg-[#078d83] hover:bg-white hover:text-black hover:border border-[#078d83] text-white py-2 px-4 rounded-lg w-full text-center">Donate</button>
                        <button onClick={() => navigate("/registration")} className="bg-blue-500 hover:bg-white hover:text-black hover:border border-blue-500 text-white py-2 px-4 rounded-lg w-full text-center">Join Us</button>
                        {user && (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full text-center flex items-center justify-center gap-2">
                                <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
