"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 1. Exact match to the backend Prisma schema
export type ModalityType = "in_person" | "telehealth" | "hybrid";

export type ClientProfile = {
  id: string;
  communication_level: number;
  social_interaction_level: number;
  sensory_level: number;
  available_time_slots: string[]; // Serialized dates
  location: string;
  preferred_language: string;
  preferred_modality: ModalityType;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
};

// 2. Styled badge for the Modality enum
const ModalityBadge = ({ modality }: { modality: ModalityType }) => {
  const styles = {
    in_person: "bg-emerald-50 text-emerald-700 border-emerald-200",
    telehealth: "bg-blue-50 text-blue-700 border-blue-200",
    hybrid: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const labels = {
    in_person: "In-Person",
    telehealth: "Telehealth",
    hybrid: "Hybrid",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 font-medium shadow-sm ${styles[modality]}`}
    >
      {labels[modality]}
    </Badge>
  );
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// 3. Define the new columns based on the backend data
export const columns: ColumnDef<ClientProfile>[] = [
  {
    accessorKey: "name",
    header: "CLIENT",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-xs font-medium text-white">
            {getInitials(client.first_name, client.last_name)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-zinc-900">
              {client.first_name} {client.last_name}
            </span>
            <span className="text-xs text-zinc-500">
              {client.location || "No location"} · {client.preferred_language}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "preferred_modality",
    header: "MODALITY",
    cell: ({ row }) => (
      <ModalityBadge modality={row.getValue("preferred_modality")} />
    ),
  },
  {
    id: "profile_levels",
    header: "PROFILE METRICS",
    cell: ({ row }) => {
      const client = row.original;
      return (
        <div className="flex gap-2 text-xs text-zinc-600 font-medium">
          <span title="Communication Level">
            Comm: {client.communication_level}
          </span>{" "}
          |
          <span title="Social Interaction Level">
            Soc: {client.social_interaction_level}
          </span>{" "}
          |<span title="Sensory Level">Sens: {client.sensory_level}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: "LAST UPDATED",
    cell: ({ row }) => {
      // Format the ISO string back into a readable date
      const date = new Date(row.getValue("updated_at"));
      return (
        <span className="text-sm text-zinc-600">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "SYSTEM ID",
    cell: ({ row }) => {
      const fullId = row.getValue("id") as string;
      // UUIDs are long, so we just show the first 8 characters
      return (
        <span className="text-xs text-zinc-400 font-mono" title={fullId}>
          {fullId.substring(0, 8)}...
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <Button
        variant="ghost"
        className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-900"
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
