import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { KPICards } from "@/components/dashboard/KPICards";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { PipelineDonut } from "@/components/dashboard/PipelineDonut";
import { ActiveProjects } from "@/components/dashboard/ActiveProjects";
import { EventsFeed } from "@/components/dashboard/EventsFeed";
import { AIAssistant } from "@/components/dashboard/AIAssistant";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <TopBar />

        <main className="flex-1 px-6 pb-8 space-y-5">
          {/* Row 1: KPI Cards */}
          <KPICards />

          {/* Row 2: Revenue Chart + Pipeline Donut */}
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3">
              <RevenueChart />
            </div>
            <div className="col-span-2">
              <PipelineDonut />
            </div>
          </div>

          {/* Row 3: Active Projects + Events Feed */}
          <div className="grid grid-cols-2 gap-4">
            <ActiveProjects />
            <EventsFeed />
          </div>
        </main>
      </div>

      <AIAssistant />
    </div>
  );
};

export default Index;
