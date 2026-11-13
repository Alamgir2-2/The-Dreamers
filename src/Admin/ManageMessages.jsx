import React, { useState } from "react";
import { Trash2, Mail, MailOpen, X, MessageSquare } from "lucide-react";

const ManageMessages = () => {
  const [messages, setMessages] = useState([
    { id: 1, name: "Sarah Ahmed",   email: "sarah@example.com", subject: "Inquiry about volunteering", message: "I would like to join as a volunteer and help the organization.", date: "2024-01-15", read: false },
    { id: 2, name: "Mike Johnson",  email: "mike@example.com",  subject: "Blood donation request",    message: "Need O+ blood urgently for a patient at Dhaka Medical.", date: "2024-01-14", read: true  },
  ]);
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleView = (msg) => {
    setSelected(msg);
    setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m));
  };

  const handleDelete = () => {
    setMessages(prev => prev.filter(m => m.id !== deleteId));
    if (selected?.id === deleteId) setSelected(null);
    setDeleteId(null);
  };

  const unread = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">{unread} unread · {messages.length} total</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400">No messages yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              onClick={() => handleView(msg)}
              className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${i !== 0 ? "border-t border-gray-100" : ""} ${!msg.read ? "bg-[#078d83]/5" : ""}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${!msg.read ? "bg-[#078d83]/15" : "bg-gray-100"}`}>
                {msg.read ? <MailOpen size={16} className="text-gray-400" /> : <Mail size={16} className="text-[#078d83]" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm truncate ${!msg.read ? "font-semibold text-gray-800" : "font-medium text-gray-700"}`}>{msg.name}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{msg.date}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${!msg.read ? "text-gray-700 font-medium" : "text-gray-500"}`}>{msg.subject}</p>
                <p className="text-xs text-gray-400 truncate mt-0.5">{msg.message}</p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); setDeleteId(msg.id); }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-800">{selected.subject}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selected.name} · {selected.email} · {selected.date}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 ml-4"><X size={18} /></button>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">{selected.message}</div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setSelected(null)} className="flex-1 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">Close</button>
              <button onClick={() => { setDeleteId(selected.id); setSelected(null); }} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 text-sm font-medium transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 size={22} className="text-red-500" /></div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Delete Message?</h3>
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

export default ManageMessages;
