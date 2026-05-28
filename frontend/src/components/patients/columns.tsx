"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 1. Import the source of truth directly from Prisma
import type { client_profile } from "@/generated/prisma/client";

// 2. Styled badge for the Modality enum
const ModalityBadge = ({ modality }: { modality: string | null }) => {
  if (!modality) return null;

  const styles: Record<string, string> = {
    in_person: "bg-emerald-50 text-emerald-700 border-emerald-200",
    telehealth: "bg-blue-50 text-blue-700 border-blue-200",
    hybrid: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const labels: Record<string, string> = {
    in_person: "In-Person",
    telehealth: "Telehealth",
    hybrid: "Hybrid",
  };

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 font-medium shadow-sm ${styles[modality] || "bg-gray-50 text-gray-700"}`}
    >
      {labels[modality] || modality}
    </Badge>
  );
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// 3. Pass the Prisma type directly into the ColumnDef
export const columns: ColumnDef<client_profile>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray-300 text-black accent-zinc-900 cursor-pointer"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="w-4 h-4 rounded border-gray-300 text-black accent-zinc-900 cursor-pointer"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      <ModalityBadge modality={row.getValue("preferred_modality") as string} />
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
      // Prisma returns Date objects. Next.js Server Actions automatically pass Dates to Client Components.
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
