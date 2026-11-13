import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Droplets, CalendarDays, Users, GitBranch, MessageSquare, LogOut, Menu, X, ShieldCheck } from "lucide-react";
import logo from "../assets/Images/logo.png";

const menuItems = [
  { name: "Dashboard",  path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blood Bank", path: "/admin/blood-bank", icon: Droplets },
  { name: "Events",     path: "/admin/events",     icon: CalendarDays },
  { name: "Members",    path: "/admin/members",    icon: Users },
  { name: "Branches",   path: "/admin/branches",   icon: GitBranch },
  { name: "Messages",   path: "/admin/messages",   icon: MessageSquare },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/");
  };

  const SidebarContent = ({ onNav }) => (
    <div className="flex flex-col h-full">
      {/* Logo + Toggle */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : "justify-between"}`}>
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-9 h-9 rounded-xl flex-shrink-0" />
          {!collapsed && (
            <div>
              <p className="text-white font-bold text-sm leading-tight">The Dreamers</p>
              <p className="text-white/50 text-[10px]">Admin Panel</p>
            </div>
          )}
        </div>
        <button onClick={() => setCollapsed(c => !c)} className="hidden md:flex text-white/60 hover:text-white transition-colors flex-shrink-0">
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
        <button onClick={() => setMobileOpen(false)} className="md:hidden text-white/60 hover:text-white transition-colors flex-shrink-0">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {menuItems.map(({ name, path, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              onClick={onNav}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                ${active
                  ? "bg-white text-[#078d83] shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3 space-y-1">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-white/20">
              {user.photo
                ? <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                : <div className="w-full h-full bg-white/20 flex items-center justify-center"><ShieldCheck size={14} className="text-white" /></div>
              }
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">{user.name || "Admin"}</p>
              <p className="text-white/40 text-[10px] truncate">{user.email || ""}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col flex-shrink-0 bg-gradient-to-b from-[#078d83] to-[#034d47] transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
        <SidebarContent onNav={() => {}} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-56 bg-gradient-to-b from-[#078d83] to-[#034d47]">
            <SidebarContent onNav={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar — only menu button, no header */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600">
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold text-gray-800">
            {menuItems.find(m => m.path === location.pathname)?.name || "Admin"}
          </p>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
