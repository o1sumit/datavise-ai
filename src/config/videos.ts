import { VideoItem, VideoCollection } from '../types/video';

/**
 * Sample video assets configuration
 * In production, this would be loaded from a CMS or API
 */
export const videoAssets: VideoItem[] = [
  {
    id: 'system-work-english',
    title: 'How The System Works',
    description: 'Complete system overview and workflow explanation. Learn about the AI-powered architecture, database integration, and real-time processing capabilities.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: 180, // 3 minutes
    language: 'english',
    category: 'tutorial',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fileSize: 45 * 1024 * 1024, // 45MB
  },
  {
    id: 'system-work-hindi',
    title: 'सिस्टम कैसे काम करता है',
    description: 'पूर्ण सिस्टम अवलोकन और वर्कफ़्लो स्पष्टीकरण। AI-संचालित आर्किटेक्चर, डेटाबेस एकीकरण और रियल-टाइम प्रोसेसिंग क्षमताओं के बारे में जानें।',
    thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: 165, // 2:45 minutes
    language: 'hindi',
    category: 'tutorial',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fileSize: 42 * 1024 * 1024, // 42MB
  },
  {
    id: 'ai-architecture-demo',
    title: 'AI Architecture Deep Dive',
    description: 'Explore the cutting-edge AI architecture powering our intelligent data processing system. See how machine learning models work together seamlessly.',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: 240, // 4 minutes
    language: 'english',
    category: 'demo',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fileSize: 60 * 1024 * 1024, // 60MB
  },
  {
    id: 'database-integration',
    title: 'Database Integration Showcase',
    description: 'See how our system seamlessly integrates with multiple database systems including MongoDB, PostgreSQL, and MySQL with real-time synchronization.',
    thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: 200, // 3:20 minutes
    language: 'english',
    category: 'feature',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  {
    id: 'performance-optimization',
    title: 'Performance & Security Features',
    description: 'Learn about enterprise-grade security measures and performance optimizations that make our system reliable and scalable.',
    thumbnail: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=450&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: 150, // 2:30 minutes
    language: 'english',
    category: 'overview',
    resolution: '1920x1080',
    aspectRatio: '16:9',
    fileSize: 38 * 1024 * 1024, // 38MB
  }
];

/**
 * Video collections/playlists for organized content
 */
export const videoCollections: VideoCollection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Essential videos to understand how our AI-powered system works',
    videos: videoAssets.filter(v => ['system-work-english', 'system-work-hindi'].includes(v.id)),
    category: 'tutorial',
    totalDuration: videoAssets
      .filter(v => ['system-work-english', 'system-work-hindi'].includes(v.id))
      .reduce((total, v) => total + v.duration, 0),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'technical-deep-dive',
    title: 'Technical Deep Dive',
    description: 'In-depth technical demonstrations of core features and capabilities',
    videos: videoAssets.filter(v => ['ai-architecture-demo', 'database-integration', 'performance-optimization'].includes(v.id)),
    category: 'demo',
    totalDuration: videoAssets
      .filter(v => ['ai-architecture-demo', 'database-integration', 'performance-optimization'].includes(v.id))
      .reduce((total, v) => total + v.duration, 0),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-20'),
  }
];

/**
 * Video player default configuration
 */
export const defaultVideoConfig = {
  autoplay: false,
  loop: false,
  muted: false,
  controls: false, // We use custom controls
  preload: 'metadata' as const,
  playsinline: true,
  disablePictureInPicture: false,
  controlsTimeout: 3000, // 3 seconds
  seekStep: 10, // 10 seconds
  volumeStep: 0.1, // 10% volume steps
};

/**
 * Supported video formats and their MIME types
 */
export const supportedFormats = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogg: 'video/ogg',
};

/**
 * Video quality options
 */
export const videoQualities = [
  { value: 'auto', label: 'Auto' },
  { value: '1080p', label: '1080p HD' },
  { value: '720p', label: '720p HD' },
  { value: '480p', label: '480p' },
];

/**
 * Get video by ID
 */
export const getVideoById = (id: string): VideoItem | undefined => {
  return videoAssets.find(video => video.id === id);
};

/**
 * Get videos by language
 */
export const getVideosByLanguage = (language: 'english' | 'hindi'): VideoItem[] => {
  return videoAssets.filter(video => video.language === language);
};

/**
 * Get videos by category
 */
export const getVideosByCategory = (category: string): VideoItem[] => {
  return videoAssets.filter(video => video.category === category);
};

/**
 * Format duration in seconds to readable time string
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format file size in bytes to readable string
 */
export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Check if browser supports video format
 */
export const canPlayVideoFormat = (format: string): boolean => {
  const video = document.createElement('video');
  return video.canPlayType(format) !== '';
};

/**
 * Get optimal video format for current browser
 */
export const getOptimalVideoFormat = (): string => {
  if (canPlayVideoFormat(supportedFormats.webm)) {
    return 'webm';
  }
  if (canPlayVideoFormat(supportedFormats.mp4)) {
    return 'mp4';
  }
  return 'mp4'; // fallback
};