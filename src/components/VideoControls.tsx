import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  Download
} from 'lucide-react';
import { VideoControlsProps } from '../types/video';
import { VideoService } from '../services/VideoService';
import { cn } from '../lib/utils';

/**
 * VideoControls Component
 * 
 * Custom video player controls with iOS-style glassmorphism effects.
 * Provides a premium, futuristic interface for video playback control.
 */
const VideoControls: React.FC<VideoControlsProps> = ({
  video,
  state,
  onStateChange,
  onSeek,
  onVolumeChange,
  onPlayPause,
  onFullscreen,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-hide controls after inactivity
  useEffect(() => {
    const resetTimeout = () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
      
      if (state.isPlaying && !isDragging) {
        hideControlsTimeoutRef.current = setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
      }
    };

    resetTimeout();
    return () => {
      if (hideControlsTimeoutRef.current) {
        clearTimeout(hideControlsTimeoutRef.current);
      }
    };
  }, [state.isPlaying, isDragging]);

  const handleMouseMove = () => {
    setControlsVisible(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !video) return;

    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const seekTime = percentage * state.duration;
    
    onSeek(seekTime);
  };

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressRef.current || !video) return;

    const rect = progressRef.current.getBoundingClientRect();
    const dragX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = dragX / rect.width;
    const seekTime = percentage * state.duration;
    
    onSeek(seekTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeSliderRef.current) return;

    const rect = volumeSliderRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percentage = 1 - (clickY / rect.height);
    const newVolume = Math.max(0, Math.min(1, percentage));
    
    onVolumeChange(newVolume);
    onStateChange({ isMuted: newVolume === 0 });
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(0, state.currentTime - 10);
    onSeek(newTime);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(state.duration, state.currentTime + 10);
    onSeek(newTime);
  };

  const toggleMute = () => {
    if (state.isMuted) {
      onVolumeChange(state.volume > 0 ? state.volume : 0.5);
      onStateChange({ isMuted: false });
    } else {
      onStateChange({ isMuted: true });
    }
  };

  const formatTime = (seconds: number): string => {
    return VideoService.formatTime(seconds);
  };

  const getBufferedPercentage = (): number => {
    if (!video || !state.buffered || state.buffered.length === 0) return 0;
    
    const bufferedEnd = state.buffered.end(state.buffered.length - 1);
    return (bufferedEnd / state.duration) * 100;
  };

  const progressPercentage = (state.currentTime / state.duration) * 100;
  const bufferedPercentage = getBufferedPercentage();

  return (
    <div 
      className={cn(
        'absolute inset-0 transition-opacity duration-300',
        controlsVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Background overlay for better control visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Main Controls Container */}
      <div className="absolute bottom-0 left-0 right-0 glass-controls slide-up-controls p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <div
            ref={progressRef}
            className="relative h-2 glass-progress-track rounded-full cursor-pointer group"
            onClick={handleProgressClick}
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleProgressDrag}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* Buffered Progress */}
            <div
              className="absolute top-0 left-0 h-full bg-white/20 rounded-full transition-all duration-300"
              style={{ width: `${bufferedPercentage}%` }}
            />
            
            {/* Current Progress */}
            <div
              className="absolute top-0 left-0 h-full glass-progress-fill rounded-full transition-all duration-150"
              style={{ width: `${progressPercentage}%` }}
            />
            
            {/* Seek Handle */}
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg',
                'transform transition-all duration-150 opacity-0 group-hover:opacity-100',
                isDragging && 'scale-125 opacity-100'
              )}
              style={{ left: `calc(${progressPercentage}% - 8px)` }}
            />
          </div>

          {/* Time Display */}
          <div className="flex justify-between items-center mt-2 text-sm text-white/90">
            <span className="font-mono">
              {formatTime(state.currentTime)}
            </span>
            <span className="font-mono">
              {formatTime(state.duration)}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {/* Skip Backward */}
            <button
              onClick={handleSkipBackward}
              className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Skip backward 10 seconds"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={onPlayPause}
              className="glass-button rounded-full p-3 hover:scale-110 transition-transform"
              aria-label={state.isPlaying ? 'Pause' : 'Play'}
            >
              {state.isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" />
              )}
            </button>

            {/* Skip Forward */}
            <button
              onClick={handleSkipForward}
              className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Skip forward 10 seconds"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>

            {/* Volume Control */}
            <div className="relative">
              <button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
                aria-label={state.isMuted ? 'Unmute' : 'Mute'}
              >
                {state.isMuted || state.volume === 0 ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              {/* Volume Slider */}
              {showVolumeSlider && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 glass-button rounded-full p-2 h-24"
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <div
                    ref={volumeSliderRef}
                    className="relative w-1 h-full bg-white/20 rounded-full cursor-pointer"
                    onClick={handleVolumeClick}
                  >
                    <div
                      className="absolute bottom-0 w-full glass-progress-fill rounded-full"
                      style={{ height: `${state.volume * 100}%` }}
                    />
                    <div
                      className="absolute w-3 h-3 bg-white rounded-full -translate-x-1/2"
                      style={{ 
                        bottom: `calc(${state.volume * 100}% - 6px)`,
                        left: '50%'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Time Display in Controls */}
            <div className="text-sm text-white/90 font-mono ml-2">
              <span>{formatTime(state.currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(state.duration)}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Settings */}
            <button
              className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5 text-white" />
            </button>

            {/* Download */}
            <button
              className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
              aria-label="Download"
            >
              <Download className="w-5 h-5 text-white" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={onFullscreen}
              className="glass-button rounded-full p-2 hover:scale-110 transition-transform"
              aria-label={state.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {state.isFullscreen ? (
                <Minimize className="w-5 h-5 text-white" />
              ) : (
                <Maximize className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {state.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="glass-button rounded-full p-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full video-spinner" />
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {state.hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="glass-button rounded-lg p-6 text-center max-w-sm">
            <h3 className="text-white font-semibold mb-2">Playback Error</h3>
            <p className="text-white/80 text-sm">
              {state.errorMessage || 'An error occurred while playing the video.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoControls;