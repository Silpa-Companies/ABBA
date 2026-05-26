import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { DataTable } from "@/components/patients/data-table";
import { getClientsAction } from "@/app/actions/clients";
import { columns } from "@/components/patients/columns";

type ClientProfile = Awaited<ReturnType<typeof getClientsAction>>[0];

export default async function PatientsPage() {
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

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 w-full max-w-sm relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search clients by name, location..."
            className="pl-9 bg-white border-zinc-200"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50 shadow-sm"
          >
            Match Clinician
          </Button>
          <Button
            variant="outline"
            className="bg-white text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 shadow-sm"
          >
            Delete
          </Button>
          <Button className="bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Client Intake
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white shadow-sm overflow-hidden">
        <DataTable columns={columns} data={clients} />
      </div>
    </div>
  );
}
