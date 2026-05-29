"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import IntakeModal from "@/components/patients/IntakeModal";
import { deleteClientAction } from "@/app/actions/clients";

// NEW: Import the strict Prisma type so we can pass data to the modal cleanly
import type { client_profileModel as client_profile } from "@/generated/prisma/models/client_profile";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [rowSelection, setRowSelection] = useState({});
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  // FIX: Replaced 'any' with 'TData'
  const [modalPatient, setModalPatient] = useState<TData | null>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      columnVisibility: {
        select: isDeleteMode,
      },
    },
    meta: {
      // Change (patient: any) to (patient: TData)
      onEdit: (patient: TData) => {
        setModalPatient(patient);
        setModalMode("edit");
        setIsModalOpen(true);
      },
      // Change (patient: any) to (patient: TData)
      onView: (patient: TData) => {
        setModalPatient(patient);
        setModalMode("view");
        setIsModalOpen(true);
      },
      onDelete: (id: string) => {
        setSingleDeleteId(id);
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedCount = selectedRows.length;

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      if (singleDeleteId) {
        await deleteClientAction(singleDeleteId);
      } else {
        for (const row of selectedRows) {
          const id = (row.original as { id: string }).id;
          await deleteClientAction(id);
        }
      }
      setRowSelection({});
      setShowConfirmModal(false);
      setSingleDeleteId(null);
      setIsDeleteMode(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete records.");
    } finally {
      setIsDeleting(false);
    }
  };

  const isConfirmOpen = showConfirmModal || singleDeleteId !== null;
  const deleteCountDisplay = singleDeleteId ? 1 : selectedCount;

  return (
    <div className="space-y-4">
      {/* FIX: We cast the TData safely back to a client_profile for the strict IntakeModal */}
      <IntakeModal
        patient={modalPatient as unknown as client_profile}
        mode={modalMode}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-full max-w-sm relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search clients by name, location..."
            className="pl-9 bg-white border-zinc-200 focus-visible:ring-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="bg-white border-zinc-200 text-zinc-700 shadow-sm transition-all hover:bg-zinc-100 hover:text-zinc-900 hover:border-zinc-300"
          >
            Match Clinician
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              setIsDeleteMode(!isDeleteMode);
              if (isDeleteMode) setRowSelection({});
            }}
            className={`transition-all shadow-sm ${
              isDeleteMode
                ? "bg-zinc-100 text-zinc-900 border-zinc-300 hover:bg-zinc-200 hover:border-zinc-400"
                : "bg-white text-red-600 border-red-200 hover:bg-red-100 hover:text-red-800 hover:border-red-300"
            }`}
          >
            {isDeleteMode ? "Cancel Selection" : "Select to Delete"}
          </Button>

          <Button
            onClick={() => {
              setModalMode("create");
              setModalPatient(null);
              setIsModalOpen(true);
            }}
            className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm"
          >
            <span className="text-lg leading-none mr-2">+</span> New Patient
            Intake
          </Button>
        </div>
      </div>

      {isDeleteMode && selectedCount > 0 && (
        <div className="flex items-center gap-3 bg-red-50/50 p-2 rounded-md border border-red-100 transition-all">
          <span className="text-sm text-zinc-600 font-medium px-2">
            {selectedCount} selected
          </span>
          <Button
            onClick={() => setShowConfirmModal(true)}
            disabled={isDeleting}
            variant="outline"
            className="h-8 bg-white text-red-600 border-red-200 transition-all hover:bg-red-100 hover:text-red-800 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      )}

      <div className="w-full rounded-md border border-zinc-200 overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-zinc-50/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-zinc-100 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-xs font-semibold text-zinc-500 uppercase tracking-wider h-10"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-zinc-100 hover:bg-zinc-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl border border-zinc-200">
            <h2 className="text-lg font-semibold text-zinc-900 mb-2">
              Delete Patient Records?
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Are you sure you want to permanently delete {deleteCountDisplay}{" "}
              selected profile(s)? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmModal(false);
                  setSingleDeleteId(null);
                }}
                disabled={isDeleting}
                className="transition-colors hover:bg-zinc-100"
              >
                Cancel
              </Button>
              <Button
                onClick={executeDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white transition-colors hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
