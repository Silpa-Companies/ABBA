"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Eye, Trash } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { client_profile } from "@/generated/prisma";

export type ClientWithDisplayFields = client_profile & {
  clinician_name?: string | null;
};

const StatusBadge = ({ status }: { status: string | null | undefined }) => {
  const safeStatus = status || "UNDER_REVIEW";

  const config: Record<string, string> = {
    MATCHED: "bg-zinc-950 text-white border-zinc-950",
    UNDER_REVIEW: "bg-amber-50 text-amber-700 border-amber-200",
    DRAFT: "bg-zinc-50 text-zinc-600 border-zinc-200",
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Matched: "bg-zinc-950 text-white border-zinc-950",
    "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
    Draft: "bg-zinc-50 text-zinc-600 border-zinc-200",
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  const dotConfig: Record<string, string> = {
    MATCHED: "bg-white",
    UNDER_REVIEW: "bg-amber-500",
    DRAFT: "bg-zinc-400",
    ACTIVE: "bg-emerald-500",
    Matched: "bg-white",
    "Under Review": "bg-amber-500",
    Draft: "bg-zinc-400",
    Active: "bg-emerald-500",
  };

  const badgeStyle = config[safeStatus] || config["DRAFT"];
  const dotStyle = dotConfig[safeStatus] || dotConfig["DRAFT"];

  const displayStatus = safeStatus
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-0.5 font-medium shadow-sm gap-1.5 ${badgeStyle}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyle}`} />
      {displayStatus}
    </Badge>
  );
};

const getInitials = (firstName: string | null, lastName: string | null) => {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
};

export const columns: ColumnDef<ClientWithDisplayFields>[] = [
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
    id: "name",
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "CLIENT",
    cell: ({ row }) => {
      const client = row.original;
      const rawDob = client.dob;
      const rawGender = client.gender_identity;

      const dobStr = rawDob ? format(new Date(rawDob), "dd MMM yyyy") : "—";
      const genderStr = rawGender ? rawGender.charAt(0).toUpperCase() : "U";

      return (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-700 text-xs font-medium text-white">
            {getInitials(client.first_name, client.last_name)}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-zinc-900 text-sm">
              {client.first_name} {client.last_name}
            </span>
            <span className="text-xs text-zinc-400 mt-0.5">
              DOB: {dobStr} · {genderStr}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "updated_at",
    header: "LAST UPDATED",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-700">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
          <span className="text-xs text-zinc-400 mt-0.5">
            {format(date, "MMM d, yyyy")}
          </span>
        </div>
      );
    },
  },
  {
    id: "clinician",
    header: "ASSIGNED CLINICIAN",
    cell: ({ row }) => {
      const clinicianName = row.original.clinician_name || "Unassigned";

      if (clinicianName === "Unassigned") {
        return <span className="text-sm text-zinc-400 italic">Unassigned</span>;
      }

      const initials = clinicianName
        .replace("Dr. ", "")
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase();

      return (
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-600 border border-zinc-200">
            {initials.substring(0, 2)}
          </div>
          <span className="text-sm text-zinc-700">{clinicianName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "SYSTEM ID",
    cell: ({ row }) => {
      const fullId = row.getValue("id") as string;
      const displayId = `CM-${fullId.replace(/\D/g, "").padEnd(6, "0").substring(0, 6)}`;

      return (
        <span className="text-xs text-zinc-400" title={fullId}>
          {displayId}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const patient = row.original;
      const meta = table.options.meta as
        | {
            onEdit: (patient: ClientWithDisplayFields) => void;
            onView: (patient: ClientWithDisplayFields) => void;
            onDelete: (id: string) => void;
          }
        | undefined;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-900"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => meta?.onEdit(patient)}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4 text-zinc-500" />
              Edit Information
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => meta?.onView(patient)}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4 text-zinc-500" />
              View Information
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => meta?.onDelete(patient.id)}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
