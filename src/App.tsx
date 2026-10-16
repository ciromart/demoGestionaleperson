import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Dashboard } from "./pages/Dashboard";
import { Clienti } from "./pages/Clienti";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "Panoramica attività di oggi" },
  "/clienti": { title: "Clienti", subtitle: "Anagrafica e attività dei clienti" },
};

function usePageMeta(pathname: string) {
  return PAGE_META[pathname] ?? PAGE_META["/"];
}

function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const meta = usePageMeta(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="hidden lg:flex" />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileNavOpen(false)}
            aria-hidden="true"
          />
          <div className="relative flex h-full">
            <Sidebar className="flex" />
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Chiudi menu"
              className="absolute top-4 -right-11 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-surface text-slate-600 shadow-card"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clienti" element={<Clienti />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return <AppShell />;
}
