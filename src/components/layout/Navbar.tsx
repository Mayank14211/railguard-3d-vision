
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Settings, User, BarChart2, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  path: string;
  icon: React.ComponentType;
  notifications?: number;
};

const navItems: NavItem[] = [
  { 
    name: "Dashboard", 
    path: "/", 
    icon: BarChart2 
  },
  { 
    name: "Logs", 
    path: "/logs", 
    icon: Bell,
    notifications: 2 
  },
  { 
    name: "Settings", 
    path: "/settings", 
    icon: Settings 
  },
  { 
    name: "Profile", 
    path: "/profile", 
    icon: User 
  },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-theme-darker/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center font-bold text-xl">
                <span className="text-theme-blue">Rail</span>
                <span className="text-theme-purple">Guard</span>
                <span className="text-xs ml-1 bg-theme-blue/20 px-1.5 py-0.5 rounded text-theme-blue">3D</span>
              </div>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative",
                        isActive 
                          ? "text-white bg-theme-blue/20 glow-effect" 
                          : "text-gray-300 hover:text-white hover:bg-theme-blue/10"
                      )}
                    >
                      <item.icon className="h-4 w-4 mr-1.5" />
                      {item.name}
                      {item.notifications && (
                        <span className="ml-1.5 bg-theme-red text-white h-5 min-w-5 flex items-center justify-center rounded-full text-xs px-1.5">
                          {item.notifications}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="bg-theme-blue/20 text-theme-blue hover:bg-theme-blue/30 inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-theme-darker border-b border-white/10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-base font-medium",
                  isActive 
                    ? "text-white bg-theme-blue/20" 
                    : "text-gray-300 hover:text-white hover:bg-theme-blue/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
                {item.notifications && (
                  <span className="ml-2 bg-theme-red text-white text-xs px-1.5 py-0.5 rounded-full">
                    {item.notifications}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
