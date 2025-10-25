import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Edit } from "lucide-react";

interface TemplateCardProps {
  id: string;
  name: string;
  content: string;
  category: string;
  status: "approved" | "pending" | "rejected";
  language?: string;
  onEdit?: () => void;
  onCopy?: () => void;
}

export function TemplateCard({
  id,
  name,
  content,
  category,
  status,
  language = "en",
  onEdit,
  onCopy,
}: TemplateCardProps) {
  const statusColors = {
    approved: "default",
    pending: "secondary",
    rejected: "destructive",
  } as const;

  return (
    <Card data-testid={`card-template-${id}`} className="hover-elevate">
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-1" data-testid={`text-template-name-${id}`}>
              {name}
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-wider">
              {category}
            </CardDescription>
          </div>
        </div>
        <Badge
          variant={statusColors[status]}
          className="flex-shrink-0"
          data-testid={`badge-status-${id}`}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
          {content}
        </p>
        <p className="text-xs text-muted-foreground mt-2 uppercase">
          Language: {language}
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          data-testid={`button-edit-template-${id}`}
        >
          <Edit className="h-3 w-3 mr-2" />
          Edit
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onCopy}
          data-testid={`button-copy-template-${id}`}
        >
          <Copy className="h-3 w-3 mr-2" />
          Copy
        </Button>
      </CardFooter>
    </Card>
  );
}
