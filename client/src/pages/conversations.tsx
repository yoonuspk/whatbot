import { useState } from "react";
import { ConversationListItem } from "@/components/conversation-list-item";
import { MessageBubble } from "@/components/message-bubble";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Phone, MoreVertical } from "lucide-react";

export default function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [messageText, setMessageText] = useState("");

  const conversations = [
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "+1234567890",
      lastMessage: "Thanks for the information!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      status: "delivered" as const,
    },
    {
      id: "2",
      name: "Jane Smith",
      phoneNumber: "+1987654321",
      lastMessage: "I'll get back to you soon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "read" as const,
    },
    {
      id: "3",
      name: "Alex Johnson",
      phoneNumber: "+1122334455",
      lastMessage: "Order confirmed!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      status: "sent" as const,
    },
  ];

  const messages = [
    {
      id: "1",
      content: "Hello! How can I help you today?",
      direction: "outbound" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "read" as const,
      messageType: "template" as const,
    },
    {
      id: "2",
      content: "I'd like to know more about your services.",
      direction: "inbound" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
    },
    {
      id: "3",
      content: "Of course! We offer WhatsApp Business API integration, flow builder, and template management.",
      direction: "outbound" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      status: "delivered" as const,
    },
    {
      id: "4",
      content: "That sounds great! Can you send me more details?",
      direction: "inbound" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "5",
      content: "Thanks for the information!",
      direction: "inbound" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ];

  const selectedContact = conversations.find((c) => c.id === selectedConversation);

  const handleSend = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-80 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
              data-testid="input-search-conversations"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              {...conversation}
              onClick={() => setSelectedConversation(conversation.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact && (
          <>
            <div className="h-16 border-b border-border px-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedContact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact.phoneNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" data-testid="button-call">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" data-testid="button-more">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-muted/20">
              {messages.map((message) => (
                <MessageBubble key={message.id} {...message} />
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  data-testid="input-message"
                />
                <Button onClick={handleSend} data-testid="button-send">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-80 border-l border-border p-6">
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Contact Info</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedContact && (
              <>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Name
                  </p>
                  <p className="font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Phone Number
                  </p>
                  <p className="font-mono text-sm">{selectedContact.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Last Message
                  </p>
                  <p className="text-sm">{selectedContact.lastMessage}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
