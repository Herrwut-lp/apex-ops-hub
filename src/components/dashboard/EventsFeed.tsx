import { ArrowRight, AlertCircle, FileText, Mail, CheckCircle, MessageSquare, CalendarClock } from "lucide-react";

type EventType = "danger" | "warning" | "success" | "primary";

const eventMeta: Record<EventType, { border: string; iconBg: string; iconColor: string }> = {
  danger: {
    border: "border-l-danger",
    iconBg: "bg-danger/10",
    iconColor: "text-danger",
  },
  warning: {
    border: "border-l-warning",
    iconBg: "bg-warning/10",
    iconColor: "text-warning",
  },
  success: {
    border: "border-l-success",
    iconBg: "bg-success/10",
    iconColor: "text-success",
  },
  primary: {
    border: "border-l-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
};

const events = [
  {
    type: "danger" as EventType,
    Icon: AlertCircle,
    text: "Invoice #INV-042 overdue · Nova Brands · $3,200",
    time: "3 days ago",
  },
  {
    type: "warning" as EventType,
    Icon: FileText,
    text: "Contract signed by client · TechFlow · awaiting countersignature",
    time: "1 hour ago",
  },
  {
    type: "danger" as EventType,
    Icon: Mail,
    text: "Email unanswered 48hrs · James Wu · Meridian Corp",
    time: "2 days ago",
  },
  {
    type: "success" as EventType,
    Icon: CheckCircle,
    text: "Payment received · Apex Retail · $8,500",
    time: "Today",
  },
  {
    type: "primary" as EventType,
    Icon: MessageSquare,
    text: "New enquiry via web form · Sarah Chen · Brand Video",
    time: "4 hours ago",
  },
  {
    type: "warning" as EventType,
    Icon: CalendarClock,
    text: "Shoot day tomorrow · Q1 Campaign Shoot · Nova Brands",
    time: "Reminder",
  },
];

export function EventsFeed() {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold text-foreground">Events & Actions</h2>
        <button className="text-[12px] text-primary font-medium hover:opacity-70 transition-opacity">
          View All
        </button>
      </div>

      <div className="space-y-2">
        {events.map((e, i) => {
          const meta = eventMeta[e.type];
          const Icon = e.Icon;
          return (
            <div
              key={i}
              className={`group flex items-center gap-3 pl-3 pr-2.5 py-3 rounded-r-xl border-l-[3px] ${meta.border} bg-muted/30
                hover:bg-muted/60 transition-colors duration-150 cursor-default`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${meta.iconBg}`}>
                <Icon size={13} className={meta.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-foreground font-medium leading-snug truncate">{e.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{e.time}</p>
              </div>
              <ArrowRight
                size={13}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
