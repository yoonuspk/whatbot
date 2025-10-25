import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MetricCard } from "@/components/metric-card";
import { ConversationListItem } from "@/components/conversation-list-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, CheckCheck, TrendingUp, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Contact, Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface Stats {
  totalMessages: number;
  sentToday: number;
  delivered: number;
  activeFlows: number;
}

export default function Dashboard() {
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [newMessage, setNewMessage] = useState({
    phoneNumber: "",
    message: "",
  });
  const { toast } = useToast();

  const { data: stats } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: contacts = [] } = useQuery<Contact[]>({
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
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
      setIsMessageDialogOpen(false);
      setNewMessage({ phoneNumber: "", message: "" });
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

  const handleSendMessage = () => {
    if (newMessage.phoneNumber.trim() && newMessage.message.trim()) {
      sendMessageMutation.mutate(newMessage);
    }
  };

  const recentConversations = contacts
    .map((contact) => {
      const contactMessages = allMessages
        .filter((m) => m.contactId === contact.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const lastMessage = contactMessages[0];
      const unreadCount = contactMessages.filter(
        (m) => m.direction === "inbound" && m.status !== "read"
      ).length;

      return {
        id: contact.id,
        name: contact.name || contact.phoneNumber,
        phoneNumber: contact.phoneNumber,
        lastMessage: lastMessage?.content || "No messages yet",
        timestamp: lastMessage ? new Date(lastMessage.timestamp) : new Date(contact.createdAt),
        unreadCount,
        status: lastMessage?.status as "sent" | "delivered" | "read" | "failed" | undefined,
      };
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your WhatsApp Business API activity
          </p>
        </div>
        <Button
          onClick={() => setIsMessageDialogOpen(true)}
          data-testid="button-new-message"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Messages"
          value={stats?.totalMessages || 0}
          icon={MessageSquare}
        />
        <MetricCard
          title="Sent Today"
          value={stats?.sentToday || 0}
          icon={Send}
        />
        <MetricCard
          title="Delivered"
          value={stats?.delivered || 0}
          icon={CheckCheck}
        />
        <MetricCard
          title="Active Flows"
          value={stats?.activeFlows || 0}
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
            <div>
              <CardTitle>Recent Conversations</CardTitle>
              <CardDescription className="mt-1">
                Latest messages from your contacts
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" data-testid="button-view-all">
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentConversations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No conversations yet</p>
              </div>
            ) : (
              recentConversations.map((conversation) => (
                <ConversationListItem
                  key={conversation.id}
                  {...conversation}
                  onClick={() => console.log("Navigate to conversation", conversation.id)}
                />
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription className="mt-1">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              data-testid="button-create-flow"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Create New Flow
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              data-testid="button-add-template"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsMessageDialogOpen(true)}
              data-testid="button-send-broadcast"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent data-testid="dialog-new-message">
          <DialogHeader>
            <DialogTitle>Send New Message</DialogTitle>
            <DialogDescription>
              Send a WhatsApp message to a contact
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                placeholder="+1234567890"
                value={newMessage.phoneNumber}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, phoneNumber: e.target.value })
                }
                data-testid="input-phone-number"
              />
              <p className="text-xs text-muted-foreground">
                Include country code (e.g., +1 for US)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={newMessage.message}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, message: e.target.value })
                }
                className="min-h-32"
                data-testid="input-message-content"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={
                !newMessage.phoneNumber.trim() ||
                !newMessage.message.trim() ||
                sendMessageMutation.isPending
              }
              data-testid="button-send-message"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
