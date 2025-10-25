import { TemplateCard } from "@/components/template-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Templates() {
  const templates = [
    {
      id: "1",
      name: "Welcome Message",
      content:
        "Hello {{name}}! Welcome to our service. We're here to help you 24/7.",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "2",
      name: "Order Confirmation",
      content:
        "Your order #{{order_id}} has been confirmed. Estimated delivery: {{delivery_date}}",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "3",
      name: "Promotion Alert",
      content:
        "Special offer! Get {{discount}}% off on all items. Use code: {{promo_code}}",
      category: "marketing",
      status: "pending" as const,
      language: "en",
    },
    {
      id: "4",
      name: "Appointment Reminder",
      content:
        "Hi {{name}}, this is a reminder for your appointment on {{date}} at {{time}}.",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "5",
      name: "Payment Confirmation",
      content:
        "Payment of {{amount}} received successfully. Transaction ID: {{transaction_id}}",
      category: "utility",
      status: "approved" as const,
      language: "en",
    },
    {
      id: "6",
      name: "Verification Code",
      content:
        "Your verification code is {{code}}. This code expires in 10 minutes.",
      category: "authentication",
      status: "approved" as const,
      language: "en",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Templates</h1>
          <p className="text-muted-foreground">
            Manage your WhatsApp message templates
          </p>
        </div>
        <Button data-testid="button-create-template">
          <Plus className="h-4 w-4 mr-2" />
          Create Template
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-9"
            data-testid="input-search-templates"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40" data-testid="select-category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="utility">Utility</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="authentication">Authentication</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-32" data-testid="select-status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            {...template}
            onEdit={() => console.log("Edit template:", template.id)}
            onCopy={() => console.log("Copy template:", template.id)}
          />
        ))}
      </div>
    </div>
  );
}
