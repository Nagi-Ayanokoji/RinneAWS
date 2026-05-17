import { useState } from 'react';
import { UploadCloud, X, Music } from 'lucide-react';
import { api } from '../api/client';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}

export function UploadModal({ isOpen, onClose, onUploadComplete }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!isOpen) return null;

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);
    if (title) formData.append('title', title);
    if (artist) formData.append('artist', artist);
    if (album) formData.append('album', album);

    try {
      setLoading(true);
      await api.post('/songs/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percentCompleted);
        }
      });
      onUploadComplete();
      onClose();
      // Reset state
      setFile(null);
      setTitle('');
      setArtist('');
      setAlbum('');
      setProgress(0);
    } catch (err) {
      console.error('Upload error:', err);
      alert('Error al subir la canción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-headline-md text-2xl text-on-surface mb-6 flex items-center gap-2">
          <UploadCloud className="text-primary" />
          Import Music
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div 
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer relative"
          >
            <input 
              type="file" 
              accept="audio/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            {file ? (
              <div className="flex flex-col items-center gap-2 text-primary">
                <Music className="w-8 h-8" />
                <span className="font-label-sm text-sm truncate max-w-full px-4">{file.name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-on-surface-variant">
                <UploadCloud className="w-8 h-8" />
                <span className="font-label-sm text-sm">Drag and drop or click to browse</span>
                <span className="text-xs opacity-50">MP3, WAV, FLAC, OGG up to 50MB</span>
              </div>
            )}
          </div>

          <div>
            <label className="block font-label-sm text-xs text-on-surface-variant mb-1 ml-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface/40 border border-white/10 rounded-lg py-2 px-4 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-all"
              placeholder={file ? file.name.split('.')[0] : "Song title"}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-label-sm text-xs text-on-surface-variant mb-1 ml-1">Artist</label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full bg-surface/40 border border-white/10 rounded-lg py-2 px-4 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-all"
                placeholder="Artist name"
              />
            </div>
            <div>
              <label className="block font-label-sm text-xs text-on-surface-variant mb-1 ml-1">Album</label>
              <input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                className="w-full bg-surface/40 border border-white/10 rounded-lg py-2 px-4 text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-all"
                placeholder="Album name"
              />
            </div>
          </div>

          {loading && (
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!file || loading}
            className="w-full py-3 mt-4 rounded-full bg-primary text-on-primary font-bold shadow-[0_0_20px_rgba(0,219,233,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? `Uploading... ${progress}%` : 'Upload Song'}
          </button>
        </form>
      </div>
    </div>
  );
}
