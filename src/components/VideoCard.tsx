import React, { useState } from 'react';
import { Play, Clock, Globe, FileText } from 'lucide-react';
import { VideoItem, VideoCardProps } from '../types/video';
import { formatDuration } from '../config/videos';
import { cn } from '../lib/utils';

/**
 * VideoCard Component
 * 
 * A glassmorphism-styled card component that displays video information
 * and serves as the entry point for video playback. Features iOS-like
 * hover effects and smooth animations.
 */
const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  className,
  size = 'medium',
  showDuration = true,
  showLanguage = true,
  showDescription = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPlay(video);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPlay(video);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-64 h-40';
      case 'large':
        return 'w-96 h-64';
      default:
        return 'w-80 h-52';
    }
  };

  const getPaddingClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-3'; // Smaller horizontal padding for compact cards
      case 'large':
        return 'px-8 py-6'; // Generous padding for larger cards
      default:
        return 'px-6 py-5'; // Enhanced padding for medium cards
    }
  };

  const getLanguageLabel = (lang: string) => {
    return lang === 'hindi' ? 'हिंदी' : 'English';
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'tutorial':
        return <FileText className="w-3 h-3" />;
      case 'demo':
        return <Play className="w-3 h-3" />;
      default:
        return <Globe className="w-3 h-3" />;
    }
  };

  return (
    <div
      className={cn(
        'group glass-video-card rounded-2xl overflow-hidden cursor-pointer',
        'transform-gpu video-card-hover relative',
        getSizeClasses(),
        className
      )}
      onClick={handlePlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Play video: ${video.title}`}
    >
      {/* Video Thumbnail */}
      <div className="relative w-full h-3/5 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full video-spinner" />
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
            <FileText className="w-12 h-12 mb-2 opacity-50" />
            <span className="text-xs">Thumbnail unavailable</span>
          </div>
        ) : (
          <img
            src={video.thumbnail}
            alt={video.title}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="glass-button rounded-full p-4 play-button-pulse">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        {showDuration && (
          <div className="absolute bottom-2 right-2 glass-button rounded px-2 py-1 text-xs font-medium text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(video.duration)}
          </div>
        )}

        {/* Language Badge */}
        {showLanguage && (
          <div className="absolute top-2 left-2 glass-button rounded px-2 py-1 text-xs font-medium text-white flex items-center gap-1">
            {getCategoryIcon(video.category)}
            {getLanguageLabel(video.language)}
          </div>
        )}
      </div>

      {/* Video Information */}
      <div className={cn("h-2/5 flex flex-col justify-between", getPaddingClasses())}>
        <div className="space-y-3">
          <h3 
            className="font-semibold text-white line-clamp-2 group-hover:text-blue-200 transition-colors duration-200 mb-2"
            title={video.title}
          >
            {video.title}
          </h3>
          
          {showDescription && video.description && (
            <p 
              className="text-sm text-slate-300 line-clamp-2 opacity-90 leading-relaxed"
              title={video.description}
            >
              {video.description}
            </p>
          )}
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {video.category && (
              <span className="capitalize bg-slate-800 px-2 py-0.5 rounded">
                {video.category}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-slate-400">
            {video.resolution && (
              <span className="bg-slate-800 px-2 py-0.5 rounded">
                {video.resolution.split('x')[1]}p
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      </div>
    </div>
  );
};

export default VideoCard;