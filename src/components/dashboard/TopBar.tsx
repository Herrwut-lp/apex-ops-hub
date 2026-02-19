import { useState } from "react";
import { Bell, ChevronDown, Plus } from "lucide-react";

const periods = ["January 2026", "February 2026", "March 2026"];

export function TopBar() {
  const [period, setPeriod] = useState("February 2026");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-transparent">
      {/* Left: Title */}
      <h1 className="text-xl font-bold text-foreground">Dashboard</h1>

      {/* Centre: Period pill */}
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-[13px] font-medium text-foreground shadow-sm hover:shadow-md transition-all duration-150"
        >
          {period}
          <ChevronDown size={14} className={`text-muted-foreground transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-[160px]">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => { setPeriod(p); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors duration-100
                  ${p === period ? "text-primary bg-secondary font-medium" : "text-foreground hover:bg-muted"}`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-[13px] font-semibold hover:bg-primary/90 transition-colors duration-150 shadow-sm">
          <Plus size={14} />
          New
        </button>

        <div className="relative">
          <button className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors duration-150 shadow-sm">
            <Bell size={16} className="text-foreground" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full flex items-center justify-center text-[9px] font-bold text-danger-foreground">
            3
          </span>
        </div>

        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center border border-primary/20">
          <span className="text-primary text-xs font-bold">AM</span>
        </div>
      </div>
    </div>
  );
}
