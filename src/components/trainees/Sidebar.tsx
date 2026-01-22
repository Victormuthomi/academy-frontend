// src/components/trainees/Sidebar.tsx
import React, { useState } from "react";
import {
  CalendarIcon,
  UserCircleIcon,
  PencilSquareIcon,
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  handleLogout,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      icon: <DocumentTextIcon className="w-5 h-5 mr-2" />,
      tab: "dashboard",
    },
    {
      label: "Journals",
      icon: <CalendarIcon className="w-5 h-5 mr-2" />,
      tab: "journals",
    },
    {
      label: "Profile",
      icon: <UserCircleIcon className="w-5 h-5 mr-2" />,
      tab: "profile",
    },
    {
      label: "Edit Profile",
      icon: <PencilSquareIcon className="w-5 h-5 mr-2" />,
      tab: "editProfile",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden flex justify-between items-center p-4 bg-gray-800">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800/90 p-6 flex flex-col space-y-6 lg:w-64 lg:block fixed lg:static h-full top-0 z-50 transition-transform transform ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h1 className="hidden lg:block text-2xl font-bold">Alcodist Academy</h1>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center p-2 rounded-lg hover:bg-indigo-600/50 transition ${
                activeTab === item.tab ? "bg-indigo-500/40" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-2 rounded-lg hover:bg-red-600/50 transition mt-2"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
