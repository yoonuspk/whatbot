import { StatusBadge } from "../status-badge";

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-4 p-6">
      <StatusBadge status="pending" />
      <StatusBadge status="sent" />
      <StatusBadge status="delivered" />
      <StatusBadge status="read" />
      <StatusBadge status="failed" />
    </div>
  );
}
