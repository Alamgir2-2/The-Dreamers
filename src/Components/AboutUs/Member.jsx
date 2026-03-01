import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, User, Search, Filter, X, Phone, Mail, MapPin, Droplet, Calendar, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import API_URL from '../../config/api';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/members`);
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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedPosition, selectedProfession]);

  const imageVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1.5 },
    },
  };

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1.6, delay: 0.3 },
    },
  };

  const MemberCard = ({ member }) => (
    <div className="relative cursor-pointer" onClick={() => setSelectedMember(member)}>
      <motion.div
        className="absolute -top-8 sm:-top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-lg z-10 transition-transform hover:scale-115"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
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
        className="bg-white h-full border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-gray-500 pt-10 sm:pt-20 pb-2 sm:pb-6 px-1 sm:px-6 text-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
      >
        <h2 className="text-[10px] sm:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">{member.name}</h2>
        <p className="mt-0.5 sm:mt-2 text-[8px] sm:text-sm text-green-600 line-clamp-1">{member.orgPosition || 'Member'}</p>
        <p className="mt-0.5 sm:mt-4 text-[8px] sm:text-sm text-gray-600 line-clamp-1">{member.professionType || 'N/A'}</p>
      </motion.div>
    </div>
  );

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
    <div className="min-h-screen">
      {selectedMember && (
        <motion.div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" 
          onClick={() => setSelectedMember(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
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
                  <div className="bg-green-500 p-2 rounded-full">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="text-gray-800 font-medium">{selectedMember.mobile}</p>
                  </div>
                </div>
              )}
              {selectedMember.email && (
                <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">{selectedMember.email}</p>
                  </div>
                </div>
              )}
              {selectedMember.professionType && (
                <div className="flex items-start gap-3 bg-purple-50 p-3 rounded-lg">
                  <div className="bg-purple-500 p-2 rounded-full">
                    <Building size={18} className="text-white" />
                  </div>
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
                  <div className="bg-red-500 p-2 rounded-full">
                    <Droplet size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Blood Group</p>
                    <p className="text-gray-800 font-medium">{selectedMember.bloodGroup}</p>
                  </div>
                </div>
              )}
              {selectedMember.lastBloodDonation && (
                <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg">
                  <div className="bg-orange-500 p-2 rounded-full">
                    <Calendar size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Blood Donation</p>
                    <p className="text-gray-800 font-medium">{new Date(selectedMember.lastBloodDonation).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
              {selectedMember.school && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-1 h-5 bg-blue-500 rounded"></div>
                    Education
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
                    <div className="w-1 h-5 bg-teal-500 rounded"></div>
                    Organization
                  </h3>
                  <p className="text-sm text-gray-700"><span className="font-medium">Branch:</span> {selectedMember.orgBranch}</p>
                </div>
              )}
              {selectedMember.currentAddress && (
                <div className="flex items-start gap-3 bg-pink-50 p-3 rounded-lg">
                  <div className="bg-pink-500 p-2 rounded-full">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current Address</p>
                    <p className="text-sm text-gray-700 mt-1">{selectedMember.currentAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="text-center mb-12 sm:mb-20 bg-blue-50 py-6 sm:py-12 px-2 sm:px-6">
        <div className="flex justify-center mb-2 sm:mb-3">
          <Users size={32} className="sm:hidden text-[#078d83]" />
          <Users size={40} className="hidden sm:block text-[#078d83]" />
        </div>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#078d83]">Members List</h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-base text-gray-600">The Dreamers - Complete Information of All Members</p>
        
        <div className="mt-4 sm:mt-6 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2 sm:gap-3 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-xs sm:text-sm"
              />
            </div>
            <div className="flex gap-1.5 sm:gap-2">
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                <Filter size={12} className="sm:hidden text-gray-500" />
                <Filter size={14} className="hidden sm:block text-gray-500" />
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="px-1.5 sm:px-2 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[10px] sm:text-xs"
                >
                  <option value="">All Positions</option>
                  {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
                </select>
              </div>
              <select
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className="px-1.5 sm:px-2 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-[10px] sm:text-xs"
              >
                <option value="">All Professions</option>
                {professions.map(prof => <option key={prof} value={prof}>{prof}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 flex justify-center">
          <div className="bg-blue-200 backdrop-blur-md rounded-full px-3 sm:px-4 py-0.5 sm:py-1">
            <span className="text-xs sm:text-sm font-semibold text-gray-700">Total Members: {filteredMembers.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {paginatedMembers.length > 0 ? (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-20 lg:gap-8">
              {paginatedMembers.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 mb-8">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                >
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
