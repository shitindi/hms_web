import Dashboard from "./Dashboard";
import NavigationLeft from "./NavigationLeft";
import Toolbox from "./Toolbox";

export default function MainLayout() {


  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">

        <NavigationLeft />

        <div className="flex min-w-0 flex-1 flex-col">

          <Toolbox />

          <main className="flex-1 overflow-auto p-6 lg:p-8">
           
            <Dashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
