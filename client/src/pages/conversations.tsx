import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ConversationListItem } from "@/components/conversation-list-item";
import { MessageBubble } from "@/components/message-bubble";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, Phone, MoreVertical, MessageSquare } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Contact, Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Conversations() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const { toast } = useToast();

  const { data: contacts = [], isLoading: loadingContacts } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const { data: allMessages = [] } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: { phoneNumber: string; message: string }) => {
      return await apiRequest("POST", "/api/whatsapp/send", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const conversationsWithLastMessage = contacts.map((contact) => {
    const contactMessages = allMessages
      .filter((m) => m.contactId === contact.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const lastMessage = contactMessages[0];
    const unreadCount = contactMessages.filter(
      (m) => m.direction === "inbound" && m.status !== "read"
    ).length;

    return {
      ...contact,
      lastMessage: lastMessage?.content || "No messages yet",
      timestamp: lastMessage ? new Date(lastMessage.timestamp) : new Date(contact.createdAt),
      unreadCount,
      status: lastMessage?.status as "sent" | "delivered" | "read" | "failed" | undefined,
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const selectedContact = conversationsWithLastMessage.find(
    (c) => c.id === selectedConversationId
  );

  const selectedMessages = selectedContact
    ? allMessages
        .filter((m) => m.contactId === selectedContact.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  const handleSend = () => {
    if (messageText.trim() && selectedContact) {
      sendMessageMutation.mutate({
        phoneNumber: selectedContact.phoneNumber,
        message: messageText,
      });
      setMessageText("");
    }
  };

  if (loadingContacts) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading conversations...</p>
      </div>
    );
  }

  if (conversationsWithLastMessage.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No conversations yet</h2>
          <p className="text-muted-foreground">
            Start a conversation by sending a message from the dashboard
          </p>
        </div>
      </div>
    );
  }

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
          {conversationsWithLastMessage.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              id={conversation.id}
              name={conversation.name || conversation.phoneNumber}
              phoneNumber={conversation.phoneNumber}
              lastMessage={conversation.lastMessage}
              timestamp={conversation.timestamp}
              unreadCount={conversation.unreadCount}
              status={conversation.status}
              onClick={() => setSelectedConversationId(conversation.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            <div className="h-16 border-b border-border px-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {(selectedContact.name || selectedContact.phoneNumber)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">
                    {selectedContact.name || selectedContact.phoneNumber}
                  </h2>
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
              {selectedMessages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                selectedMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    content={message.content}
                    direction={message.direction as "inbound" | "outbound"}
                    timestamp={new Date(message.timestamp)}
                    status={message.status as "sent" | "delivered" | "read" | "failed" | undefined}
                    messageType={message.messageType as "text" | "template" | undefined}
                  />
                ))
              )}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  data-testid="input-message"
                  disabled={sendMessageMutation.isPending}
                />
                <Button
                  onClick={handleSend}
                  data-testid="button-send"
                  disabled={sendMessageMutation.isPending || !messageText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground">
                Choose a conversation from the list to view messages
              </p>
            </div>
          </div>
        )}
      </div>

      {selectedContact && (
        <div className="w-80 border-l border-border p-6">
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Contact Info</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Name
                </p>
                <p className="font-medium">
                  {selectedContact.name || "Unknown"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Phone Number
                </p>
                <p className="font-mono text-sm">{selectedContact.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Messages
                </p>
                <p className="text-sm">{selectedMessages.length} total</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
