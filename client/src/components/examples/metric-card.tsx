import { MetricCard } from "../metric-card";
import { MessageSquare, Send, CheckCheck, TrendingUp } from "lucide-react";

export default function MetricCardExample() {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-6">
      <MetricCard
        title="Total Messages"
        value="1,247"
        icon={MessageSquare}
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        title="Sent Today"
        value="89"
        icon={Send}
        trend={{ value: 8, isPositive: true }}
      />
      <MetricCard
        title="Delivered"
        value="1,195"
        icon={CheckCheck}
        trend={{ value: 15, isPositive: true }}
      />
      <MetricCard
        title="Active Flows"
        value="5"
        icon={TrendingUp}
      />
    </div>
  );
}
