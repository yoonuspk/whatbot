import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Edit, Play, Pause } from "lucide-react";

interface FlowCardProps {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  nodeCount?: number;
  onEdit?: () => void;
  onToggle?: () => void;
}

export function FlowCard({
  id,
  name,
  description,
  isActive,
  nodeCount = 0,
  onEdit,
  onToggle,
}: FlowCardProps) {
  return (
    <Card data-testid={`card-flow-${id}`} className="hover-elevate">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1" data-testid={`text-flow-name-${id}`}>
              {name}
            </CardTitle>
            {description && (
              <CardDescription className="text-sm line-clamp-2">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
        <Badge
          variant={isActive ? "default" : "secondary"}
          className="flex-shrink-0"
          data-testid={`badge-status-${id}`}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {nodeCount} {nodeCount === 1 ? "node" : "nodes"}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          data-testid={`button-edit-flow-${id}`}
        >
          <Edit className="h-3 w-3 mr-2" />
          Edit
        </Button>
        <Button
          variant={isActive ? "secondary" : "default"}
          size="sm"
          onClick={onToggle}
          data-testid={`button-toggle-flow-${id}`}
        >
          {isActive ? (
            <>
              <Pause className="h-3 w-3 mr-2" />
              Deactivate
            </>
          ) : (
            <>
              <Play className="h-3 w-3 mr-2" />
              Activate
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
