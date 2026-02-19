import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Cold", deals: 8, color: "hsl(220 15% 75%)" },
  { name: "Warm", deals: 5, color: "hsl(38 92% 50%)" },
  { name: "Hot", deals: 3, color: "hsl(22 100% 55%)" },
  { name: "Closed", deals: 11, color: "hsl(142 71% 45%)" },
];

const total = data.reduce((s, d) => s + d.deals, 0);

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, deals } = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-xl px-3 py-2 shadow-lg text-[12px]">
        <span className="font-semibold text-foreground">{name}:</span>
        <span className="ml-1 text-muted-foreground">{deals} deals</span>
      </div>
    );
  }
  return null;
};

export function PipelineDonut() {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow">
      <div className="mb-4">
        <h2 className="text-[14px] font-semibold text-foreground">Sales Pipeline</h2>
        <p className="text-[12px] text-muted-foreground mt-0.5">{total} total deals</p>
      </div>

      <div className="relative flex justify-center items-center" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              dataKey="deals"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-2xl font-bold text-foreground">{total}</p>
          <p className="text-[11px] text-muted-foreground font-medium">Deals</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
            <span className="text-[12px] text-muted-foreground">{d.name}</span>
            <span className="ml-auto text-[12px] font-semibold text-foreground">{d.deals}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
