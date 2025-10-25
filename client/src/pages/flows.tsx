import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FlowCard } from "@/components/flow-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Flow } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Flows() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFlowName, setNewFlowName] = useState("");
  const [newFlowDescription, setNewFlowDescription] = useState("");
  const { toast } = useToast();

  const { data: flows = [], isLoading } = useQuery<Flow[]>({
    queryKey: ["/api/flows"],
  });

  const createFlowMutation = useMutation({
    mutationFn: async (data: { name: string; description?: string }) => {
      return await apiRequest("POST", "/api/flows", {
        ...data,
        isActive: 0,
        flowData: { nodes: [], edges: [] },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flows"] });
      setIsCreateDialogOpen(false);
      setNewFlowName("");
      setNewFlowDescription("");
      toast({
        title: "Flow created",
        description: "Your flow has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create flow. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleFlowMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: number }) => {
      return await apiRequest("PATCH", `/api/flows/${id}`, { isActive: isActive === 1 ? 0 : 1 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flows"] });
      toast({
        title: "Flow updated",
        description: "Flow status has been updated successfully.",
      });
    },
  });

  const handleCreateFlow = () => {
    if (newFlowName.trim()) {
      createFlowMutation.mutate({
        name: newFlowName,
        description: newFlowDescription || undefined,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <p className="text-muted-foreground">Loading flows...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Flows</h1>
          <p className="text-muted-foreground">
            Create and manage conversation flows
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          data-testid="button-create-flow"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Flow
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flows..."
          className="pl-9"
          data-testid="input-search-flows"
        />
      </div>

      {flows.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No flows yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first flow to automate WhatsApp conversations
          </p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Flow
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {flows.map((flow) => {
            const flowData = flow.flowData as { nodes?: any[]; edges?: any[] };
            const nodeCount = flowData?.nodes?.length || 0;

            return (
              <FlowCard
                key={flow.id}
                id={flow.id}
                name={flow.name}
                description={flow.description || undefined}
                isActive={flow.isActive === 1}
                nodeCount={nodeCount}
                onEdit={() => console.log("Edit flow:", flow.id)}
                onToggle={() =>
                  toggleFlowMutation.mutate({ id: flow.id, isActive: flow.isActive })
                }
              />
            );
          })}
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent data-testid="dialog-create-flow">
          <DialogHeader>
            <DialogTitle>Create New Flow</DialogTitle>
            <DialogDescription>
              Create a new conversation flow for WhatsApp automation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="flow-name">Flow Name</Label>
              <Input
                id="flow-name"
                placeholder="e.g., Welcome Flow"
                value={newFlowName}
                onChange={(e) => setNewFlowName(e.target.value)}
                data-testid="input-flow-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flow-description">Description (optional)</Label>
              <Textarea
                id="flow-description"
                placeholder="Describe what this flow does..."
                value={newFlowDescription}
                onChange={(e) => setNewFlowDescription(e.target.value)}
                data-testid="input-flow-description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateFlow}
              disabled={!newFlowName.trim() || createFlowMutation.isPending}
              data-testid="button-submit-flow"
            >
              Create Flow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
