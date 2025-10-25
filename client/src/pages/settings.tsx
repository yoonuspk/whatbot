import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your WhatsApp Business API integration
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp API Configuration</CardTitle>
          <CardDescription>
            Enter your WhatsApp Business API credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your API key"
              className="font-mono"
              data-testid="input-api-key"
            />
            <p className="text-xs text-muted-foreground">
              Your WhatsApp Business API access token
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone-id">Phone Number ID</Label>
            <Input
              id="phone-id"
              placeholder="Enter your phone number ID"
              className="font-mono"
              data-testid="input-phone-id"
            />
            <p className="text-xs text-muted-foreground">
              The ID associated with your WhatsApp Business phone number
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhook-token">Webhook Verification Token</Label>
            <Input
              id="webhook-token"
              type="password"
              placeholder="Enter verification token"
              className="font-mono"
              data-testid="input-webhook-token"
            />
            <p className="text-xs text-muted-foreground">
              Token used to verify webhook requests from WhatsApp
            </p>
          </div>
          <Button data-testid="button-save-api">Save API Configuration</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Your webhook URL for receiving WhatsApp messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={`${window.location.origin}/api/webhooks/whatsapp`}
              readOnly
              className="font-mono"
              data-testid="text-webhook-url"
            />
            <p className="text-xs text-muted-foreground">
              Configure this URL in your WhatsApp Business API dashboard
            </p>
          </div>
          <Button variant="outline" data-testid="button-copy-webhook">
            Copy Webhook URL
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="notify-messages">New Message Notifications</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when you receive a new message
              </p>
            </div>
            <Switch id="notify-messages" defaultChecked data-testid="switch-notify-messages" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="notify-delivery">Delivery Status Updates</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when message delivery status changes
              </p>
            </div>
            <Switch id="notify-delivery" defaultChecked data-testid="switch-notify-delivery" />
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="notify-flows">Flow Execution Alerts</Label>
              <p className="text-xs text-muted-foreground">
                Get notified when flows are executed or fail
              </p>
            </div>
            <Switch id="notify-flows" data-testid="switch-notify-flows" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-medium text-destructive">Clear All Messages</p>
              <p className="text-xs text-muted-foreground">
                Delete all message history from the database
              </p>
            </div>
            <Button variant="destructive" data-testid="button-clear-messages">
              Clear Messages
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="font-medium text-destructive">Reset Configuration</p>
              <p className="text-xs text-muted-foreground">
                Remove all API credentials and reset to defaults
              </p>
            </div>
            <Button variant="destructive" data-testid="button-reset-config">
              Reset All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
