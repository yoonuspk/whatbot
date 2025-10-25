import { useState } from "react";
import { FlowCard } from "@/components/flow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Flows() {
  const [flows, setFlows] = useState([
    {
      id: "1",
      name: "Welcome Flow",
      description: "Automated welcome message for new contacts",
      isActive: true,
      nodeCount: 5,
    },
    {
      id: "2",
      name: "Order Confirmation",
      description: "Send order confirmation and tracking details",
      isActive: true,
      nodeCount: 8,
    },
    {
      id: "3",
      name: "Customer Support",
      description: "Handle customer inquiries and support tickets",
      isActive: false,
      nodeCount: 12,
    },
    {
      id: "4",
      name: "Appointment Reminder",
      description: "Send automated reminders for upcoming appointments",
      isActive: true,
      nodeCount: 6,
    },
    {
      id: "5",
      name: "Feedback Collection",
      description: "Collect customer feedback after service completion",
      isActive: false,
      nodeCount: 4,
    },
  ]);

  const handleToggle = (id: string) => {
    setFlows(
      flows.map((flow) =>
        flow.id === id ? { ...flow, isActive: !flow.isActive } : flow
      )
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Flows</h1>
          <p className="text-muted-foreground">
            Create and manage conversation flows
          </p>
        </div>
        <Button data-testid="button-create-flow">
          <Plus className="h-4 w-4 mr-2" />
          Create Flow
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flows..."
          className="pl-9"
          data-testid="input-search-flows"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {flows.map((flow) => (
          <FlowCard
            key={flow.id}
            {...flow}
            onEdit={() => console.log("Edit flow:", flow.id)}
            onToggle={() => handleToggle(flow.id)}
          />
        ))}
      </div>
    </div>
  );
}
