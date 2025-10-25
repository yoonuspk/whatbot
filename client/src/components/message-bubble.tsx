import { format } from "date-fns";
import { Check, CheckCheck, Clock, AlertCircle } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  direction: "inbound" | "outbound";
  timestamp: Date;
  status?: "sent" | "delivered" | "read" | "failed";
  messageType?: "text" | "template";
}

export function MessageBubble({
  content,
  direction,
  timestamp,
  status,
  messageType = "text",
}: MessageBubbleProps) {
  const isOutbound = direction === "outbound";

  const getStatusIcon = () => {
    if (!isOutbound || !status) return null;

    switch (status) {
      case "sent":
        return <Check className="h-3 w-3" />;
      case "delivered":
        return <CheckCheck className="h-3 w-3" />;
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      case "failed":
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div
      className={`flex ${isOutbound ? "justify-end" : "justify-start"} mb-4`}
      data-testid={`message-${direction}`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOutbound
            ? "bg-primary text-primary-foreground"
            : "bg-card border border-card-border"
        }`}
      >
        {messageType === "template" && (
          <div className="text-xs opacity-70 mb-1">Template Message</div>
        )}
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        <div
          className={`flex items-center gap-1 mt-1 text-xs ${
            isOutbound ? "justify-end opacity-80" : "text-muted-foreground"
          }`}
        >
          <span>{format(timestamp, "HH:mm")}</span>
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}
