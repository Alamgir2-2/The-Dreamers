import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Search, Filter, X, Phone, Mail, MapPin, Droplet, Calendar, Building, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import API_URL from '../../config/api';

const imageVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1.5 } },
};

const cardVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1.6, delay: 0.3 } },
};

const MemberCard = React.memo(({ member, onClick }) => (
  <div className="relative cursor-pointer mt-8 sm:mt-16" onClick={() => onClick(member)}>
    <motion.div
      className="absolute -top-8 sm:-top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-lg z-[1] transition-transform hover:scale-115"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
      variants={imageVariants}
    >
      {member.photo ? (
        <img src={member.photo} alt={member.name} className="w-full h-full object-cover object-center" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center">
          <User size={24} className="sm:hidden text-blue-600" />
          <User size={48} className="hidden sm:block text-blue-600" />
        </div>
      )}
    </motion.div>

    <motion.div
      className="bg-white h-full border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-gray-500 pt-10 sm:pt-20 pb-2 sm:pb-6 px-2 sm:px-6 text-center"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
      variants={cardVariants}
    >
      <h2 className="text-xs sm:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">{member.name}</h2>
      <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-green-600 line-clamp-1">{member.orgPosition || 'Member'}</p>
      <p className="mt-1 sm:mt-4 text-[10px] sm:text-sm text-gray-600 line-clamp-1">{member.professionType || 'N/A'}</p>
    </motion.div>
  </div>
));

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [positionOpen, setPositionOpen] = useState(false);
  const [professionOpen, setProfessionOpen] = useState(false);
  const positionRef = useRef(null);
  const professionRef = useRef(null);
  const itemsPerPage = 20;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (positionRef.current && !positionRef.current.contains(e.target)) setPositionOpen(false);
      if (professionRef.current && !professionRef.current.contains(e.target)) setProfessionOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/members`);
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };

  const positions = [...new Set(members.map(m => m.orgPosition).filter(Boolean))];
  const professions = [...new Set(members.map(m => m.professionType).filter(Boolean))];

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !selectedPosition || member.orgPosition === selectedPosition;
      const matchesProfession = !selectedProfession || member.professionType === selectedProfession;
      return matchesSearch && matchesPosition && matchesProfession;
    });
  }, [members, searchTerm, selectedPosition, selectedProfession]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedPosition, selectedProfession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Users size={64} className="mx-auto text-[#078d83] mb-4 animate-pulse" />
          <p className="text-xl text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Member Detail Modal ── */}
      {selectedMember && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", duration: 0.3 }}
          >
            <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-green-500 text-white p-4 sm:p-6 flex justify-between items-start">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 sm:border-4 border-white flex-shrink-0">
                  {selectedMember.photo ? (
                    <img src={selectedMember.photo} alt={selectedMember.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-white/20 flex items-center justify-center">
                      <User size={40} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold">{selectedMember.name}</h2>
                  <p className="text-sm sm:text-base text-blue-100">{selectedMember.orgPosition || 'Member'}</p>
                </div>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-white hover:bg-white/20 p-2 rounded-lg">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              {selectedMember.mobile && (
                <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                  <div className="bg-green-500 p-2 rounded-full"><Phone size={18} className="text-white" /></div>
                  <div><p className="text-xs text-gray-500">Mobile</p><p className="text-gray-800 font-medium">{selectedMember.mobile}</p></div>
                </div>
              )}
              {selectedMember.email && (
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                  <div className="bg-blue-500 p-2 rounded-full"><Mail size={18} className="text-white" /></div>
                  <div><p className="text-xs text-gray-500">Email</p><p className="text-gray-800 font-medium">{selectedMember.email}</p></div>
                </div>
              )}
              {selectedMember.professionType && (
                <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                  <div className="bg-purple-500 p-2 rounded-full"><Building size={18} className="text-white" /></div>
                  <div>
                    <p className="text-xs text-gray-500">Profession</p>
                    <p className="text-gray-800 font-medium">{selectedMember.professionType}</p>
                    {selectedMember.institution && <p className="text-sm text-gray-600 mt-1">{selectedMember.institution}</p>}
                    {selectedMember.designation && <p className="text-sm text-gray-600">{selectedMember.designation}</p>}
                  </div>
                </div>
              )}
              {selectedMember.bloodGroup && (
                <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                  <div className="bg-red-500 p-2 rounded-full"><Droplet size={18} className="text-white" /></div>
                  <div><p className="text-xs text-gray-500">Blood Group</p><p className="text-gray-800 font-medium">{selectedMember.bloodGroup}</p></div>
                </div>
              )}
              {selectedMember.lastBloodDonation && (
                <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                  <div className="bg-orange-500 p-2 rounded-full"><Calendar size={18} className="text-white" /></div>
                  <div><p className="text-xs text-gray-500">Last Blood Donation</p><p className="text-gray-800 font-medium">{new Date(selectedMember.lastBloodDonation).toLocaleDateString()}</p></div>
                </div>
              )}
              {selectedMember.school && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-500 rounded"></div>Education
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700"><span className="font-medium">School:</span> {selectedMember.school}</p>
                    {selectedMember.college && <p className="text-sm text-gray-700"><span className="font-medium">College:</span> {selectedMember.college}</p>}
                    {selectedMember.university && <p className="text-sm text-gray-700"><span className="font-medium">University:</span> {selectedMember.university}</p>}
                  </div>
                </div>
              )}
              {selectedMember.orgBranch && (
                <div className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-100">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-teal-500 rounded"></div>Organization
                  </h3>
                  <p className="text-sm text-gray-700"><span className="font-medium">Branch:</span> {selectedMember.orgBranch}</p>
                </div>
              )}
              {selectedMember.currentAddress && (
                <div className="flex items-start gap-3 bg-pink-50 p-3 rounded-lg">
                  <div className="bg-pink-500 p-2 rounded-full"><MapPin size={18} className="text-white" /></div>
                  <div><p className="text-xs text-gray-500">Current Address</p><p className="text-sm text-gray-700 mt-1">{selectedMember.currentAddress}</p></div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Hero Header ── */}
      <div className="relative overflow-visible" style={{ zIndex: 10 }}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#078d83] via-[#056e66] to-[#034d47]" />
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.03]" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-5 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">

            {/* ── Left: Icon + Title ── */}
            <motion.div
              className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 lg:pt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg flex-shrink-0">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">Members List</h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs sm:text-sm text-white/70 font-medium">
                    {filteredMembers.length} Members{(searchTerm || selectedPosition || selectedProfession) && ' found'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* ── Right: Search & Filters ── */}
            <motion.div
              className="flex-1 space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 text-sm outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Filter dropdowns */}
              <div className="grid grid-cols-2 gap-2">

                {/* Position filter */}
                <div className="relative" ref={positionRef} style={{ zIndex: positionOpen ? 100 : 20 }}>
                  <button
                    onClick={() => { setPositionOpen(!positionOpen); setProfessionOpen(false); }}
                    className="w-full flex items-center justify-between gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Filter size={12} className="text-white/60 flex-shrink-0" />
                      <span className="truncate text-white/80">{selectedPosition || 'All Positions'}</span>
                    </div>
                    <ChevronDown size={13} className={`flex-shrink-0 text-white/50 transition-transform duration-200 ${positionOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {positionOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 max-h-52 overflow-y-auto" style={{ zIndex: 9999 }}>
                      <div onClick={() => { setSelectedPosition(''); setPositionOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#078d83]/10 ${!selectedPosition ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-700'}`}>All Positions</div>
                      {positions.map(pos => (
                        <div key={pos} onClick={() => { setSelectedPosition(pos); setPositionOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#078d83]/10 border-t border-gray-100 ${selectedPosition === pos ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-700'}`}>{pos}</div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profession filter */}
                <div className="relative" ref={professionRef} style={{ zIndex: professionOpen ? 100 : 20 }}>
                  <button
                    onClick={() => { setProfessionOpen(!professionOpen); setPositionOpen(false); }}
                    className="w-full flex items-center justify-between gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-all"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Filter size={12} className="text-white/60 flex-shrink-0" />
                      <span className="truncate text-white/80">{selectedProfession || 'All Professions'}</span>
                    </div>
                    <ChevronDown size={13} className={`flex-shrink-0 text-white/50 transition-transform duration-200 ${professionOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {professionOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 max-h-52 overflow-y-auto" style={{ zIndex: 9999 }}>
                      <div onClick={() => { setSelectedProfession(''); setProfessionOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#078d83]/10 ${!selectedProfession ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-700'}`}>All Professions</div>
                      {professions.map(prof => (
                        <div key={prof} onClick={() => { setSelectedProfession(prof); setProfessionOpen(false); }} className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#078d83]/10 border-t border-gray-100 ${selectedProfession === prof ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-700'}`}>{prof}</div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* Active filter chips */}
              {(selectedPosition || selectedProfession) && (
                <div className="flex flex-wrap gap-2">
                  {selectedPosition && (
                    <button onClick={() => setSelectedPosition('')} className="flex items-center gap-1.5 bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs text-white hover:bg-white/30 transition-all">
                      {selectedPosition} <X size={11} />
                    </button>
                  )}
                  {selectedProfession && (
                    <button onClick={() => setSelectedProfession('')} className="flex items-center gap-1.5 bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs text-white hover:bg-white/30 transition-all">
                      {selectedProfession} <X size={11} />
                    </button>
                  )}
                </div>
              )}
            </motion.div>

          </div>
        </div>

        {/* Bottom wave */}
        <div className="relative h-6 sm:h-8">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* ── Members Grid ── */}
      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {paginatedMembers.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-20 lg:gap-8 pt-6 sm:pt-12">
              {paginatedMembers.map(member => (
                <MemberCard key={`${member.id}-${currentPage}`} member={member} onClick={setSelectedMember} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No members found</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;