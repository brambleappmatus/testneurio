import { AudioTrack } from '@/data/audioTracks';
import { PlayButton } from './PlayButton';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';
import { QueueListIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

interface AudioControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrack: AudioTrack;
  onPlayPause: () => void;
  onTimeChange: (time: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isTrackListOpen: boolean;
  onTrackListToggle: () => void;
}

export function AudioControls({
  isPlaying,
  currentTime,
  duration,
  currentTrack,
  onPlayPause,
  onTimeChange,
  volume,
  onVolumeChange,
  isTrackListOpen,
  onTrackListToggle,
}: AudioControlsProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <PlayButton isPlaying={isPlaying} onPlayPause={onPlayPause} />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentTrack.title}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {currentTrack.subtitle}
          </span>
        </div>
      </div>

      <div className="flex-1">
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onTimeChange={onTimeChange}
        />
      </div>

      <div className="flex items-center gap-4">
        <VolumeControl volume={volume} onVolumeChange={onVolumeChange} />
        
        <div className="h-8 w-px bg-gray-200 dark:bg-gray-700/50" />
        
        <button
          onClick={onTrackListToggle}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
            isTrackListOpen 
              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'
          }`}
        >
          <QueueListIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Tracks</span>
          <ChevronUpIcon
            className={`w-5 h-5 transition-transform ${
              isTrackListOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>
    </div>
  );
}