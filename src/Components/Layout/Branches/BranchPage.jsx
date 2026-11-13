import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, MapPin, Users, Activity, Search, Phone, Mail, Calendar, ChevronRight, Award, Droplet, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import API_URL from "../../../config/api";
import dreamers from "../../../assets/Images/Gallery/img3.jpg";

const BranchPage = () => {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/branches/${id}`).then(r => r.json()),
      fetch(`${API_URL}/api/members`).then(r => r.json()),
      fetch(`${API_URL}/api/events`).then(r => r.json()),
    ]).then(([b, allMembers, allEvents]) => {
      setBranch(b);
      setMembers(allMembers.filter(m => b.memberIds?.includes(m.id)));
      setEvents(allEvents.filter(e => b.eventIds?.includes(e.id)));
      // president is a member
      const pres = allMembers.find(m => m.id === b.presidentId);
      if (pres) setBranch(prev => ({ ...prev, _president: pres }));
    }).catch(console.error)
    .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <GitBranch size={40} className="text-[#078d83] animate-pulse" />
    </div>
  );

  if (!branch || branch.error) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
        <div className="text-5xl mb-4">📋</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">শাখা খুঁজে পাওয়া যায়নি</h2>
        <button className="mt-4 bg-[#078d83] text-white px-6 py-2.5 rounded-xl text-sm font-medium" onClick={() => window.history.back()}>
          পূর্বের পৃষ্ঠায় ফিরে যান
        </button>
      </div>
    </div>
  );

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const tabs = [
    { key: "overview",   label: "সংক্ষিপ্ত বিবরণ", icon: Activity },
    { key: "activities", label: "কার্যক্রম",         icon: Award,  count: events.length },
    { key: "president",  label: "সভাপতি",            icon: User },
    { key: "members",    label: "সদস্যবৃন্দ",        icon: Users,  count: members.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-r from-[#078d83] to-[#034d47]">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${dreamers})` }} />
        <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-5xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{branch.name}</h1>
            {branch.location && (
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <MapPin size={14} /> {branch.location}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Users,  value: members.length,          label: "সদস্য",    color: "bg-blue-500" },
            { icon: Award,  value: events.length,           label: "কার্যক্রম", color: "bg-purple-500" },
            { icon: Droplet, value: branch.bloodDonations || 0, label: "রক্তদান",  color: "bg-red-500" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
              <div className={`${color} w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <Icon className="text-white" size={20} />
              </div>
              <div className="text-xl font-bold text-gray-800">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {tabs.map(({ key, label, icon: Icon, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === key ? "bg-[#078d83] text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              <Icon size={15} /> {label}
              {count !== undefined && <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>{count}</span>}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">শাখা সম্পর্কে</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-base font-semibold text-[#078d83] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#078d83] rounded-full" /> আমাদের লক্ষ্য
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{branch.presidentMission || "তথ্য যোগ করা হয়নি।"}</p>
                  <ul className="space-y-2">
                    {["আর্থিকভাবে পিছিয়ে পড়া শিক্ষার্থীদের সহায়তা","রক্তদান কর্মসূচি পরিচালনা","বৃক্ষরোপণ কর্মসূচি","দারিদ্রকে সহায়তা প্রদান"].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-[#078d83] rounded-full mt-1.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#078d83]/5 rounded-xl p-5 border border-[#078d83]/15">
                  <h3 className="text-base font-semibold text-[#078d83] mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#078d83] rounded-full" /> যোগাযোগ
                  </h3>
                  <div className="space-y-3">
                    {branch.location && <div className="flex items-start gap-3"><div className="p-1.5 bg-white rounded-lg text-[#078d83] shadow-sm"><MapPin size={15} /></div><div><p className="text-xs text-gray-500">ঠিকানা</p><p className="text-sm text-gray-700">{branch.location}</p></div></div>}
                    {branch.phone && <div className="flex items-start gap-3"><div className="p-1.5 bg-white rounded-lg text-[#078d83] shadow-sm"><Phone size={15} /></div><div><p className="text-xs text-gray-500">ফোন</p><p className="text-sm text-gray-700">{branch.phone}</p></div></div>}
                    {branch.email && <div className="flex items-start gap-3"><div className="p-1.5 bg-white rounded-lg text-[#078d83] shadow-sm"><Mail size={15} /></div><div><p className="text-xs text-gray-500">ইমেইল</p><p className="text-sm text-gray-700">{branch.email}</p></div></div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* President */}
          {activeTab === "president" && (() => {
            const p = branch._president;
            return (
              <div className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">সভাপতির তথ্য</h2>
                {!p ? (
                  <p className="text-gray-400 text-sm text-center py-12">সভাপতির তথ্য যোগ করা হয়নি।</p>
                ) : (
                  <div className="bg-[#078d83]/5 rounded-2xl p-6 border border-[#078d83]/15">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="relative flex-shrink-0">
                        {p.photo
                          ? <img src={p.photo} alt={p.name} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl" />
                          : <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center"><User size={40} className="text-gray-300" /></div>
                        }
                        <div className="absolute -bottom-2 -right-2 bg-[#078d83] text-white p-2 rounded-full shadow-lg"><User size={16} /></div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">{p.name}</h2>
                        {p.orgPosition && <p className="text-[#078d83] font-medium mb-1">{p.orgPosition}</p>}
                        {p.professionType && <p className="text-gray-500 text-sm mb-3">{p.professionType}{p.institution ? ` · ${p.institution}` : ""}</p>}
                        {branch.presidentQuote && <div className="bg-white/80 rounded-lg p-3 mb-4 shadow-sm"><p className="text-gray-600 italic text-sm">"{branch.presidentQuote}"</p></div>}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {branch.presidentEducation && <div><p className="text-xs text-gray-500">শিক্ষা</p><p className="text-gray-700 font-medium">{branch.presidentEducation}</p></div>}
                          {p.mobile && <div><p className="text-xs text-gray-500">ফোন</p><p className="text-gray-700 font-medium">{p.mobile}</p></div>}
                          {p.email && <div className="col-span-2"><p className="text-xs text-gray-500">ইমেইল</p><p className="text-gray-700 font-medium">{p.email}</p></div>}
                        </div>
                      </div>
                    </div>
                    {branch.presidentMission && (
                      <div className="mt-6 pt-5 border-t border-[#078d83]/15">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">লক্ষ্য ও উদ্দেশ্য</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{branch.presidentMission}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Members */}
          {activeTab === "members" && (
            <div className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-800">সদস্যবৃন্দ</h2>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input type="text" placeholder="সদস্য খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#078d83]" />
                </div>
              </div>
              {filteredMembers.length === 0 ? (
                <div className="text-center py-12"><Users size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-400 text-sm">কোন সদস্য পাওয়া যায়নি</p></div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map(m => (
                    <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          {m.photo ? <img src={m.photo} alt={m.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#078d83]/20" /> : <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-100 to-green-100 flex items-center justify-center"><User size={22} className="text-[#078d83]" /></div>}
                          {m.bloodGroup && <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">{m.bloodGroup}</div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-gray-800 truncate">{m.name}</h3>
                          {m.orgPosition && <p className="text-xs text-[#078d83] font-medium">{m.orgPosition}</p>}
                          {m.professionType && <p className="text-xs text-gray-500 truncate">{m.professionType}</p>}
                          {m.institution && <p className="text-xs text-gray-400 truncate">{m.institution}</p>}
                          {m.mobile && <div className="flex items-center gap-1 text-xs text-gray-500 mt-1"><Phone size={10} />{m.mobile}</div>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Activities / Events */}
          {activeTab === "activities" && (
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">কার্যক্রমসমূহ</h2>
              {events.length === 0 ? (
                <div className="text-center py-12"><Award size={40} className="mx-auto text-gray-300 mb-3" /><p className="text-gray-400 text-sm">কোন কার্যক্রম যোগ করা হয়নি</p></div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {events.map(ev => (
                    <div key={ev.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                      {ev.image ? (
                        <div className="h-40 overflow-hidden"><img src={ev.image} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center"><Award size={32} className="text-[#078d83]/30" /></div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#078d83] mb-1.5"><Calendar size={11} />{new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div>
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{ev.title}</h3>
                        <div className="text-xs text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: ev.description }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchPage;
