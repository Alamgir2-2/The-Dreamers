import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, User, Search, X, Phone, Mail, MapPin, Droplet, Calendar, Building, ChevronLeft, ChevronRight, MoreVertical, Trash2, Filter, ChevronDown, Pencil, LayoutGrid, List, ShieldCheck, ShieldOff } from "lucide-react";
import toast from 'react-hot-toast';
import API_URL from "../config/api";

const imageVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1.5 } },
};

const cardVariants = {
  offscreen: { y: 100, opacity: 0 },
  onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1.6, delay: 0.3 } },
};

const CardMenu = ({ onDelete, onEdit, onToggleAdmin, isAdmin }) => {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 10 }} onClick={e => e.stopPropagation()}>
      <button
        onPointerDown={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <MoreVertical size={14} />
      </button>
      {open && (
        <div
          style={{ position: 'absolute', right: 0, top: '28px', zIndex: 9999, width: '160px' }}
          className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <button
            onPointerDown={e => { e.stopPropagation(); onEdit(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Pencil size={12} /> Edit Member
          </button>
          <button
            onPointerDown={e => { e.stopPropagation(); onToggleAdmin(); setOpen(false); }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors border-t border-gray-100 ${isAdmin ? 'text-orange-500 hover:bg-orange-50' : 'text-teal-600 hover:bg-teal-50'}`}
          >
            {isAdmin ? <><ShieldOff size={12} /> Remove Admin</> : <><ShieldCheck size={12} /> Make Admin</>}
          </button>
          <button
            onPointerDown={e => { e.stopPropagation(); onDelete(); setOpen(false); }}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
          >
            <Trash2 size={12} /> Delete Member
          </button>
        </div>
      )}
    </div>
  );
};

const MemberCard = React.memo(({ member, onClick, onDelete, onEdit, onToggleAdmin }) => (
  <div className="relative cursor-pointer mt-8 sm:mt-12 md:mt-16" onClick={() => onClick(member)}>
    <motion.div
      className="absolute -top-8 sm:-top-12 md:-top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-lg z-[1] transition-transform hover:scale-105"
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
      className="relative bg-white h-full border border-gray-200 rounded-lg shadow-lg overflow-visible hover:shadow-gray-500 pt-10 sm:pt-16 md:pt-20 pb-2 sm:pb-4 px-2 sm:px-4 text-center"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
      variants={cardVariants}
    >
      <div className="absolute top-2 right-2">
        <CardMenu onDelete={() => onDelete(member.id)} onEdit={() => onEdit(member)} onToggleAdmin={() => onToggleAdmin(member)} isAdmin={member.isAdmin} />
      </div>
      <h2 className="text-xs sm:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">{member.name}</h2>
      <p className="mt-1 sm:mt-2 text-[10px] sm:text-sm text-green-600 line-clamp-1">{member.orgPosition || "Member"}</p>
      <p className="mt-1 sm:mt-4 text-[10px] sm:text-sm text-gray-600 line-clamp-1">{member.professionType || "N/A"}</p>
    </motion.div>
  </div>
));

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [positionOpen, setPositionOpen] = useState(false);
  const [professionOpen, setProfessionOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [editForm, setEditForm] = useState({ orgPosition: '', orgBranch: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [orgPositions, setOrgPositions] = useState([]);
  const [orgBranches, setOrgBranches] = useState([]);
  const [adminConfirm, setAdminConfirm] = useState(null); // member object
  const [viewMode, setViewMode] = useState('card');
  const [currentPage, setCurrentPage] = useState(1);
  const positionRef = React.useRef(null);
  const professionRef = React.useRef(null);
  const itemsPerPage = 20;

  useEffect(() => {
    fetchMembers();
    fetch(`${API_URL}/api/org-positions`).then(r => r.json()).then(setOrgPositions).catch(console.error);
    fetch(`${API_URL}/api/org-branches`).then(r => r.json()).then(setOrgBranches).catch(console.error);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (positionRef.current && !positionRef.current.contains(e.target)) setPositionOpen(false);
      if (professionRef.current && !professionRef.current.contains(e.target)) setProfessionOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/members`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setEditLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/members/${editMember.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgPosition: editForm.orgPosition, orgBranch: editForm.orgBranch }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setMembers(prev => prev.map(m => m.id === editMember.id ? { ...m, orgPosition: editForm.orgPosition, orgBranch: editForm.orgBranch } : m));
      setEditMember(null);
    } catch (err) {
      console.error('Failed to update member:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setEditLoading(false);
    }
  };

  const handleToggleAdmin = async () => {
    const member = adminConfirm;
    setAdminConfirm(null);
    try {
      const res = await fetch(`${API_URL}/api/members/${member.id}/make-admin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAdmin: !member.isAdmin }),
      });
      if (!res.ok) throw new Error();
      setMembers(prev => prev.map(m => m.id === member.id ? { ...m, isAdmin: !member.isAdmin } : m));
      toast.success(member.isAdmin ? `${member.name} is no longer an admin.` : `${member.name} is now an admin!`);
    } catch { toast.error('Failed to update admin status.'); }
  };

  const openEdit = (member) => {
    setEditMember(member);
    setEditForm({ orgPosition: member.orgPosition || '', orgBranch: member.orgBranch || '' });
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/members/${deleteId}`, { method: "DELETE" });
      setMembers(prev => prev.filter(m => m.id !== deleteId));
      if (selectedMember?.id === deleteId) setSelectedMember(null);
    } catch (err) {
      console.error("Failed to delete member:", err);
    } finally {
      setDeleteId(null);
    }
  };

  const positions = [...new Set(members.map(m => m.orgPosition).filter(Boolean))];
  const professions = [...new Set(members.map(m => m.professionType).filter(Boolean))];

  const filteredMembers = useMemo(() =>
    members.filter(m => {
      const matchesSearch = m.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = !selectedPosition || m.orgPosition === selectedPosition;
      const matchesProfession = !selectedProfession || m.professionType === selectedProfession;
      return matchesSearch && matchesPosition && matchesProfession;
    }),
    [members, searchTerm, selectedPosition, selectedProfession]
  );

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedPosition, selectedProfession]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <Users size={48} className="mx-auto text-[#078d83] mb-3 animate-pulse" />
          <p className="text-gray-500">Loading members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 -m-8 overflow-x-hidden">

      {/* ── Edit Modal ── */}
      {editMember && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setEditMember(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800">Edit Member</h3>
              <button onClick={() => setEditMember(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{editMember.name}</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Organization Position / Designation</label>
                <select
                  value={editForm.orgPosition}
                  onChange={e => setEditForm(f => ({ ...f, orgPosition: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] transition-colors bg-white"
                >
                  <option value="">-- Select Position --</option>
                  {orgPositions.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Branch</label>
                <select
                  value={editForm.orgBranch}
                  onChange={e => setEditForm(f => ({ ...f, orgBranch: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] transition-colors bg-white"
                >
                  <option value="">-- Select Branch --</option>
                  {orgBranches.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditMember(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleEdit} disabled={editLoading} className="flex-1 py-2 rounded-xl bg-[#078d83] hover:bg-[#056e66] text-white text-sm font-medium transition-colors disabled:opacity-60">
                {editLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Confirm Admin Toggle Modal ── */}
      {adminConfirm && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setAdminConfirm(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${adminConfirm.isAdmin ? 'bg-orange-100' : 'bg-teal-100'}`}>
              {adminConfirm.isAdmin ? <ShieldOff size={22} className="text-orange-500" /> : <ShieldCheck size={22} className="text-teal-600" />}
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {adminConfirm.isAdmin ? 'Remove Admin?' : 'Make Admin?'}
            </h3>
            <p className="text-xs text-gray-500 mb-1">{adminConfirm.name}</p>
            <p className="text-xs text-gray-400 mb-5">
              {adminConfirm.isAdmin ? 'This member will lose admin access.' : 'This member will get admin access.'}
            </p>
            <div className="flex gap-2">
              <button onClick={() => setAdminConfirm(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button
                onClick={handleToggleAdmin}
                className={`flex-1 py-2 rounded-xl text-white text-sm font-medium transition-colors ${adminConfirm.isAdmin ? 'bg-orange-500 hover:bg-orange-600' : 'bg-teal-600 hover:bg-teal-700'}`}
              >
                {adminConfirm.isAdmin ? 'Remove' : 'Confirm'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Confirm Delete Modal ── */}
      {deleteId && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Delete Member?</h3>
            <p className="text-xs text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Member Detail Modal ── */}
      {selectedMember && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
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
                  <p className="text-sm sm:text-base text-blue-100">{selectedMember.orgPosition || "Member"}</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#078d83] via-[#056e66] to-[#034d47]" />
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/[0.03]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-5 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">

            {/* Left: Icon + Title */}
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

            {/* Right: Search & Filters */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <div className="space-y-2">
                {/* Search + Filters in one row */}
                <div className="flex items-center gap-2">
                  {/* Search - medium width */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={14} />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-8 pr-8 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 text-sm outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                    />
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Position Filter - small */}
                  <div className="relative w-36" ref={positionRef} style={{ zIndex: positionOpen ? 100 : 20 }}>
                    <button
                      onClick={() => { setPositionOpen(!positionOpen); setProfessionOpen(false); }}
                      className={`w-full flex items-center justify-between gap-1 rounded-xl px-2.5 py-2 text-[11px] font-medium transition-all border ${
                        selectedPosition ? 'bg-white text-[#078d83] border-white' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <span className="truncate">{selectedPosition || 'Position'}</span>
                      <ChevronDown size={11} className={`flex-shrink-0 opacity-60 transition-transform duration-200 ${positionOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {positionOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-52 overflow-y-auto" style={{ zIndex: 9999 }}>
                        <div onClick={() => { setSelectedPosition(''); setPositionOpen(false); }} className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#078d83]/10 transition-colors ${!selectedPosition ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-600'}`}>All Positions</div>
                        {positions.map(pos => (
                          <div key={pos} onClick={() => { setSelectedPosition(pos); setPositionOpen(false); }} className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#078d83]/10 border-t border-gray-50 transition-colors ${selectedPosition === pos ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-600'}`}>{pos}</div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Profession Filter - small */}
                  <div className="relative w-36" ref={professionRef} style={{ zIndex: professionOpen ? 100 : 20 }}>
                    <button
                      onClick={() => { setProfessionOpen(!professionOpen); setPositionOpen(false); }}
                      className={`w-full flex items-center justify-between gap-1 rounded-xl px-2.5 py-2 text-[11px] font-medium transition-all border ${
                        selectedProfession ? 'bg-white text-[#078d83] border-white' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
                      }`}
                    >
                      <span className="truncate">{selectedProfession || 'Profession'}</span>
                      <ChevronDown size={11} className={`flex-shrink-0 opacity-60 transition-transform duration-200 ${professionOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {professionOpen && (
                      <div className="absolute top-full right-0 mt-1.5 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-52 overflow-y-auto" style={{ zIndex: 9999, minWidth: '160px' }}>
                        <div onClick={() => { setSelectedProfession(''); setProfessionOpen(false); }} className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#078d83]/10 transition-colors ${!selectedProfession ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-600'}`}>All Professions</div>
                        {professions.map(prof => (
                          <div key={prof} onClick={() => { setSelectedProfession(prof); setProfessionOpen(false); }} className={`px-3 py-2 text-xs cursor-pointer hover:bg-[#078d83]/10 border-t border-gray-50 transition-colors ${selectedProfession === prof ? 'bg-[#078d83]/10 text-[#078d83] font-semibold' : 'text-gray-600'}`}>{prof}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Active filter chips */}
                {(selectedPosition || selectedProfession) && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPosition && (
                      <button onClick={() => setSelectedPosition('')} className="flex items-center gap-1 bg-white text-[#078d83] rounded-full px-2.5 py-1 text-[11px] font-medium hover:bg-white/90 transition-all shadow-sm">
                        {selectedPosition} <X size={10} />
                      </button>
                    )}
                    {selectedProfession && (
                      <button onClick={() => setSelectedProfession('')} className="flex items-center gap-1 bg-white text-[#078d83] rounded-full px-2.5 py-1 text-[11px] font-medium hover:bg-white/90 transition-all shadow-sm">
                        {selectedProfession} <X size={10} />
                      </button>
                    )}
                    <button onClick={() => { setSelectedPosition(''); setSelectedProfession(''); }} className="flex items-center gap-1 bg-white/20 text-white/70 rounded-full px-2.5 py-1 text-[11px] hover:bg-white/30 transition-all">
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

          </div>
        </div>

        <div className="relative h-6 sm:h-8">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 48 L0 24 Q360 0 720 24 Q1080 48 1440 24 L1440 48 Z" fill="#f3f4f6" />
          </svg>
        </div>
      </div>

      {/* ── Members Grid / List ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden">

        {/* View Toggle */}
        <div className="flex justify-end pt-4 sm:pt-6">
          <div className="flex bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === 'card' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <LayoutGrid size={14} /> Card
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-[#078d83] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <List size={14} /> List
            </button>
          </div>
        </div>

        {paginatedMembers.length > 0 ? (
          <>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8 pt-6 sm:pt-12">
                {paginatedMembers.map(member => (
                  <MemberCard key={`${member.id}-${currentPage}`} member={member} onClick={setSelectedMember} onDelete={setDeleteId} onEdit={openEdit} onToggleAdmin={setAdminConfirm} />
                ))}
              </div>
            ) : (
              <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Member</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Position</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Branch</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Profession</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Mobile</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMembers.map((member, idx) => (
                      <tr
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-400 text-xs">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-indigo-200 flex items-center justify-center">
                                  <User size={16} className="text-blue-600" />
                                </div>
                              )}
                            </div>
                            <span className="font-medium text-gray-800 text-sm">{member.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-xs text-green-600 font-medium">{member.orgPosition || '—'}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-xs text-gray-500">{member.orgBranch || '—'}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs text-gray-500">{member.professionType || '—'}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-xs text-gray-500">{member.mobile || '—'}</span>
                        </td>
                        <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                          <CardMenu onDelete={() => setDeleteId(member.id)} onEdit={() => openEdit(member)} onToggleAdmin={() => setAdminConfirm(member)} isAdmin={member.isAdmin} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

export default ManageMembers;
