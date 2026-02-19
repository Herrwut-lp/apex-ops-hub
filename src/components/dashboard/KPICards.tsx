import { DollarSign, Camera, AlertCircle, Mail, TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Revenue This Month",
    value: "$28,450",
    sub: "▲ $4,200 vs last month",
    subColor: "text-success",
    Icon: DollarSign,
    iconColor: "text-primary/10",
  },
  {
    title: "Active Projects",
    value: "12",
    sub: "3 due this week",
    subColor: "text-warning",
    Icon: Camera,
    iconColor: "text-warning/10",
  },
  {
    title: "Overdue Invoices",
    value: "4",
    sub: "$6,800 outstanding",
    subColor: "text-danger",
    Icon: AlertCircle,
    iconColor: "text-danger/10",
  },
  {
    title: "Unanswered Emails",
    value: "7",
    sub: "2 over SLA",
    subColor: "text-danger",
    Icon: Mail,
    iconColor: "text-danger/10",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.Icon;
        return (
          <div
            key={card.title}
            className="relative bg-card rounded-2xl p-5 card-shadow overflow-hidden cursor-default
              transition-all duration-200 hover:-translate-y-0.5 hover:card-shadow-hover"
          >
            {/* Ghost watermark icon */}
            <Icon
              size={72}
              strokeWidth={1}
              className={`absolute -bottom-3 -right-3 ${card.iconColor}`}
              aria-hidden="true"
            />

            <p className="text-[12px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
              {card.title}
            </p>
            <p className="text-3xl font-bold text-foreground mb-2">{card.value}</p>
            <p className={`text-[12px] font-medium ${card.subColor}`}>{card.sub}</p>
          </div>
        );
      })}
    </div>
  );
}
