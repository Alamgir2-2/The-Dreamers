import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, CalendarDays, MapPin, Calendar, ImagePlus } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API_URL from '../config/api';

const empty = { title: '', description: '', date: '', location: '', image: '' };

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | event object (edit)
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/events`);
      setEvents(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setForm(empty); setModal('create'); };
  const openEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? event.date.slice(0, 10) : '',
      location: event.location || '',
      image: event.image || '',
    });
    setModal(event);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file: reader.result }),
        });
        const data = await res.json();
        setForm(f => ({ ...f, image: data.imageUrl }));
        toast.success('Image uploaded!');
      } catch (err) { toast.error('Failed to upload image.'); }
      finally { setImgUploading(false); }
    };
  };

  const handleSave = async () => {
    if (!form.title || !form.date || !form.description) return;
    setSaving(true);
    try {
      const isEdit = modal !== 'create';
      const url = isEdit ? `${API_URL}/api/events/${modal.id}` : `${API_URL}/api/events`;
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || 'Failed to save.');
        return;
      }
      const saved = await res.json();
      if (isEdit) {
        setEvents(prev => prev.map(e => e.id === modal.id ? saved : e));
        toast.success('Event updated!');
      } else {
        setEvents(prev => [saved, ...prev]);
        toast.success('Event created!');
      }
      setModal(null);
    } catch (err) {
      toast.error('Network error. Is the server running?');
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await fetch(`${API_URL}/api/events/${deleteId}`, { method: 'DELETE' });
      setEvents(prev => prev.filter(e => e.id !== deleteId));
      toast.success('Event deleted!');
    } catch (err) { toast.error('Failed to delete.'); }
    finally { setDeleteId(null); }
  };

  return (
    <div>
      {/* ── Form Modal ── */}
      {modal && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setModal(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-semibold text-gray-800">{modal === 'create' ? 'Create Event' : 'Edit Event'}</h3>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Title *</label>
                <input
                  value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]"
                  placeholder="Event title"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Date *</label>
                <input
                  type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Location</label>
                <input
                  value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#078d83]"
                  placeholder="e.g. Dhaka, Online..."
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Image</label>
                <div
                  onClick={() => !imgUploading && fileRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#078d83] transition-colors"
                >
                  {form.image ? (
                    <div className="relative">
                      <img src={form.image} alt="preview" className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, image: '' })); }}
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                      {imgUploading ? (
                        <><div className="w-6 h-6 border-2 border-[#078d83] border-t-transparent rounded-full animate-spin mb-2" /><span className="text-xs">Uploading...</span></>
                      ) : (
                        <><ImagePlus size={28} className="mb-2 text-gray-300" /><span className="text-xs font-medium">Click to upload image</span><span className="text-[10px] mt-0.5">JPG, PNG, WEBP</span></>
                      )}
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Description *</label>
                <ReactQuill
                  theme="snow"
                  value={form.description}
                  onChange={val => setForm(f => ({ ...f, description: val }))}
                  modules={{ toolbar: [[{ header: [1,2,3,false] }], ['bold','italic','underline','strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], ['clean']] }}
                  className="rounded-xl overflow-hidden"
                  style={{ background: '#fff' }}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setModal(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.date || !form.description} className="flex-1 py-2 rounded-xl bg-[#078d83] hover:bg-[#056e66] text-white text-sm font-medium transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Delete Event?</h3>
            <p className="text-xs text-gray-500 mb-5">This action cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium">Delete</button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} events total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-[#078d83] hover:bg-[#056e66] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Create Event
        </button>
      </div>

      {/* ── Events Grid ── */}
      {loading ? (
        <div className="flex justify-center py-24">
          <CalendarDays size={40} className="text-[#078d83] animate-pulse" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-gray-100">
          <CalendarDays size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400">No events yet. Create your first event!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {event.image ? (
                <div className="h-40 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center">
                  <CalendarDays size={36} className="text-[#078d83]/30" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-[#078d83] mb-1.5">
                  <Calendar size={11} />
                  {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{event.title}</h3>
                {event.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <MapPin size={10} /> {event.location}
                  </div>
                )}
                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{event.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEdit(event)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-blue-200 text-blue-500 hover:bg-blue-50 text-xs font-medium transition-colors"
                  >
                    <Pencil size={11} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(event.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs font-medium transition-colors"
                  >
                    <Trash2 size={11} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
