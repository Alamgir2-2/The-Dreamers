import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Droplet, Search, X, Phone, MapPin, User, Users, Activity,
  Heart, AlertCircle, ChevronRight, Clock, Shield, Award,
  Building, Menu, ChevronDown, LayoutGrid, List
} from "lucide-react";
import BloodGroupPage from "../BloodGroups/BloodGroup";
import bcamp from "../../assets/Blood/blood 4.jpg";
import baward from "../../assets/Blood/blood 3.jpg";
import bbaward from "../../assets/Blood/blood 1.jpg";
import aslam from "../../assets/Blood/Aslam.jpg";

const BLOOD_GROUPS = [
  { label: "A+", path: "a-positive" },
  { label: "A-", path: "a-negative" },
  { label: "B+", path: "b-positive" },
  { label: "B-", path: "b-negative" },
  { label: "O+", path: "o-positive" },
  { label: "O-", path: "o-negative" },
  { label: "AB+", path: "ab-positive" },
  { label: "AB-", path: "ab-negative" },
];

const BLOOD_GROUP_PATHS = BLOOD_GROUPS.map(g => g.path);

const activities = [
  { title: "Blood Donation Campaign", description: '"THE DREAMERS BLOOD BANK" organize impactful blood donation campaigns to bring our community together for a noble cause. Our mission is to encourage people to donate blood, save lives, and raise awareness about the critical need for donations.', image: bcamp },
  { title: "Blood Donor Awards", description: "We are proud to organize the Blood Donor Awards to recognize the selfless individuals who contribute their blood to save lives. This event highlights the importance of understanding blood types and the crucial role donation plays.", image: baward },
  { title: "Volunteer for Blood Bank", description: "Become a volunteer to help organize and manage blood donations at our blood bank. Together, we can save more lives and make a lasting impact in our community.", image: bbaward },
];

const president = {
  name: "Aslam Hossain",
  image: aslam,
  profession: "Social Worker",
  education: "B.A. (Hons) in History",
  quote: "Together we make a difference.",
  mission: "Our mission is to ensure that safe, adequate blood supply is available to all patients in need. We strive to build a community of regular, voluntary blood donors and create awareness about the importance of blood donation.",
};

const membersData = [
  { id: 1, name: "Asif Khan", age: 22, institution: "City College, Jashore", bloodGroup: "B+", image: "/images/member1.jpg", profession: "Student" },
  { id: 2, name: "Ismail Hossain", age: 24, institution: "Shohidul Islam Degree College", bloodGroup: "B+", image: "/images/member2.jpg", profession: "Teacher" },
];

const stats = [
  { icon: Droplet, label: "Total Donors", value: "500+", color: "text-red-500", bg: "bg-red-50" },
  { icon: Heart, label: "Lives Saved", value: "1,200+", color: "text-[#078d83]", bg: "bg-[#078d83]/10" },
  { icon: Activity, label: "Campaigns", value: "48", color: "text-[#078d83]", bg: "bg-[#078d83]/10" },
  { icon: Users, label: "Volunteers", value: "120+", color: "text-[#078d83]", bg: "bg-[#078d83]/10" },
];

const BloodBankPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [memberSearch, setMemberSearch] = useState("");
  const [donorsOpen, setDonorsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [donorViewMode, setDonorViewMode] = useState('grid');
  const [memberViewMode, setMemberViewMode] = useState('grid');

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) setActiveSection(hash);
  }, [location.hash]);

  const goTo = (section) => {
    setActiveSection(section);
    navigate(`#${section}`);
    setSidebarOpen(false);
  };

  const isBloodGroupSection = BLOOD_GROUP_PATHS.includes(activeSection);

  const filteredMembers = membersData.filter(m =>
    m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
    m.profession.toLowerCase().includes(memberSearch.toLowerCase())
  );

  const NavItem = ({ label, section, icon: Icon }) => (
    <button
      onClick={() => goTo(section)}
      title={collapsed ? label : undefined}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        activeSection === section
          ? "bg-[#078d83] text-white shadow-sm"
          : "text-gray-600 hover:bg-[#078d83]/10 hover:text-[#078d83]"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <Icon size={16} className="flex-shrink-0" />
      {!collapsed && <span>{label}</span>}
    </button>
  );

  return (
    <div className="bg-gray-50 flex h-[calc(100vh-64px)] overflow-hidden">

      {/* Sidebar */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
      <aside className={`fixed md:sticky top-16 left-0 h-[calc(100vh-64px)] bg-white border-r border-gray-100 shadow-sm z-40 flex flex-col transition-all duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} ${collapsed ? "w-14" : "w-56"}`}>
        {/* Header */}
        <div className={`p-3 border-b border-gray-100 flex items-center gap-2 relative ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-[#078d83] rounded-lg flex items-center justify-center flex-shrink-0">
            <Droplet size={15} className="text-red-500 fill-red-500" />
          </div>
          {!collapsed && <span className="font-bold text-gray-800 text-xs leading-tight">Dreamers<br />Blood Bank</span>}
          {!collapsed && <button onClick={() => setSidebarOpen(false)} className="ml-auto md:hidden text-gray-400 hover:text-gray-600"><X size={16} /></button>}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden md:flex ml-auto w-6 h-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-[#078d83] hover:text-white hover:border-[#078d83] transition-all"
              title="Collapse sidebar"
            >
              <ChevronRight size={12} className="rotate-180" />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden md:flex w-6 h-6 items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-[#078d83] hover:text-white hover:border-[#078d83] transition-all"
              title="Expand sidebar"
            >
              <ChevronRight size={12} />
            </button>
          )}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto min-h-0">
          <NavItem label="Home" section="home" icon={Heart} />
          <NavItem label="Activities" section="activities" icon={Activity} />

          {/* Donors dropdown */}
          <div>
            <button
              onClick={() => { if (!collapsed) setDonorsOpen(o => !o); }}
              title={collapsed ? "Donors" : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isBloodGroupSection ? "bg-[#078d83] text-white" : "text-gray-600 hover:bg-[#078d83]/10 hover:text-[#078d83]"
              } ${collapsed ? "justify-center" : "justify-between"}`}
            >
              <div className={`flex items-center gap-3 ${collapsed ? "" : ""}`}>
                <Droplet size={16} className="flex-shrink-0" />
                {!collapsed && <span>Donors</span>}
              </div>
              {!collapsed && <ChevronDown size={14} className={`transition-transform ${donorsOpen ? "rotate-180" : ""}`} />}
            </button>
            {donorsOpen && !collapsed && (
              <div className="mt-1 ml-2 grid grid-cols-4 gap-1 p-2 bg-gray-50 rounded-xl">
                {BLOOD_GROUPS.map(g => (
                  <button
                    key={g.path}
                    onClick={() => goTo(g.path)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      activeSection === g.path ? "bg-red-500 text-white" : "bg-white text-red-600 border border-red-100 hover:bg-red-50"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <NavItem label="President" section="president" icon={User} />
          <NavItem label="Members" section="members" icon={Users} />
          <NavItem label="About" section="about" icon={Building} />
        </nav>

        {/* Emergency box + collapse toggle */}
        <div className="p-2 space-y-2">
          {!collapsed && (
            <div className="bg-[#078d83]/10 border border-[#078d83]/20 rounded-xl p-3 text-center">
              <AlertCircle size={16} className="text-[#078d83] mx-auto mb-1" />
              <p className="text-xs font-semibold text-[#078d83]">Emergency?</p>
              <p className="text-[11px] text-[#056e66] mt-0.5">01700-000000</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex-shrink-0 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <Menu size={20} />
          </button>
          <div className="w-6 h-6 bg-[#078d83] rounded-md flex items-center justify-center flex-shrink-0">
            <Droplet size={13} className="text-red-600 fill-red-600" />
          </div>
          <h1 className="font-bold text-gray-800 text-sm sm:text-base truncate">THE DREAMERS BLOOD BANK</h1>

          {isBloodGroupSection && (
            <div className="ml-auto flex items-center gap-2 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search donor..."
                  className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#078d83] transition-colors"
                />
                {searchTerm && <button onClick={() => setSearchTerm("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={13} /></button>}
              </div>
              <select
                value={availabilityFilter}
                onChange={e => setAvailabilityFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 outline-none focus:border-[#078d83] bg-white"
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">

          {/* ── HOME ── */}
          {activeSection === "home" && (
            <div>
              {/* Hero */}
              <div className="relative bg-gradient-to-br from-[#078d83] via-[#067a71] to-[#056e66] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="relative z-10 px-6 py-8 flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1 text-xs font-medium mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Active Blood Bank
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-1">Donate Blood, Save Lives</h2>
                    <p className="text-white/75 text-sm mb-2"
                      style={{ fontFamily: "'Noto Serif Bengali', serif" }}>
                      মানবতার টানে এগিয়ে আসি রক্তদানে
                    </p>
                    <p className="text-white/70 text-sm max-w-md mb-4">Every 2 seconds someone needs blood. Your single donation can save up to 3 lives.</p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => goTo("b-positive")} className="flex items-center gap-2 bg-white text-[#078d83] font-semibold px-4 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors shadow">
                        <Search size={14} /> Find a Donor
                      </button>
                      <button onClick={() => goTo("activities")} className="flex items-center gap-2 bg-white/20 border border-white/30 text-white font-medium px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors">
                        Our Activities <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:min-w-[140px]">
                    {[
                      { value: "500+", label: "Donors", icon: Droplet, color: "text-red-300" },
                      { value: "1,200+", label: "Lives Saved", icon: Heart, color: "text-pink-300" },
                      { value: "48", label: "Campaigns", icon: Activity, color: "text-green-300" },
                      { value: "120+", label: "Volunteers", icon: Users, color: "text-blue-300" },
                    ].map(({ value, label, icon: Icon, color }) => (
                      <div key={label} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                        <Icon size={14} className={color} />
                        <div>
                          <p className="text-sm font-bold leading-none">{value}</p>
                          <p className="text-[10px] text-white/60">{label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blood Group Quick Select */}
              <div className="px-4 pt-5 pb-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplet size={15} className="text-red-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">Find Donors by Blood Group</h3>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {BLOOD_GROUPS.map(g => (
                      <button
                        key={g.path}
                        onClick={() => goTo(g.path)}
                        className="flex flex-col items-center justify-center py-3 rounded-xl border-2 border-red-100 bg-red-50 hover:bg-red-500 hover:text-white hover:border-red-500 text-red-600 font-bold text-sm transition-all group"
                      >
                        <Droplet size={12} className="mb-1 opacity-50 group-hover:opacity-100" />
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency + Myths/Dos&Don'ts */}
              <div className="px-4 pb-4 grid sm:grid-cols-2 gap-4">

                {/* Emergency */}
                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-5 text-white flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <AlertCircle size={16} />
                    </div>
                    <h3 className="font-bold text-sm">জরুরি রক্তের প্রয়োজন?</h3>
                  </div>
                  <p className="text-red-100 text-xs leading-relaxed mb-3">রোগীর জীবন বাঁচাতে <span className="font-bold text-white">The Dreamers Blood Bank</span> সবসময় আপনার পাশে। আমাদের স্বেচ্ছাসেবী দল ২৪ ঘণ্টা, সপ্তাহের ৭ দিন যেকোনো রক্তের গ্রুপের ডোনার খুঁজে দিতে প্রস্তুত।</p>
                  <div className="space-y-2 mb-3">
                    {[
                      { icon: Phone, text: "01700-000000", label: "হেল্পলাইন" },
                      { icon: Clock, text: "২৪/৭ সেবা", label: "সার্বক্ষণিক" },
                      { icon: MapPin, text: "যশোর, বাংলাদেশ", label: "অবস্থান" },
                    ].map(({ icon: Icon, text, label }) => (
                      <div key={label} className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
                        <Icon size={13} className="flex-shrink-0" />
                        <div>
                          <p className="text-[10px] text-red-200 leading-none">{label}</p>
                          <p className="text-xs font-bold">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => goTo("o-positive")} className="mt-auto w-full bg-white text-red-600 font-bold text-xs py-2 rounded-xl hover:bg-red-50 transition-colors">
                    এখনই ডোনার খুঁজুন →
                  </button>
                </div>

                {/* Myths + Dos&Don'ts tabbed */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
                  <div className="flex rounded-xl bg-gray-100 p-1 mb-4 gap-1">
                    <button
                      onClick={() => {}}
                      id="tab-myths"
                      className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-white shadow-sm text-gray-800 transition-all"
                      onMouseDown={e => {
                        document.getElementById('tab-myths').classList.add('bg-white','shadow-sm','text-gray-800');
                        document.getElementById('tab-myths').classList.remove('bg-transparent','text-gray-500');
                        document.getElementById('tab-dos').classList.remove('bg-white','shadow-sm','text-gray-800');
                        document.getElementById('tab-dos').classList.add('bg-transparent','text-gray-500');
                        document.getElementById('panel-myths').classList.remove('hidden');
                        document.getElementById('panel-dos').classList.add('hidden');
                      }}
                    >💡 ভুল ধারণা</button>
                    <button
                      id="tab-dos"
                      className="flex-1 text-xs font-semibold py-1.5 rounded-lg bg-transparent text-gray-500 transition-all"
                      onMouseDown={e => {
                        document.getElementById('tab-dos').classList.add('bg-white','shadow-sm','text-gray-800');
                        document.getElementById('tab-dos').classList.remove('bg-transparent','text-gray-500');
                        document.getElementById('tab-myths').classList.remove('bg-white','shadow-sm','text-gray-800');
                        document.getElementById('tab-myths').classList.add('bg-transparent','text-gray-500');
                        document.getElementById('panel-dos').classList.remove('hidden');
                        document.getElementById('panel-myths').classList.add('hidden');
                      }}
                    >✅ করণীয়</button>
                  </div>
                  <div id="panel-myths" className="space-y-2 flex-1">
                    {[
                      { myth: "রক্ত দিলে দুর্বল হয়ে যায়", fact: "মাত্র ৪৮ ঘণ্টায় রক্ত পুনরায় তৈরি হয়" },
                      { myth: "রক্ত দিলে সংক্রমণ হয়", fact: "সরঞ্জাম সবসময় নতুন ব্যবহার করা হয়" },
                      { myth: "রক্ত দিলে ব্যথা হয়", fact: "শুধু সূচের সামান্য চিমটানো হয়" },
                      { myth: "বারবার দিলে ক্ষতি হয়", fact: "৩ মাস পর পর দিলে কোনো সমস্যা নেই" },
                    ].map(({ myth, fact }) => (
                      <div key={myth} className="rounded-xl overflow-hidden border border-gray-100">
                        <div className="flex items-center gap-2 bg-red-50 px-3 py-1.5">
                          <span className="text-red-500 text-xs font-bold">❌</span>
                          <p className="text-xs text-red-600">{myth}</p>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5">
                          <span className="text-green-500 text-xs font-bold">✅</span>
                          <p className="text-xs text-green-700 font-medium">{fact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div id="panel-dos" className="hidden space-y-1.5 flex-1">
                    {[
                      { do: true,  text: "প্রচুর পানি পান করুন (২–৩ গ্লাস)" },
                      { do: true,  text: "হালকা খাবার খেয়ে আসুন" },
                      { do: true,  text: "ভালো ঘুমান (অন্তত ৬ ঘণ্টা)" },
                      { do: false, text: "খালি পেটে আসবেন না" },
                      { do: false, text: "দানের আগে ধূমপান করবেন না" },
                      { do: false, text: "অসুস্থ বোধ করলে আসবেন না" },
                    ].map(({ do: isDo, text }) => (
                      <div key={text} className={`flex items-center gap-2 px-3 py-2 rounded-xl ${isDo ? "bg-green-50" : "bg-red-50"}`}>
                        <span className="text-xs flex-shrink-0">{isDo ? "✅" : "❌"}</span>
                        <p className={`text-xs font-medium ${isDo ? "text-green-700" : "text-red-600"}`}>{text}</p>
                      </div>
                    ))}
                    <p className="text-[10px] text-gray-400 text-center pt-2">✅ ১৮–৬০ বছর বয়সী সুস্থ যেকেউ রক্ত দিতে পারেন · প্রতি ৩ মাস পর পর</p>
                  </div>
                </div>
              </div>


              {/* Blood Type Compatibility Table */}
              <div className="px-4 pb-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                    <Droplet size={15} className="text-red-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">Blood Type Compatibility Chart</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Type</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Can Donate To</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Can Receive From</th>
                          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500">Population</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { type: "O+",  donate: "A+, B+, O+, AB+",       receive: "O+, O−",               pop: "36", color: "bg-orange-100 text-orange-700" },
                          { type: "A+",  donate: "A+, AB+",               receive: "A+, A−, O+, O−",        pop: "28", color: "bg-blue-100 text-blue-700" },
                          { type: "B+",  donate: "B+, AB+",               receive: "B+, B−, O+, O−",        pop: "27", color: "bg-green-100 text-green-700" },
                          { type: "AB+", donate: "AB+ only",              receive: "Everyone",             pop: "7",  color: "bg-purple-100 text-purple-700" },
                          { type: "O−",  donate: "Everyone",              receive: "O− only",              pop: "1",  color: "bg-red-100 text-red-700" },
                          { type: "A−",  donate: "A+, A−, AB+, AB−",      receive: "A−, O−",               pop: "1",  color: "bg-blue-100 text-blue-700" },
                          { type: "B−",  donate: "B+, B−, AB+, AB−",      receive: "B−, O−",               pop: "1",  color: "bg-green-100 text-green-700" },
                          { type: "AB−", donate: "AB+, AB−",              receive: "A−, B−, O−, AB−",      pop: "0.5",color: "bg-purple-100 text-purple-700" },
                        ].map(({ type, donate, receive, pop, color }) => (
                          <tr key={type} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${color}`}>{type}</span></td>
                            <td className="px-4 py-2.5 text-sm text-gray-600">{donate}</td>
                            <td className="px-4 py-2.5 text-sm text-gray-600">{receive}</td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                                  <div className="bg-[#078d83] h-1.5 rounded-full" style={{ width: `${pop}%` }} />
                                </div>
                                <span className="text-xs text-gray-500 w-8">{pop}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-gray-400 px-4 py-2.5 border-t border-gray-50">* Population % based on Bangladesh-specific data (South Asian demographics).</p>
                </div>
              </div>

              {/* Donor Benefits Section */}
              <div className="px-4 pb-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart size={15} className="text-red-500 fill-red-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">রক্তদানে দাতার যে উপকার হয়</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { emoji: "🩸", title: "হৃদরোগেরঝুঁকি কমে", desc: "রক্তদানে রক্ত পাতলা হয়, ফলে রক্তনালিতে চাপ কমে যায়। গবেষণায় দেখা গেছে, নিয়মিত রক্তদাতাদের হার্ট অ্যাটাকের সম্ভাবনা প্রায় ১৮০% কমে যায়।" },
                      { emoji: "🔬", title: "বিনামূল্যে স্বাস্থ্য পরীক্ষা", desc: "প্রতিবার রক্তদানের আগে রক্তচাপ, হিমোগ্লোবিন, হেপাটাইটিস, এইচআইভি সহ পাঁচধরনের সংক্রমণ পরীক্ষা বিনামূল্যে করা হয় — যা বারে বারে ডাক্তারের কাছে যাওয়ার ঝামেলা থেকে বাঁচায়।" },
                      { emoji: "🔄", title: "নতুন রক্তকণিকা তৈরি হয়", desc: "রক্তদানের পর মাত্র ৪৮ ঘণ্টার মধ্যে প্লাজমা পুনরায় তৈরি হয় ও ২০০০ কোটিরও বেশি নতুন রক্তকণিকা তৈরি হতে শুরু করে। এতে রক্ত সতেজ ও শরীর সুস্থ থাকে।" },
                      { emoji: "⚖️", title: "অতিরিক্ত আয়রন কমে", desc: "শরীরে জমে থাকা অতিরিক্ত আয়রন বের হয়ে যায়, যা লিভার ও হার্টের জন্য উপকারী।" },
                      { emoji: "😊", title: "মানসিক তৃপ্তি", desc: "অন্যের জীবন বাঁচানোর অনুভূতি মানসিক প্রশান্তি ও আত্মতুষ্টি দেয়।" },
                      { emoji: "🏥", title: "ক্যান্সারের ঝুঁকি কমে", desc: "গবেষণায় দেখা গেছে নিয়মিত রক্তদানকারীদের কিছু ক্যান্সারের ঝুঁকি কম থাকে।" },
                    ].map(({ emoji, title, desc }) => (
                      <div key={title} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="text-2xl flex-shrink-0">{emoji}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-0.5">{title}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What Happens After Donation — Timeline */}
              <div className="px-4 pb-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Heart size={15} className="text-red-500" />
                    <h3 className="font-semibold text-gray-800 text-sm">রক্তদানের পরে কী হয়?</h3>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-gray-100" />
                    <div className="space-y-5">
                      {[
                        { time: "০ মিনিট",       title: "রক্তদান সম্পন্ন",      desc: "মাত্র ১০ মিনিটে নিরাপদে ৪৫০ মিলি রক্ত সংগ্রহ করা হয়।",              color: "bg-red-500" },
                        { time: "২–৪ ঘণ্টা",      title: "পরীক্ষা-নিরীক্ষা",     desc: "রক্ত সংক্রমণমুক্ত কিনা এবং রক্তের গ্রুপ নিশ্চিত করা হয়।",          color: "bg-orange-500" },
                        { time: "২৪ ঘণ্টা",       title: "প্রক্রিয়াকরণ",         desc: "লোহিত কণিকা, প্লাজমা ও প্লেটলেটে আলাদা করা হয়।",                  color: "bg-yellow-500" },
                        { time: "৩ দিন",          title: "ব্যবহারের জন্য প্রস্তুত", desc: "উপাদানগুলো সংরক্ষণ করে হাসপাতালে সরবরাহের জন্য প্রস্তুত করা হয়।", color: "bg-[#078d83]" },
                        { time: "৪২ দিন পর্যন্ত", title: "একটি জীবন বাঁচায়",    desc: "লোহিত রক্তকণিকা দান করার পর ৪২ দিন পর্যন্ত ব্যবহার করা যায়।",    color: "bg-green-500" },
                      ].map(({ time, title, desc, color }) => (
                        <div key={time} className="flex gap-3">
                          <div className={`w-4 h-4 rounded-full ${color} flex-shrink-0 mt-1 z-10 border-2 border-white shadow-sm`} />
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold text-[#078d83] bg-[#078d83]/10 px-2 py-0.5 rounded-full">{time}</span>
                              <span className="text-sm font-semibold text-gray-800">{title}</span>
                            </div>
                            <p className="text-sm text-gray-500">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ACTIVITIES ── */}
          {activeSection === "activities" && (
            <div className="p-6 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Activity size={18} className="text-[#078d83]" />
                <h2 className="text-xl font-bold text-gray-800">Blood Bank Activities</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activities.map((a, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img src={a.image} alt={a.title} className="w-full h-44 object-cover" />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">{a.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-3">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PRESIDENT ── */}
          {activeSection === "president" && (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <User size={18} className="text-[#078d83]" />
                <h2 className="text-xl font-bold text-gray-800">Blood Bank President</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#078d83] to-[#056e66] px-6 py-8 flex flex-col sm:flex-row items-center gap-5">
                  <img src={president.image} alt={president.name} className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover flex-shrink-0" />
                  <div className="text-white text-center sm:text-left">
                    <h3 className="text-2xl font-bold">{president.name}</h3>
                    <p className="text-white/80 text-sm mt-1">{president.profession}</p>
                    <p className="text-white/80 text-sm">{president.education}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="bg-[#078d83]/5 border-l-4 border-[#078d83] rounded-r-xl px-4 py-3">
                    <p className="text-sm italic text-gray-700">"{president.quote}"</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mission</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{president.mission}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── MEMBERS ── */}
          {activeSection === "members" && (
            <div className="p-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#078d83]" />
                  <h2 className="text-xl font-bold text-gray-800">Members</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={memberSearch}
                      onChange={e => setMemberSearch(e.target.value)}
                      placeholder="Search..."
                      className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#078d83] transition-colors"
                    />
                  </div>
                  <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <button onClick={() => setMemberViewMode('grid')} className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${memberViewMode === 'grid' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                      <LayoutGrid size={13} /> Grid
                    </button>
                    <button onClick={() => setMemberViewMode('list')} className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${memberViewMode === 'list' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                      <List size={13} /> List
                    </button>
                  </div>
                </div>
              </div>

              {memberViewMode === 'grid' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredMembers.map(m => (
                    <div key={m.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#078d83]/20 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                        {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <User size={22} className="text-gray-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{m.name}</p>
                        <p className="text-xs text-gray-500 truncate">{m.profession} · {m.institution}</p>
                        <span className="inline-block mt-1 bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{m.bloodGroup}</span>
                      </div>
                    </div>
                  ))}
                  {filteredMembers.length === 0 && <p className="text-sm text-gray-400 col-span-2 text-center py-10">No members found</p>}
                </div>
              )}

              {memberViewMode === 'list' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Profession</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Institution</th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Blood</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map(m => (
                        <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-100 flex items-center justify-center">
                                {m.image ? <img src={m.image} alt={m.name} className="w-full h-full object-cover" /> : <User size={16} className="text-gray-400" />}
                              </div>
                              <span className="font-medium text-gray-800">{m.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-sm">{m.profession}</td>
                          <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-sm truncate max-w-[160px]">{m.institution}</td>
                          <td className="px-4 py-3">
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{m.bloodGroup}</span>
                          </td>
                        </tr>
                      ))}
                      {filteredMembers.length === 0 && <tr><td colSpan={4} className="text-center py-10 text-sm text-gray-400">No members found</td></tr>}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ABOUT ── */}
          {activeSection === "about" && (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Building size={18} className="text-[#078d83]" />
                <h2 className="text-xl font-bold text-gray-800">About Blood Bank</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-12 h-12 bg-[#078d83]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Droplet size={22} className="text-[#078d83]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">The Dreamers Blood Bank</h3>
                    <p className="text-xs text-gray-500">Est. 2018 · Jashore, Bangladesh</p>
                  </div>
                </div>
                {[
                  { label: "Phone", value: "01700-000000", icon: Phone },
                  { label: "Address", value: "Jashore, Bangladesh", icon: MapPin },
                  { label: "Working Hours", value: "24/7 Emergency Support", icon: Clock },
                  { label: "Blood Types Available", value: "A+, A-, B+, B-, O+, O-, AB+, AB-", icon: Droplet },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <Icon size={16} className="text-[#078d83] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-medium text-gray-700">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── DONOR PAGES ── */}
          {isBloodGroupSection && (
            <div className="p-4 pt-2">
              <div className="sticky top-0 z-20 bg-gray-50 flex items-center justify-between px-2 py-3 mb-1">
                <div className="flex items-center gap-2">
                  <Droplet size={16} className="text-[#078d83]" />
                  <h2 className="font-bold text-gray-800 capitalize">
                    {BLOOD_GROUPS.find(g => g.path === activeSection)?.label} Blood Donors
                  </h2>
                </div>
                <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <button onClick={() => setDonorViewMode('grid')} className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${donorViewMode === 'grid' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <LayoutGrid size={13} /> Grid
                  </button>
                  <button onClick={() => setDonorViewMode('list')} className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors ${donorViewMode === 'list' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
                    <List size={13} /> List
                  </button>
                </div>
              </div>
              <BloodGroupPage bloodGroup={activeSection} searchTerm={searchTerm} availabilityFilter={availabilityFilter} viewMode={donorViewMode} />
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default BloodBankPage;
