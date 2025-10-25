import { Badge } from "@/components/ui/badge";
import { Check, Clock, AlertCircle, CheckCheck } from "lucide-react";

interface StatusBadgeProps {
  status: "sent" | "delivered" | "read" | "failed" | "pending";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    sent: {
      icon: Check,
      variant: "secondary" as const,
      label: "Sent",
    },
    delivered: {
      icon: CheckCheck,
      variant: "default" as const,
      label: "Delivered",
    },
    read: {
      icon: CheckCheck,
      variant: "default" as const,
      label: "Read",
    },
    failed: {
      icon: AlertCircle,
      variant: "destructive" as const,
      label: "Failed",
    },
    pending: {
      icon: Clock,
      variant: "secondary" as const,
      label: "Pending",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="gap-1" data-testid={`badge-status-${status}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
