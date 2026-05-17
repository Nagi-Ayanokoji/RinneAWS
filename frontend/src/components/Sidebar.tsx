import { Music, ListMusic, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Edit2 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { usePreferencesStore } from '../stores/preferencesStore';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const setIsOpen = usePreferencesStore((state) => state.setIsOpen);

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex fixed left-0 top-0 h-full flex-col z-40 bg-surface/20 backdrop-blur-[30px] text-primary font-body-md rounded-r-lg border-r border-white/20 shadow-[20px_0_40px_rgba(0,0,0,0.3)] transition-all duration-300`}>
      <div className={sidebarOpen ? 'p-6' : 'p-4 flex flex-col items-center'}>
        {sidebarOpen && (
          <div className="mb-6 px-1">
            <h2 className="font-display-lg text-[28px] font-bold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(0,219,233,0.5)] italic">
              Rin'ne
            </h2>
          </div>
        )}
        <div className={`${sidebarOpen ? '' : 'justify-center'} flex items-center gap-3 mb-8 w-full`}>
          <div className="w-12 h-12 rounded-full border border-white/20 shrink-0 bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h1 className="font-headline-md text-[16px] text-primary font-bold truncate">{user?.username}</h1>
                <button className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-full hover:bg-white/5" title="Edit Profile">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
        <nav className="flex flex-col gap-2 w-full">
          <a href="#" className={`${sidebarOpen ? 'gap-3' : 'justify-center border-l-0'} flex items-center p-3 rounded-lg bg-primary/10 text-primary border-l-4 border-primary shadow-[0_0_15px_rgba(0,219,233,0.2)] translate-x-1 duration-200`}>
            <Music className="w-6 h-6" />
            {sidebarOpen && <span>Music</span>}
          </a>
          <a href="#" className={`${sidebarOpen ? 'gap-3' : 'justify-center'} flex items-center p-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all`}>
            <ListMusic className="w-6 h-6" />
            {sidebarOpen && <span>Playlist</span>}
          </a>
          <button onClick={() => setIsOpen(true)} className={`${sidebarOpen ? 'gap-3' : 'justify-center'} flex items-center p-3 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all w-full`}>
            <Settings className="w-6 h-6" />
            {sidebarOpen && <span>Preferences</span>}
          </button>
        </nav>
      </div>
      <div className={`${sidebarOpen ? 'p-6' : 'p-4 items-center'} mt-auto flex flex-col gap-4`}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all bg-surface/30 border border-white/5">
          {sidebarOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>
        <div className="flex flex-col gap-2 w-full">
          <a href="#" className={`${sidebarOpen ? 'gap-3' : 'justify-center'} flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all`}>
            <HelpCircle className="w-5 h-5" />
            {sidebarOpen && <span className="font-label-sm text-label-sm">Support</span>}
          </a>
          <button onClick={logout} className={`${sidebarOpen ? 'gap-3' : 'justify-center'} flex items-center p-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-primary transition-all w-full`}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-label-sm text-label-sm">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
