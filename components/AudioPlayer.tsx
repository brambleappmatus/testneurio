'use client';

import { useState, useRef, useEffect } from 'react';
import { audioTracks } from '@/data/audioTracks';
import { AudioControls } from './audio/AudioControls';
import { VolumeControl } from './audio/VolumeControl';
import { TrackList } from './audio/TrackList';
import { motion } from 'framer-motion';
import { setAudioVolume } from '@/utils/audio';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isTrackListOpen, setIsTrackListOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(audioTracks[0]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (audioRef.current) {
      setAudioVolume(audioRef.current, volume);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 100);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTrackChange = (track: typeof currentTrack) => {
    setCurrentTrack(track);
    setIsTrackListOpen(false);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleTimeChange = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-black/10 dark:border-white/10 z-[60]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <AudioControls
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            currentTrack={currentTrack}
            onPlayPause={togglePlay}
            onTimeChange={handleTimeChange}
            volume={volume}
            onVolumeChange={setVolume}
            isTrackListOpen={isTrackListOpen}
            onTrackListToggle={() => setIsTrackListOpen(!isTrackListOpen)}
          />
        </div>
      </motion.div>

      <TrackList
        tracks={audioTracks}
        currentTrack={currentTrack}
        isOpen={isTrackListOpen}
        onToggle={() => setIsTrackListOpen(!isTrackListOpen)}
        onTrackSelect={handleTrackChange}
      />
    </>
  );
}