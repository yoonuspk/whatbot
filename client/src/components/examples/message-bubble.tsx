import { MessageBubble } from "../message-bubble";

export default function MessageBubbleExample() {
  return (
    <div className="max-w-2xl p-6 space-y-4">
      <MessageBubble
        content="Hello! How can I help you today?"
        direction="outbound"
        timestamp={new Date(Date.now() - 1000 * 60 * 10)}
        status="read"
        messageType="template"
      />
      <MessageBubble
        content="I'd like to know more about your services."
        direction="inbound"
        timestamp={new Date(Date.now() - 1000 * 60 * 8)}
      />
      <MessageBubble
        content="Of course! We offer WhatsApp Business API integration, flow builder, and template management."
        direction="outbound"
        timestamp={new Date(Date.now() - 1000 * 60 * 5)}
        status="delivered"
      />
      <MessageBubble
        content="That sounds great! Can you send me more details?"
        direction="inbound"
        timestamp={new Date(Date.now() - 1000 * 60 * 2)}
      />
    </div>
  );
}
