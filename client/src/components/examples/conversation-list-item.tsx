import { ConversationListItem } from "../conversation-list-item";

export default function ConversationListItemExample() {
  return (
    <div className="max-w-md p-4 space-y-2">
      <ConversationListItem
        id="1"
        name="John Doe"
        phoneNumber="+1234567890"
        lastMessage="Thanks for the information!"
        timestamp={new Date(Date.now() - 1000 * 60 * 5)}
        unreadCount={2}
        status="delivered"
        onClick={() => console.log("Conversation clicked")}
      />
      <ConversationListItem
        id="2"
        name="Jane Smith"
        phoneNumber="+1987654321"
        lastMessage="I'll get back to you soon."
        timestamp={new Date(Date.now() - 1000 * 60 * 30)}
        status="read"
        onClick={() => console.log("Conversation clicked")}
      />
      <ConversationListItem
        id="3"
        name="Alex Johnson"
        phoneNumber="+1122334455"
        lastMessage="Order confirmed and on the way!"
        timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)}
        unreadCount={5}
        status="sent"
        onClick={() => console.log("Conversation clicked")}
      />
    </div>
  );
}
