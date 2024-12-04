import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';
import { setAudioVolume } from '@/utils/audio';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const toggleMute = () => {
    onVolumeChange(volume === 0 ? 1 : 0);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMute}
        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        {volume === 0 ? (
          <SpeakerXMarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <SpeakerWaveIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={volume}
        onChange={(e) => onVolumeChange(Number(e.target.value))}
        className="volume-slider"
      />
    </div>
  );
}