import { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, Music as MusicIcon, Search, Trash2 } from 'lucide-react';
import { api } from '../api/client';
import { usePlayerStore, type Song } from '../stores/playerStore';
import { UploadModal } from './UploadModal';

interface LibraryProps {
  libraryOpen: boolean;
  setLibraryOpen: (open: boolean) => void;
}

export function Library({ libraryOpen, setLibraryOpen }: LibraryProps) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const { playSong, setQueue, currentIndex } = usePlayerStore();

  const fetchSongs = async () => {
    try {
      const res = await api.get(`/songs?search=${search}`);
      setSongs(res.data.songs);
      setQueue(res.data.songs);
    } catch (err) {
      console.error('Error fetching songs:', err);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [search]);

  const deleteSong = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm('¿Eliminar esta canción?')) return;
    try {
      await api.delete(`/songs/${id}`);
      fetchSongs();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <section className={`${libraryOpen ? 'w-full md:w-1/3 p-6' : 'hidden md:flex w-full md:w-20 p-4 items-center'} h-full flex flex-col gap-6 z-10 glass-panel border-r-0 md:border-r border-white/10 overflow-y-auto transition-all duration-300`}>
      <div className={`${libraryOpen ? 'justify-between' : 'justify-center'} flex items-center w-full`}>
        {libraryOpen && <h2 className="font-headline-md text-2xl text-on-surface">Library</h2>}
        <div className="flex items-center gap-2">
          {libraryOpen && (
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-colors neon-bloom"
            >
              <Plus className="w-[18px] h-[18px]" />
              <span className="font-label-sm text-label-sm">Importar música</span>
            </button>
          )}
          <button 
            onClick={() => setLibraryOpen(!libraryOpen)} 
            className="p-2 rounded-full border border-white/10 text-on-surface-variant hover:text-primary transition-colors hover:bg-white/5 shrink-0 flex items-center justify-center"
          >
            {libraryOpen ? <ChevronLeft className="w-[18px] h-[18px]" /> : <ChevronRight className="w-[18px] h-[18px]" />}
          </button>
        </div>
      </div>

      {libraryOpen && (
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input 
            type="text"
            placeholder="Buscar en tu biblioteca..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-on-surface focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>
      )}

      <div className={`${libraryOpen ? '' : 'items-center mt-4'} flex flex-col gap-3 w-full`}>
        {songs.map((song, index) => (
          <div 
            key={song.id}
            onClick={() => playSong(index)}
            className={`${libraryOpen ? 'gap-4 p-3' : 'justify-center p-2'} flex items-center rounded-lg ${currentIndex === index ? 'bg-primary/10 border-primary/30' : 'bg-surface/40 border-white/5'} border hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer group w-full`}
          >
            <div className="w-12 h-12 rounded-md shrink-0 bg-gradient-to-br from-secondary-container to-surface-container flex items-center justify-center overflow-hidden">
              {song.cover_path ? (
                <img src={`http://localhost:3001${song.cover_path}`} alt="" className="w-full h-full object-cover" />
              ) : (
                <MusicIcon className="w-6 h-6 text-primary" />
              )}
            </div>
            {libraryOpen && (
              <>
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-md text-[16px] text-on-surface truncate">{song.title}</h4>
                  <p className="font-label-sm text-[12px] text-on-surface-variant truncate">{song.artist}</p>
                </div>
                <button 
                  onClick={(e) => deleteSong(e, song.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-on-surface-variant hover:text-error transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onUploadComplete={fetchSongs} 
      />
    </section>
  );
}
