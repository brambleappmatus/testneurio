import { AudioTrack } from '@/data/audioTracks';

interface TrackInfoProps {
  track: AudioTrack;
}

export function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-900 dark:text-white">
        {track.title}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {track.subtitle}
      </span>
    </div>
  );
}