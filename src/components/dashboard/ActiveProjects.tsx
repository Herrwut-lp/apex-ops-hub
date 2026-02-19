import { ArrowRight } from "lucide-react";

type Stage =
  | "Post Production"
  | "Shoot Day"
  | "Review"
  | "Pre Production"
  | "Editing";

const stageMeta: Record<Stage, { bg: string; text: string }> = {
  "Post Production": { bg: "bg-primary/10", text: "text-primary" },
  "Shoot Day": { bg: "bg-warning/15", text: "text-warning" },
  "Review": { bg: "bg-purple-100", text: "text-purple-600" },
  "Pre Production": { bg: "bg-muted", text: "text-muted-foreground" },
  "Editing": { bg: "bg-teal-100", text: "text-teal-600" },
};

const projects = [
  { name: "Brand Launch Video", client: "Apex Retail", stage: "Post Production" as Stage, due: "Mar 15", progress: 65 },
  { name: "Q1 Campaign Shoot", client: "Nova Brands", stage: "Shoot Day" as Stage, due: "Feb 28", progress: 40 },
  { name: "CEO Portrait Series", client: "Meridian Corp", stage: "Review" as Stage, due: "Mar 3", progress: 80 },
  { name: "Product Showcase", client: "TechFlow", stage: "Pre Production" as Stage, due: "Mar 20", progress: 15 },
  { name: "Annual Report Photos", client: "BlueSky Ltd", stage: "Editing" as Stage, due: "Feb 25", progress: 90 },
];

export function ActiveProjects() {
  return (
    <div className="bg-card rounded-2xl p-5 card-shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[14px] font-semibold text-foreground">Active Projects</h2>
        <button className="flex items-center gap-1 text-[12px] text-primary font-medium hover:opacity-70 transition-opacity">
          View All <ArrowRight size={12} />
        </button>
      </div>

      <div className="space-y-3">
        {projects.map((p) => {
          const { bg, text } = stageMeta[p.stage];
          return (
            <div
              key={p.name}
              className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/50 transition-colors duration-150 cursor-default"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[13px] font-semibold text-foreground truncate">{p.name}</p>
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{p.client}</p>
              </div>

              <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${bg} ${text}`}>
                {p.stage}
              </span>

              <span className="shrink-0 text-[11px] text-muted-foreground w-12 text-right">{p.due}</span>

              <div className="shrink-0 w-16">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-right mt-0.5">{p.progress}%</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
