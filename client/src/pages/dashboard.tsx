import { MetricCard } from "@/components/metric-card";
import { ConversationListItem } from "@/components/conversation-list-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, CheckCheck, TrendingUp, Plus } from "lucide-react";

export default function Dashboard() {
  const recentConversations = [
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your WhatsApp Business API activity
          </p>
        </div>
        <Button data-testid="button-new-message">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Messages"
          value="1,247"
          icon={MessageSquare}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Sent Today"
          value="89"
          icon={Send}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Delivered"
          value="1,195"
          icon={CheckCheck}
          trend={{ value: 15, isPositive: true }}
        />
        <MetricCard title="Active Flows" value="5" icon={TrendingUp} />
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
            {recentConversations.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                {...conversation}
                onClick={() => console.log("Navigate to conversation", conversation.id)}
              />
            ))}
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
            <Button variant="outline" className="w-full justify-start" data-testid="button-create-flow">
              <TrendingUp className="h-4 w-4 mr-2" />
              Create New Flow
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-add-template">
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
            <Button variant="outline" className="w-full justify-start" data-testid="button-send-broadcast">
              <Send className="h-4 w-4 mr-2" />
              Send Broadcast
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
