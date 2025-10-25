import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ConversationListItemProps {
  id: string;
  name: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount?: number;
  status?: "sent" | "delivered" | "read" | "failed";
  onClick?: () => void;
}

export function ConversationListItem({
  id,
  name,
  phoneNumber,
  lastMessage,
  timestamp,
  unreadCount = 0,
  status,
  onClick,
}: ConversationListItemProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusColors = {
    sent: "bg-blue-500",
    delivered: "bg-green-500",
    read: "bg-green-600",
    failed: "bg-red-500",
  };

  return (
    <div
      className="flex items-start gap-4 p-4 hover-elevate active-elevate-2 cursor-pointer rounded-md border border-transparent"
      onClick={onClick}
      data-testid={`conversation-item-${id}`}
    >
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(name || phoneNumber)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm truncate" data-testid={`text-contact-name-${id}`}>
            {name || phoneNumber}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground truncate">
            {lastMessage}
          </p>
          {unreadCount > 0 && (
            <Badge variant="default" className="rounded-full h-5 min-w-5 px-1.5 text-xs" data-testid={`badge-unread-${id}`}>
              {unreadCount}
            </Badge>
          )}
          {status && (
            <div
              className={`h-2 w-2 rounded-full ${statusColors[status]}`}
              title={status}
            />
          )}
        </div>
      </div>
    </div>
  );
}
