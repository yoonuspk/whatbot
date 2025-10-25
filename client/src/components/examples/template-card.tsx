import { TemplateCard } from "../template-card";

export default function TemplateCardExample() {
  const templates = [
    {
      id: "1",
      name: "Welcome Message",
      content: "Hello {{name}}! Welcome to our service. We're here to help you 24/7.",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "2",
      name: "Order Confirmation",
      content: "Your order #{{order_id}} has been confirmed. Estimated delivery: {{delivery_date}}",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "3",
      name: "Promotion Alert",
      content: "Special offer! Get {{discount}}% off on all items. Use code: {{promo_code}}",
      category: "marketing",
      status: "pending" as const,
      language: "en",
    },
  ];

  return (
    <div className="grid gap-4 p-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          {...template}
          onEdit={() => console.log("Edit template:", template.id)}
          onCopy={() => console.log("Copy template:", template.id)}
        />
      ))}
    </div>
  );
}
