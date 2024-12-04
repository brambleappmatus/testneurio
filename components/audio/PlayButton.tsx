import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

interface PlayButtonProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

export function PlayButton({ isPlaying, onPlayPause }: PlayButtonProps) {
  return (
    <button
      onClick={onPlayPause}
      className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-black dark:bg-emerald-500 text-white hover:bg-gray-900 dark:hover:bg-emerald-600 transition-all duration-200 shadow-lg"
    >
      {isPlaying ? (
        <PauseIcon className="w-6 h-6" />
      ) : (
        <PlayIcon className="w-6 h-6" />
      )}
    </button>
  );
}