import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { SkipBack, SkipForward, Play, Pause, Settings as SettingsIcon, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../stores/playerStore';
import { useAuthStore } from '../stores/authStore';

export function Player() {
  const { 
    isPlaying, 
    volume, 
    progress, 
    duration,
    currentSong,
    setIsPlaying, 
    setProgress, 
    setDuration,
    next,
    prev,
    setVolume
  } = usePlayerStore();
  
  const token = useAuthStore((state) => state.token);
  const soundRef = useRef<Howl | null>(null);
  const song = currentSong();

  useEffect(() => {
    if (!song || !token) return;

    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [`http://localhost:3001/api/songs/${song.id}/stream`],
      xhr: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      html5: true,
      volume: volume,
      onplay: () => {
        setDuration(sound.duration());
      },
      onend: () => {
        next();
      }
    });

    soundRef.current = sound;
    if (isPlaying) sound.play();

    return () => {
      sound.unload();
    };
  }, [song?.id, token]);

  useEffect(() => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!soundRef.current) return;
    soundRef.current.volume(volume);
  }, [volume]);

  useEffect(() => {
    let interval: number;
    if (isPlaying && soundRef.current) {
      interval = window.setInterval(() => {
        const currentProgress = soundRef.current?.seek() as number || 0;
        setProgress(currentProgress);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!soundRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newPos = percentage * duration;
    soundRef.current.seek(newPos);
    setProgress(newPos);
  };

  return (
    <section className="flex-1 relative h-full flex flex-col justify-end p-12 z-0">
      {/* Top Right Settings */}
      <div className="absolute top-12 right-12 z-20">
        <button className="p-3 rounded-full bg-surface/40 backdrop-blur-md border border-white/10 text-on-surface hover:text-primary transition-colors neon-bloom">
          <SettingsIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Vinyl Visualizer (Abstracted as a glowing circle) */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] rounded-full border border-primary/20 bg-surface-lowest/50 backdrop-blur-sm flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-secondary/20 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_50px_rgba(0,219,233,0.3)] animate-pulse" />
        </div>
      </div>

      {/* Player Controls */}
      <div className="glass-panel rounded-xl p-8 max-w-2xl mx-auto w-full z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="font-display-lg text-4xl text-on-surface">{song?.title || 'No song selected'}</h2>
            <p className="font-body-lg text-lg text-primary mt-2">{song?.artist || '-'}</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 group relative">
                <Volume2 className="w-5 h-5 text-on-surface-variant group-hover:text-primary" />
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                />
             </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-label-sm text-xs text-on-surface-variant min-w-[32px]">{formatTime(progress)}</span>
          <div 
            className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full shadow-[0_0_10px_rgba(0,219,233,0.5)]"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer hover:scale-125 transition-transform"
              style={{ left: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>
          <span className="font-label-sm text-xs text-on-surface-variant min-w-[32px]">{formatTime(duration)}</span>
        </div>

        {/* Transport Controls */}
        <div className="flex justify-center items-center gap-8">
          <button onClick={prev} className="text-on-surface hover:text-primary transition-colors">
            <SkipBack className="w-8 h-8" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,219,233,0.4)]"
          >
            {isPlaying ? <Pause className="w-9 h-9 fill-current" /> : <Play className="w-9 h-9 fill-current" />}
          </button>
          <button onClick={next} className="text-on-surface hover:text-primary transition-colors">
            <SkipForward className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
