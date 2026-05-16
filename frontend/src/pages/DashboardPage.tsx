import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Library } from '../components/Library';
import { Player } from '../components/Player';
import { Settings, Menu } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [libraryOpen, setLibraryOpen] = useState(true);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-hidden flex bg-cyberpunk relative">
      {/* Mobile NavBar */}
      <nav className="md:hidden flex justify-between items-center px-5 py-2 w-full absolute top-0 z-50 bg-surface/10 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold border border-white/20">
             {user?.username?.[0]?.toUpperCase()}
          </div>
          <div className="font-display-lg text-lg tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(0,219,233,0.4)]">{user?.username}</div>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setSidebarOpen(true)}>
             <Menu className="w-6 h-6 text-primary" />
           </button>
        </div>
      </nav>

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className={`${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} flex-1 ml-0 relative h-screen flex flex-col md:flex-row transition-all duration-300`}>
        <Library libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
        <Player />
      </main>
    </div>
  );
}
