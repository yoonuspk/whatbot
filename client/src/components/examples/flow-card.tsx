import { FlowCard } from "../flow-card";
import { useState } from "react";

export default function FlowCardExample() {
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
  ]);

  const handleToggle = (id: string) => {
    setFlows(flows.map(flow => 
      flow.id === id ? { ...flow, isActive: !flow.isActive } : flow
    ));
  };

  return (
    <div className="grid gap-4 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {flows.map((flow) => (
        <FlowCard
          key={flow.id}
          {...flow}
          onEdit={() => console.log("Edit flow:", flow.id)}
          onToggle={() => handleToggle(flow.id)}
        />
      ))}
    </div>
  );
}
