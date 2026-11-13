import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search, X, Droplets, ImagePlus } from "lucide-react";
import toast from "react-hot-toast";
import API_URL from "../config/api";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const empty = { name: "", bloodGroup: "", phone: "", address: "", institute: "", lastDonation: "", imageUrl: "" };

const ManageBloodBank = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [filterBG, setFilterBG] = useState("All");
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fileRef = React.useRef(null);

  useEffect(() => { fetchDonors(); }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/donors`);
      setDonors(await res.json());
    } catch { toast.error("Failed to load donors."); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setForm(empty); setEditing(null); setModal(true); };
  const openEdit = (d) => { setForm(d); setEditing(d); setModal(true); };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_URL}/api/upload`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ file: reader.result }) });
        const data = await res.json();
        setForm(f => ({ ...f, imageUrl: data.imageUrl }));
        toast.success("Image uploaded!");
      } catch { toast.error("Failed to upload image."); }
      finally { setUploading(false); }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await fetch(`${API_URL}/api/donors/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        toast.success("Donor updated!");
      } else {
        await fetch(`${API_URL}/api/donors`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        toast.success("Donor added!");
      }
      setModal(false);
      fetchDonors();
    } catch { toast.error("Failed to save donor."); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/donors/${deleteId}`, { method: "DELETE" });
      setDonors(prev => prev.filter(d => d.id !== deleteId));
      toast.success("Donor deleted!");
    } catch { toast.error("Failed to delete."); }
    finally { setDeleteId(null); }
  };

  const daysLeft = (last) => {
    const diff = Math.floor((new Date() - new Date(last)) / 86400000);
    return Math.max(0, 90 - diff);
  };

  const filtered = donors.filter(d => {
    const bg = filterBG === "All" || d.bloodGroup === filterBG;
    const s = d.name.toLowerCase().includes(search.toLowerCase()) || d.phone.includes(search);
    return bg && s;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blood Bank</h1>
          <p className="text-sm text-gray-500 mt-0.5">{donors.length} donors registered</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-[#078d83] hover:bg-[#056e66] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Add Donor
        </button>
      </div>

      {/* Blood Group Stats */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {BLOOD_GROUPS.map(bg => {
          const total = donors.filter(d => d.bloodGroup === bg).length;
          const avail = donors.filter(d => d.bloodGroup === bg && daysLeft(d.lastDonation) === 0).length;
          return (
            <button
              key={bg}
              onClick={() => setFilterBG(filterBG === bg ? "All" : bg)}
              className={`rounded-xl p-2.5 text-center border transition-all ${filterBG === bg ? "bg-red-500 border-red-500 text-white" : "bg-white border-gray-100 hover:border-red-200"}`}
            >
              <p className={`text-base font-bold ${filterBG === bg ? "text-white" : "text-red-500"}`}>{bg}</p>
              <p className={`text-[10px] mt-0.5 ${filterBG === bg ? "text-white/80" : "text-gray-400"}`}>{total} total</p>
              <p className={`text-[10px] ${filterBG === bg ? "text-white/80" : "text-green-500"}`}>{avail} avail</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
        <Search size={16} className="text-gray-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
        />
        {search && <button onClick={() => setSearch("")}><X size={14} className="text-gray-400" /></button>}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Name", "Blood", "Phone", "Address", "Institute", "Last Donation", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center"><Droplets size={32} className="mx-auto text-[#078d83] animate-pulse mb-2" /><p className="text-gray-400 text-sm">Loading...</p></td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-400 text-sm">No donors found</td></tr>
              ) : filtered.map(d => {
                const left = daysLeft(d.lastDonation);
                return (
                  <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                          {d.imageUrl ? <img src={d.imageUrl} alt={d.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-red-50 flex items-center justify-center"><Droplets size={12} className="text-red-400" /></div>}
                        </div>
                        <span className="font-medium text-gray-800">{d.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold">{d.bloodGroup}</span></td>
                    <td className="px-4 py-3 text-gray-500">{d.phone}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">{d.address}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[120px] truncate">{d.institute}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{new Date(d.lastDonation).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${left === 0 ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-500"}`}>
                        {left === 0 ? "Available" : `${left}d left`}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => setDeleteId(d.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-800">{editing ? "Edit Donor" : "Add Donor"}</h3>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Full Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]" placeholder="Name" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Blood Group *</label>
                  <select value={form.bloodGroup} onChange={e => setForm(f => ({ ...f, bloodGroup: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83] bg-white">
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Phone *</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]" placeholder="Phone number" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Address *</label>
                <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]" placeholder="Address" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Institute *</label>
                <input value={form.institute} onChange={e => setForm(f => ({ ...f, institute: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]" placeholder="Institute / Organization" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Last Donation *</label>
                <input type="date" value={form.lastDonation} onChange={e => setForm(f => ({ ...f, lastDonation: e.target.value }))} required className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Photo</label>
                <div onClick={() => !uploading && fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#078d83] transition-colors">
                  {form.imageUrl ? (
                    <div className="relative">
                      <img src={form.imageUrl} alt="preview" className="w-full h-32 object-cover" />
                      <button type="button" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, imageUrl: "" })); }} className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1"><X size={12} /></button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                      {uploading ? <><div className="w-5 h-5 border-2 border-[#078d83] border-t-transparent rounded-full animate-spin mb-1" /><span className="text-xs">Uploading...</span></> : <><ImagePlus size={24} className="mb-1 text-gray-300" /><span className="text-xs">Click to upload</span></>}
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2 rounded-xl bg-[#078d83] hover:bg-[#056e66] text-white text-sm font-medium">{editing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Delete Donor?</h3>
            <p className="text-xs text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBloodBank;
