import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, GitBranch, Award, X, ChevronRight, Users, MapPin, Phone, Mail, User, CalendarDays, Search } from "lucide-react";
import toast from "react-hot-toast";
import API_URL from "../config/api";

const emptyBranch = {
  name: "", location: "", phone: "", email: "", yearsActive: 0, bloodDonations: 0,
  presidentId: "", presidentQuote: "", presidentMission: "",
  memberIds: [], eventIds: [],
};

const ManageBranches = () => {
  const [branches, setBranches] = useState([]);
  const [positions, setPositions] = useState([]);
  const [posInput, setPosInput] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [selected, setSelected] = useState(null); // branch being edited
  const [form, setForm] = useState(emptyBranch);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newBranchName, setNewBranchName] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [memberPickerOpen, setMemberPickerOpen] = useState(false);
  const [presPickerOpen, setPresPickerOpen] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [presSearch, setPresSearch] = useState("");

  useEffect(() => {
    fetchBranches();
    fetch(`${API_URL}/api/members`).then(r => r.json()).then(setAllMembers).catch(console.error);
    fetch(`${API_URL}/api/events`).then(r => r.json()).then(setAllEvents).catch(console.error);
    fetch(`${API_URL}/api/org-positions`).then(r => r.json()).then(setPositions).catch(console.error);
  }, []);

  const fetchBranches = async () => {
    const res = await fetch(`${API_URL}/api/branches`);
    const data = await res.json();
    setBranches(Array.isArray(data) ? data : []);
  };

  const openBranch = (branch) => {
    setSelected(branch);
    setForm({ ...emptyBranch, ...branch });
    setActiveTab("info");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/branches/${selected.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setBranches(prev => prev.map(b => b.id === selected.id ? updated : b));
      setSelected(updated);
      toast.success("Branch updated!");
    } catch { toast.error("Failed to save."); }
    finally { setSaving(false); }
  };

  const handleAddBranch = async () => {
    if (!newBranchName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/api/branches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...emptyBranch, name: newBranchName.trim() }),
      });
      const data = await res.json();
      setBranches(prev => [...prev, data]);
      setNewBranchName("");
      setAddModal(false);
      toast.success("Branch added!");
    } catch { toast.error("Failed to add branch."); }
  };

  const handleDeleteBranch = async () => {
    try {
      await fetch(`${API_URL}/api/branches/${deleteId}`, { method: "DELETE" });
      setBranches(prev => prev.filter(b => b.id !== deleteId));
      if (selected?.id === deleteId) setSelected(null);
      toast.success("Branch deleted!");
    } catch { toast.error("Failed to delete."); }
    finally { setDeleteId(null); }
  };

  const addPosition = async () => {
    const val = posInput.trim();
    if (!val) return;
    try {
      const res = await fetch(`${API_URL}/api/org-positions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: val }) });
      const data = await res.json();
      setPositions(prev => [...prev, data]);
      setPosInput("");
      toast.success("Position added!");
    } catch { toast.error("Failed to add."); }
  };

  const deletePosition = async (id) => {
    try {
      await fetch(`${API_URL}/api/org-positions/${id}`, { method: "DELETE" });
      setPositions(prev => prev.filter(p => p.id !== id));
      toast.success("Deleted!");
    } catch { toast.error("Failed to delete."); }
  };

  const toggleMember = (id) => {
    setForm(f => ({
      ...f,
      memberIds: f.memberIds.includes(id) ? f.memberIds.filter(m => m !== id) : [...f.memberIds, id],
    }));
  };

  const toggleEvent = (id) => {
    setForm(f => ({
      ...f,
      eventIds: f.eventIds.includes(id) ? f.eventIds.filter(e => e !== id) : [...f.eventIds, id],
    }));
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
      <input
        type={type}
        value={form[key] || ""}
        onChange={e => setForm(f => ({ ...f, [key]: type === "number" ? Number(e.target.value) : e.target.value }))}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] transition-colors"
      />
    </div>
  );

  const textarea = (label, key, placeholder = "") => (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1 block">{label}</label>
      <textarea
        value={form[key] || ""}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] resize-none transition-colors"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Branches & Positions</h1>
          <p className="text-sm text-gray-500 mt-0.5">{branches.length} branches · click a branch to edit</p>
        </div>
        <button onClick={() => setAddModal(true)} className="flex items-center gap-2 bg-[#078d83] hover:bg-[#056e66] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Branch List + Positions */}
        <div className="space-y-4">
          {/* Branch List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <GitBranch size={15} className="text-[#078d83]" />
              <span className="text-sm font-semibold text-gray-700">Branches</span>
              <span className="ml-auto text-xs text-[#078d83] bg-[#078d83]/10 px-2 py-0.5 rounded-full">{branches.length}</span>
            </div>
            <div className="divide-y divide-gray-50">
              {branches.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No branches yet</p>}
              {branches.map(b => (
                <div
                  key={b.id}
                  onClick={() => openBranch(b)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors group ${selected?.id === b.id ? "bg-[#078d83]/5 border-l-2 border-[#078d83]" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${selected?.id === b.id ? "bg-[#078d83] text-white" : "bg-gray-100 text-gray-500"}`}>
                    <GitBranch size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${selected?.id === b.id ? "text-[#078d83]" : "text-gray-700"}`}>{b.name}</p>
                    {b.location && <p className="text-xs text-gray-400 truncate">{b.location}</p>}
                  </div>
                  <div className="flex items-center gap-1">
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500" />
                    <button
                      onClick={e => { e.stopPropagation(); setDeleteId(b.id); }}
                      className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Org Positions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <Award size={15} className="text-[#078d83]" />
              <span className="text-sm font-semibold text-gray-700">Org Positions</span>
              <span className="ml-auto text-xs text-[#078d83] bg-[#078d83]/10 px-2 py-0.5 rounded-full">{positions.length}</span>
            </div>
            <div className="p-4">
              <div className="flex gap-2 mb-3">
                <input
                  value={posInput}
                  onChange={e => setPosInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addPosition()}
                  placeholder="e.g., President..."
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]"
                />
                <button onClick={addPosition} className="bg-[#078d83] hover:bg-[#056e66] text-white px-3 py-2 rounded-xl transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {positions.map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl group">
                    <span className="text-xs text-gray-500 w-5">{i + 1}.</span>
                    <span className="flex-1 text-sm text-gray-700">{p.name}</span>
                    <button onClick={() => deletePosition(p.id)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Branch Editor */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex items-center justify-center py-24">
              <div className="text-center">
                <GitBranch size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-400 text-sm">Select a branch to edit</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Branch Header */}
              <div className="bg-gradient-to-r from-[#078d83]/10 to-transparent px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch size={16} className="text-[#078d83]" />
                  <h2 className="text-sm font-semibold text-gray-800">{selected.name}</h2>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#078d83] hover:bg-[#056e66] text-white px-4 py-1.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {[
                  { key: "info", label: "Branch Info", icon: MapPin },
                  { key: "president", label: "President", icon: User },
                  { key: "members", label: "Members", icon: Users },
                  { key: "events", label: "Events", icon: CalendarDays },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === key ? "border-[#078d83] text-[#078d83]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                  >
                    <Icon size={13} /> {label}
                    {key === "members" && <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full">{form.memberIds?.length || 0}</span>}
                    {key === "events" && <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded-full">{form.eventIds?.length || 0}</span>}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-4">
                {/* Info Tab */}
                {activeTab === "info" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {field("Branch Name", "name", "text", "Branch name")}
                      {field("Location", "location", "text", "e.g. Dhaka, Bangladesh")}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {field("Phone", "phone", "text", "+880...")}
                      {field("Email", "email", "email", "branch@example.com")}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {field("Years Active", "yearsActive", "number")}
                      {field("Blood Donations", "bloodDonations", "number")}
                    </div>
                  </>
                )}

                {/* President Tab */}
                {activeTab === "president" && (() => {
                  const pm = allMembers.find(m => m.id === form.presidentId);
                  return (
                    <div className="space-y-4">
                      {/* Current president card */}
                      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200">
                          {pm?.photo ? <img src={pm.photo} alt={pm.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><User size={18} className="text-gray-400" /></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          {pm ? (
                            <>
                              <p className="text-sm font-semibold text-gray-800">{pm.name}</p>
                              <p className="text-xs text-gray-500">{pm.orgPosition || pm.professionType || "Member"}</p>
                              {(pm.university || pm.college || pm.school) && (
                                <p className="text-xs text-gray-400">{pm.university || pm.college || pm.school}{pm.department ? ` · ${pm.department}` : ""}</p>
                              )}
                            </>
                          ) : <p className="text-sm text-gray-400">No president selected</p>}
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setPresPickerOpen(true)} className="text-xs bg-[#078d83] hover:bg-[#056e66] text-white px-3 py-1.5 rounded-lg transition-colors">
                            {pm ? "Change" : "Select"}
                          </button>
                          {pm && <button onClick={() => setForm(f => ({ ...f, presidentId: "" }))} className="text-xs border border-gray-200 text-gray-500 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">Remove</button>}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-4 space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Additional Info</p>
                        {field("Quote", "presidentQuote", "text", "A motivational quote...")}
                        {textarea("Mission / Message", "presidentMission", "President's mission statement...")}
                      </div>
                    </div>
                  );
                })()}

                {/* Members Tab */}
                {activeTab === "members" && (() => {
                  const assignedMembers = allMembers.filter(m => form.memberIds?.includes(m.id));
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">{assignedMembers.length} member{assignedMembers.length !== 1 ? "s" : ""} in this branch</p>
                        <button onClick={() => setMemberPickerOpen(true)} className="flex items-center gap-1.5 text-xs bg-[#078d83] hover:bg-[#056e66] text-white px-3 py-1.5 rounded-lg transition-colors">
                          <Plus size={12} /> Add Member
                        </button>
                      </div>
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {assignedMembers.length === 0 && (
                          <div className="text-center py-10 text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl">No members assigned yet</div>
                        )}
                        {assignedMembers.map(m => (
                          <div key={m.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 bg-gray-50">
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                              {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><User size={14} className="text-gray-400" /></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                              <p className="text-xs text-gray-400 truncate">{m.orgPosition || m.professionType || "Member"}</p>
                            </div>
                            <button onClick={() => toggleMember(m.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Events Tab */}
                {activeTab === "events" && (
                  <div>
                    <p className="text-xs text-gray-500 mb-3">Select events to associate with this branch</p>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {allEvents.map(ev => {
                        const checked = form.eventIds?.includes(ev.id);
                        return (
                          <div
                            key={ev.id}
                            onClick={() => toggleEvent(ev.id)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border transition-all ${checked ? "border-[#078d83] bg-[#078d83]/5" : "border-gray-100 hover:bg-gray-50"}`}
                          >
                            {ev.image ? <img src={ev.image} alt={ev.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" /> : <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0"><CalendarDays size={16} className="text-[#078d83]/40" /></div>}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{ev.title}</p>
                              <p className="text-xs text-gray-400">{new Date(ev.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                            </div>
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${checked ? "bg-[#078d83] border-[#078d83]" : "border-gray-300"}`}>
                              {checked && <svg viewBox="0 0 10 8" className="w-2.5 h-2.5 fill-white"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Branch Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setAddModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-800">Add New Branch</h3>
              <button onClick={() => setAddModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <input
              value={newBranchName}
              onChange={e => setNewBranchName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAddBranch()}
              placeholder="Branch name e.g. Khulna Branch"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] mb-4"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={() => setAddModal(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddBranch} className="flex-1 py-2 rounded-xl bg-[#078d83] hover:bg-[#056e66] text-white text-sm font-medium">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Member Picker Modal */}
      {memberPickerOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setMemberPickerOpen(false); setMemberSearch(""); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Add Members</h3>
              <button onClick={() => { setMemberPickerOpen(false); setMemberSearch(""); }}><X size={16} className="text-gray-400" /></button>
            </div>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={memberSearch}
                onChange={e => setMemberSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm outline-none focus:border-[#078d83]"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {allMembers.filter(m => !form.memberIds?.includes(m.id) && m.name?.toLowerCase().includes(memberSearch.toLowerCase())).map(m => (
                <div key={m.id} onClick={() => { toggleMember(m.id); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border border-transparent hover:bg-gray-50 hover:border-gray-200 transition-all">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                    {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><User size={14} className="text-gray-400" /></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                    <p className="text-xs text-gray-400 truncate">{m.orgPosition || m.professionType || "Member"}</p>
                  </div>
                  <Plus size={14} className="text-[#078d83] flex-shrink-0" />
                </div>
              ))}
              {allMembers.filter(m => !form.memberIds?.includes(m.id) && m.name?.toLowerCase().includes(memberSearch.toLowerCase())).length === 0 && (
                <p className="text-center text-sm text-gray-400 py-6">{memberSearch ? "No results found" : "All members already added"}</p>
              )}
            </div>
            <button onClick={() => { setMemberPickerOpen(false); setMemberSearch(""); }} className="mt-4 w-full py-2 rounded-xl bg-[#078d83] hover:bg-[#056e66] text-white text-sm font-medium">Done</button>
          </div>
        </div>
      )}

      {/* President Picker Modal */}
      {presPickerOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => { setPresPickerOpen(false); setPresSearch(""); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Select President</h3>
              <button onClick={() => { setPresPickerOpen(false); setPresSearch(""); }}><X size={16} className="text-gray-400" /></button>
            </div>
            <div className="relative mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={presSearch}
                onChange={e => setPresSearch(e.target.value)}
                placeholder="Search members..."
                className="w-full border border-gray-200 rounded-xl pl-8 pr-3 py-2 text-sm outline-none focus:border-[#078d83]"
                autoFocus
              />
            </div>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {allMembers.filter(m => m.name?.toLowerCase().includes(presSearch.toLowerCase())).map(m => {
                const selected = form.presidentId === m.id;
                return (
                  <div key={m.id} onClick={() => { setForm(f => ({ ...f, presidentId: m.id })); setPresPickerOpen(false); setPresSearch(""); }} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border transition-all ${selected ? "border-[#078d83] bg-[#078d83]/5" : "border-transparent hover:bg-gray-50"}`}>
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                      {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center"><User size={14} className="text-gray-400" /></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{m.name}</p>
                      <p className="text-xs text-gray-400 truncate">{m.orgPosition || m.professionType || "Member"}</p>
                      {(m.university || m.college || m.school) && <p className="text-xs text-gray-400 truncate">{m.university || m.college || m.school}</p>}
                    </div>
                    {selected && <svg viewBox="0 0 10 8" className="w-3 h-3 flex-shrink-0"><path d="M1 4l3 3 5-6" stroke="#078d83" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Delete Branch?</h3>
            <p className="text-xs text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteBranch} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBranches;
