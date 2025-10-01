/**
 * Video-related TypeScript interfaces and types
 * Defines the structure for video data, player state, and video management
 */

export type VideoLanguage = 'english' | 'hindi';
export type VideoCategory = 'tutorial' | 'demo' | 'feature' | 'overview';
export type VideoQuality = '480p' | '720p' | '1080p' | 'auto';

/**
 * Core video data structure
 */
export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // in seconds
  language: VideoLanguage;
  category?: VideoCategory;
  fileSize?: number; // in bytes
  resolution?: string; // e.g., "1920x1080"
  aspectRatio?: string; // e.g., "16:9"
  subtitles?: SubtitleTrack[];
}

/**
 * Subtitle track information
 */
export interface SubtitleTrack {
  language: VideoLanguage;
  label: string;
  src: string;
  default?: boolean;
}

/**
 * Video player state management
 */
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage?: string;
  playbackRate: number;
  quality: VideoQuality;
  showControls: boolean;
  buffered: TimeRanges | null;
}

/**
 * Video metadata extracted from file
 */
export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  aspectRatio: string;
  fileSize: number;
  format: string;
  codecs: string[];
  bitrate?: number;
  framerate?: number;
}

/**
 * Video player configuration options
 */
export interface VideoPlayerConfig {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string;
  crossorigin?: 'anonymous' | 'use-credentials';
  playsinline?: boolean;
  disablePictureInPicture?: boolean;
  controlsTimeout?: number; // milliseconds
  seekStep?: number; // seconds
  volumeStep?: number; // 0-1
}

/**
 * Video card display properties
 */
export interface VideoCardProps {
  video: VideoItem;
  onPlay: (video: VideoItem) => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  showDuration?: boolean;
  showLanguage?: boolean;
  showDescription?: boolean;
}

/**
 * Video player modal properties
 */
export interface VideoPlayerModalProps {
  video: VideoItem | null;
  isOpen: boolean;
  onClose: () => void;
  config?: VideoPlayerConfig;
  className?: string;
}

/**
 * Video controls component properties
 */
export interface VideoControlsProps {
  video: HTMLVideoElement | null;
  state: VideoPlayerState;
  onStateChange: (updates: Partial<VideoPlayerState>) => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onPlayPause: () => void;
  onFullscreen: () => void;
  className?: string;
}

/**
 * Video service error types
 */
export interface VideoError extends Error {
  code: VideoErrorCode;
  video?: VideoItem;
  details?: any;
}

export enum VideoErrorCode {
  LOAD_FAILED = 'LOAD_FAILED',
  DECODE_ERROR = 'DECODE_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNSUPPORTED_FORMAT = 'UNSUPPORTED_FORMAT',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
}

/**
 * Video collection/playlist structure
 */
export interface VideoCollection {
  id: string;
  title: string;
  description?: string;
  videos: VideoItem[];
  thumbnail?: string;
  category: VideoCategory;
  language?: VideoLanguage;
  totalDuration: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Video analytics and engagement tracking
 */
export interface VideoAnalytics {
  videoId: string;
  views: number;
  totalWatchTime: number; // in seconds
  averageWatchTime: number;
  completionRate: number; // percentage
  dropOffPoints: number[]; // timestamps where users typically stop watching
  mostRewatched: number[]; // timestamps that are frequently rewatched
  lastWatched?: Date;
}

/**
 * Video loading states for UI feedback
 */
export type VideoLoadingState = 
  | 'idle'
  | 'loading'
  | 'loaded'
  | 'error'
  | 'playing'
  | 'paused'
  | 'ended'
  | 'buffering';

/**
 * Video player events
 */
export interface VideoPlayerEvents {
  onLoadStart?: () => void;
  onLoadedData?: () => void;
  onCanPlay?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onVolumeChange?: (volume: number, muted: boolean) => void;
  onProgress?: (buffered: TimeRanges) => void;
  onSeeking?: () => void;
  onSeeked?: () => void;
  onWaiting?: () => void;
  onError?: (error: VideoError) => void;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

/**
 * Utility type for time formatting
 */
export interface FormattedTime {
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string; // "HH:MM:SS" or "MM:SS"
}