import { useRef } from 'react';
import { formatTime, calculateProgress, calculateTimeFromClick } from '@/utils/audio';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onTimeChange: (time: number) => void;
}

export function ProgressBar({ currentTime, duration, onTimeChange }: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const progress = calculateProgress(currentTime, duration);

  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const newTime = calculateTimeFromClick(event, progressRef.current, duration);
    onTimeChange(newTime);
  };

  return (
    <div className="w-full max-w-[800px] px-4">
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums w-10">
          {formatTime(currentTime)}
        </span>
        
        <div 
          ref={progressRef}
          className="audio-progress-container flex-1"
          onClick={handleProgressClick}
        >
          <div 
            className="audio-progress-bar"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => onTimeChange(Number(e.target.value))}
            className="audio-progress"
          />
        </div>
        
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums w-10">
          {formatTime(duration || 0)}
        </span>
      </div>
    </div>
  );
}