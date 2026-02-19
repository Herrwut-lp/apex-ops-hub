import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Mar", confirmed: 32000, pipeline: 45000 },
  { month: "Apr", confirmed: 38000, pipeline: 52000 },
  { month: "May", confirmed: 44000, pipeline: 60000 },
  { month: "Jun", confirmed: 49000, pipeline: 68000 },
  { month: "Jul", confirmed: 54000, pipeline: 75000 },
  { month: "Aug", confirmed: 58000, pipeline: 80000 },
];

const formatK = (v: number) => `$${(v / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-lg text-[12px]">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-semibold text-foreground">{formatK(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-[14px] font-semibold text-foreground">Revenue Forecast</h2>
          <p className="text-[12px] text-muted-foreground mt-0.5">Next 6 Months</p>
        </div>
        <div className="flex items-center gap-5 text-[12px]">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 bg-primary rounded-full inline-block" />
            <span className="text-muted-foreground font-medium">Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 bg-primary/35 rounded-full inline-block border-t border-dashed border-primary/35" />
            <span className="text-muted-foreground font-medium">Pipeline</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="hsl(220 20% 92%)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "hsl(220 15% 55%)", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11, fill: "hsl(220 15% 55%)", fontFamily: "DM Sans" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="confirmed"
            name="Confirmed Revenue"
            stroke="hsl(217 91% 55%)"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "hsl(217 91% 55%)", strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="pipeline"
            name="Pipeline Revenue"
            stroke="hsl(217 70% 72%)"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: "hsl(217 70% 72%)", strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
