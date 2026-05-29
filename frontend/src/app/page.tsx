import { DataTable } from "@/components/patients/data-table";
import { getClientsAction } from "@/app/actions/clients";
import {
  columns,
  type ClientWithDisplayFields,
} from "@/components/patients/columns";

export default async function PatientsPage() {
  // R in CRUD: Fetching the data securely on the server
  // THE FIX: We cast to a shared UI-safe type to satisfy the DataTable generics
  const clients =
    (await getClientsAction()) as unknown as ClientWithDisplayFields[];

  return (
    <div className="flex flex-col h-full max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          Clients
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          {clients.length} total profiles · Synchronized with database
        </p>
      </div>

      {/* We handed all the toolbar controls over to DataTable, so we just render the table here! */}
      <div className="bg-white rounded-lg shadow-sm">
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  );
}
