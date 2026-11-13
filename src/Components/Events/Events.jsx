import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, X, CalendarDays } from 'lucide-react';
import API_URL from '../../config/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then(r => r.json())
      .then(setEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* ── Event Detail Modal ── */}
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            {selected.image && (
              <img src={selected.image} alt={selected.title} className="w-full h-52 object-cover rounded-t-2xl" />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800 pr-4">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 text-sm text-[#078d83]">
                  <Calendar size={14} />
                  {new Date(selected.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                {selected.location && (
                  <span className="flex items-center gap-1.5 text-sm text-gray-500">
                    <MapPin size={14} /> {selected.location}
                  </span>
                )}
              </div>
              <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: selected.description }} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-[#078d83] via-[#056e66] to-[#034d47] overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative z-10 px-4 sm:px-6 py-2 sm:py-4 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-lg mx-auto mb-2">
              <CalendarDays size={20} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">Our Events</h1>
            <p className="text-white/70 text-sm">Seminars, conferences, competitions and more — all in one place.</p>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="relative h-12 sm:h-16">
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0 64 L0 32 Q360 0 720 32 Q1080 64 1440 32 L1440 64 Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* ── Events Grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <CalendarDays size={48} className="text-[#078d83] animate-pulse" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-24">
            <CalendarDays size={56} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-400 text-lg">No events yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => setSelected(event)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                {event.image ? (
                  <div className="h-44 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                ) : (
                  <div className="h-44 bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center">
                    <CalendarDays size={40} className="text-[#078d83]/40" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#078d83] font-medium mb-2">
                    <Calendar size={12} />
                    {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-base leading-snug line-clamp-2 mb-2">{event.title}</h3>
                  {event.location && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                      <MapPin size={11} /> {event.location}
                    </div>
                  )}
                  <div className="text-sm text-gray-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: event.description }} />
                  <button className="mt-4 text-xs font-semibold text-[#078d83] hover:underline">View Details →</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
