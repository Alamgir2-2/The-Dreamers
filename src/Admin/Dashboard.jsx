import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Droplets, CalendarDays, Users, GitBranch, ArrowRight, ShieldCheck } from "lucide-react";
import API_URL from "../config/api";

const Dashboard = () => {
  const [counts, setCounts] = useState({ members: 0, events: 0, donors: 0, branches: 0 });
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/api/members`).then(r => r.json()),
      fetch(`${API_URL}/api/events`).then(r => r.json()),
      fetch(`${API_URL}/api/donors`).then(r => r.json()),
      fetch(`${API_URL}/api/org-branches`).then(r => r.json()),
    ]).then(([members, events, donors, branches]) => {
      setCounts({ members: members.length, events: events.length, donors: donors.length, branches: branches.length });
    }).catch(console.error);
  }, []);

  const stats = [
    { label: "Total Members",  value: counts.members,  icon: Users,       color: "from-[#078d83] to-[#056e66]", path: "/admin/members"    },
    { label: "Events",         value: counts.events,   icon: CalendarDays, color: "from-blue-500 to-blue-600",   path: "/admin/events"     },
    { label: "Blood Donors",   value: counts.donors,   icon: Droplets,    color: "from-red-500 to-red-600",     path: "/admin/blood-bank" },
    { label: "Branches",       value: counts.branches, icon: GitBranch,   color: "from-purple-500 to-purple-600", path: "/admin/branches" },
  ];

  const quickLinks = [
    { label: "Manage Members",   path: "/admin/members",    icon: Users,        desc: "Edit, delete or promote members" },
    { label: "Manage Events",    path: "/admin/events",     icon: CalendarDays, desc: "Create and update events" },
    { label: "Blood Bank",       path: "/admin/blood-bank", icon: Droplets,     desc: "Manage blood donors" },
    { label: "Branches",         path: "/admin/branches",   icon: GitBranch,    desc: "Manage org positions & branches" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-[#078d83] via-[#056e66] to-[#034d47] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-6 w-52 h-52 rounded-full bg-white/5" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div>
            <p className="text-white/70 text-sm">Welcome back,</p>
            <h1 className="text-2xl font-bold">{user.name || "Admin"}</h1>
            <p className="text-white/60 text-xs mt-0.5">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, path }) => (
          <Link key={label} to={path} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={18} className="text-white" />
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#078d83] transition-colors" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map(({ label, path, icon: Icon, desc }) => (
            <Link key={path} to={path} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#078d83]/30 transition-all group flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#078d83]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#078d83] transition-colors">
                <Icon size={18} className="text-[#078d83] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#078d83] ml-auto transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
