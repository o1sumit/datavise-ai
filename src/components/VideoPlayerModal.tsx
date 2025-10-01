import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { VideoItem, VideoPlayerState, VideoPlayerModalProps } from '../types/video';
import { VideoService } from '../services/VideoService';
import { defaultVideoConfig } from '../config/videos';
import VideoControls from './VideoControls';
import { cn } from '../lib/utils';

/**
 * VideoPlayerModal Component
 * 
 * Full-featured video player modal with glassmorphism design.
 * Provides immersive video playback experience with custom controls,
 * keyboard navigation, and responsive design.
 */
const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  config = defaultVideoConfig,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    isFullscreen: false,
    isLoading: true,
    hasError: false,
    playbackRate: 1,
    quality: 'auto',
    showControls: true,
    buffered: null,
  });

  // Load user preferences on mount
  useEffect(() => {
    const preferences = VideoService.loadUserPreferences();
    if (preferences) {
      setPlayerState(prev => ({
        ...prev,
        volume: preferences.volume,
      }));
    }
  }, []);

  // Handle video loading and setup
  useEffect(() => {
    if (!video || !videoRef.current) return;

    const videoElement = videoRef.current;
    
    const handleLoadedData = () => {
      setPlayerState(prev => ({ 
        ...prev, 
        isLoading: false,
        duration: videoElement.duration 
      }));
    };

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: videoElement.currentTime,
        buffered: videoElement.buffered,
      }));
    };

    const handleVolumeChange = () => {
      setPlayerState(prev => ({
        ...prev,
        volume: videoElement.volume,
        isMuted: videoElement.muted,
      }));
    };

    const handlePlay = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: true }));
    };

    const handlePause = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    };

    const handleWaiting = () => {
      setPlayerState(prev => ({ ...prev, isLoading: true }));
    };

    const handleCanPlay = () => {
      setPlayerState(prev => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setPlayerState(prev => ({
        ...prev,
        hasError: true,
        isLoading: false,
        errorMessage: 'Failed to load video',
      }));
    };

    const handleEnded = () => {
      setPlayerState(prev => ({ ...prev, isPlaying: false }));
    };

    // Add event listeners
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('volumechange', handleVolumeChange);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    videoElement.addEventListener('ended', handleEnded);

    // Set initial volume
    videoElement.volume = playerState.volume;

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('volumechange', handleVolumeChange);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [video, playerState.volume]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !videoRef.current) return;

      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, playerState.currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(playerState.duration, playerState.currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(Math.min(1, playerState.volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, playerState.volume - 0.1));
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'f':
          e.preventDefault();
          handleFullscreen();
          break;
        case 'Escape':
          if (playerState.isFullscreen) {
            VideoService.exitFullscreen();
          } else {
            handleClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, playerState]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setPlayerState(prev => ({
        ...prev,
        isFullscreen: VideoService.isFullscreen(),
      }));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (playerState.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(error => {
        setPlayerState(prev => ({
          ...prev,
          hasError: true,
          errorMessage: 'Failed to play video',
        }));
      });
    }
  }, [playerState.isPlaying]);

  const handleSeek = useCallback((time: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
  }, []);

  const handleVolumeChange = useCallback((volume: number) => {
    if (!videoRef.current) return;
    
    videoRef.current.volume = volume;
    setPlayerState(prev => ({ ...prev, volume, isMuted: volume === 0 }));
    
    // Save preference
    VideoService.saveUserPreferences({
      volume,
      quality: playerState.quality,
      autoplay: config.autoplay || false,
    });
  }, [playerState.quality, config.autoplay]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !videoRef.current.muted;
  }, []);

  const handleFullscreen = useCallback(async () => {
    if (!videoRef.current) return;

    try {
      if (playerState.isFullscreen) {
        await VideoService.exitFullscreen();
      } else {
        await VideoService.requestFullscreen(videoRef.current);
      }
    } catch (error) {
      console.warn('Fullscreen operation failed:', error);
    }
  }, [playerState.isFullscreen]);

  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      VideoService.cleanupVideo(videoRef.current);
    }
    onClose();
  }, [onClose]);

  const handleStateChange = useCallback((updates: Partial<VideoPlayerState>) => {
    setPlayerState(prev => ({ ...prev, ...updates }));
  }, []);

  // Click to play/pause
  const handleVideoClick = (e: React.MouseEvent) => {
    // Only handle clicks directly on the video, not on controls
    if (e.target === videoRef.current) {
      handlePlayPause();
    }
  };

  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className={cn(
          'max-w-6xl w-full h-auto p-0 bg-transparent border-none',
          'fade-in-video',
          className
        )}
      >
        <div 
          ref={containerRef}
          className="relative glass-video-player rounded-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 glass-button rounded-full p-2 hover:scale-110 transition-transform"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[80vh] bg-black cursor-pointer"
            src={video.videoUrl}
            poster={video.thumbnail}
            autoPlay={config.autoplay}
            loop={config.loop}
            muted={config.muted}
            preload={config.preload}
            playsInline={config.playsinline}
            disablePictureInPicture={config.disablePictureInPicture}
            onClick={handleVideoClick}
            aria-label={`Video player: ${video.title}`}
          />

          {/* Custom Controls Overlay */}
          <VideoControls
            video={videoRef.current}
            state={playerState}
            onStateChange={handleStateChange}
            onSeek={handleSeek}
            onVolumeChange={handleVolumeChange}
            onPlayPause={handlePlayPause}
            onFullscreen={handleFullscreen}
          />

          {/* Video Title Overlay */}
          <div className="absolute top-4 left-4 right-16 z-40">
            <div className="glass-button rounded-lg px-4 py-2">
              <h2 className="text-white font-semibold text-lg line-clamp-1">
                {video.title}
              </h2>
              {video.description && (
                <p className="text-white/80 text-sm mt-1 line-clamp-2">
                  {video.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;