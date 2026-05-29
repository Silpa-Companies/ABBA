import { DataTable } from "@/components/patients/data-table";
import { getClientsAction } from "@/app/actions/clients";
import { columns } from "@/components/patients/columns";

export default async function PatientsPage() {
  // R in CRUD: Fetching the data securely on the server
  const clients = await getClientsAction();

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
        <DataTable columns={columns as any} data={clients} />
      </div>
    </div>
  );
}
