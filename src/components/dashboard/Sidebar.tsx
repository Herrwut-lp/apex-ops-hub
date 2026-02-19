import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  FileText,
  DollarSign,
  MessageSquare,
  Globe,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "CRM & Pipeline", icon: Users, path: "/crm" },
  { label: "Projects", icon: FolderOpen, path: "/projects" },
  { label: "Contracts", icon: FileText, path: "/contracts" },
  { label: "Financials", icon: DollarSign, path: "/financials" },
  { label: "Communications", icon: MessageSquare, path: "/communications" },
  { label: "Client Portal", icon: Globe, path: "/portal" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-card border-r border-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-primary-foreground text-sm font-700 font-bold tracking-tight">AM</span>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-foreground leading-tight truncate">Apex Media Co.</p>
          <p className="text-[11px] text-muted-foreground truncate">Production Ops</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => setActive(item.label)}
                  className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 group
                    ${isActive
                      ? "bg-secondary text-primary sidebar-active-bar"
                      : "text-sidebar-foreground hover:bg-secondary/60 hover:text-primary"
                    }`}
                >
                  <Icon
                    size={16}
                    className={`shrink-0 transition-colors duration-150 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <span className="text-primary text-xs font-bold">AM</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-foreground truncate">Alex Mercer</p>
            <span className="inline-block text-[10px] font-medium bg-primary/10 text-primary rounded-full px-2 py-0.5 leading-tight">
              Owner
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
