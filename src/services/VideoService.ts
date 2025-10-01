import { VideoItem, VideoMetadata, VideoError, VideoErrorCode } from '../types/video';

/**
 * VideoService Class
 * 
 * Utility class for managing video operations including metadata extraction,
 * thumbnail generation, format validation, and error handling.
 */
export class VideoService {
  private static cache = new Map<string, VideoMetadata>();

  /**
   * Extract metadata from a video file or URL
   */
  static async getVideoMetadata(videoUrl: string): Promise<VideoMetadata> {
    // Check cache first
    const cached = this.cache.get(videoUrl);
    if (cached) {
      return cached;
    }

    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';

      video.onloadedmetadata = () => {
        try {
          const metadata: VideoMetadata = {
            duration: video.duration,
            width: video.videoWidth,
            height: video.videoHeight,
            aspectRatio: this.calculateAspectRatio(video.videoWidth, video.videoHeight),
            fileSize: 0, // Cannot determine from URL
            format: this.getFormatFromUrl(videoUrl),
            codecs: [], // Would require additional analysis
          };

          // Cache the result
          this.cache.set(videoUrl, metadata);
          resolve(metadata);
        } catch (error) {
          reject(this.createVideoError(VideoErrorCode.DECODE_ERROR, error as Error));
        }
      };

      video.onerror = () => {
        reject(this.createVideoError(VideoErrorCode.LOAD_FAILED, new Error('Failed to load video metadata')));
      };

      video.src = videoUrl;
    });
  }

  /**
   * Generate a thumbnail from the video at a specific time
   */
  static async generateThumbnail(videoUrl: string, timeInSeconds: number = 1): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(this.createVideoError(VideoErrorCode.DECODE_ERROR, new Error('Canvas context not available')));
        return;
      }

      video.crossOrigin = 'anonymous';
      video.currentTime = timeInSeconds;

      video.onloadeddata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
        resolve(thumbnail);
      };

      video.onerror = () => {
        reject(this.createVideoError(VideoErrorCode.LOAD_FAILED, new Error('Failed to generate thumbnail')));
      };

      video.src = videoUrl;
    });
  }

  /**
   * Validate if a video format is supported by the browser
   */
  static validateVideoFormat(file: File): boolean {
    const video = document.createElement('video');
    const canPlay = video.canPlayType(file.type);
    return canPlay === 'probably' || canPlay === 'maybe';
  }

  /**
   * Check if a video URL is accessible and valid
   */
  static async validateVideoUrl(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok && response.headers.get('content-type')?.startsWith('video/') === true;
    } catch {
      return false;
    }
  }

  /**
   * Get optimal playback quality based on network conditions and device capabilities
   */
  static getOptimalQuality(): string {
    // Simple implementation - could be enhanced with network detection
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      const effectiveType = connection.effectiveType;
      switch (effectiveType) {
        case '4g':
          return '1080p';
        case '3g':
          return '720p';
        case '2g':
        case 'slow-2g':
          return '480p';
        default:
          return 'auto';
      }
    }

    // Fallback based on screen size
    const screenWidth = window.screen.width;
    if (screenWidth >= 1920) return '1080p';
    if (screenWidth >= 1280) return '720p';
    return '480p';
  }

  /**
   * Format time in seconds to human-readable string
   */
  static formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Check if video element supports picture-in-picture
   */
  static supportsPictureInPicture(): boolean {
    return 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled;
  }

  /**
   * Check if browser supports fullscreen API
   */
  static supportsFullscreen(): boolean {
    return !!(
      document.fullscreenEnabled ||
      (document as any).webkitFullscreenEnabled ||
      (document as any).mozFullScreenEnabled ||
      (document as any).msFullscreenEnabled
    );
  }

  /**
   * Request fullscreen for a video element
   */
  static async requestFullscreen(element: HTMLVideoElement): Promise<void> {
    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).mozRequestFullScreen) {
        await (element as any).mozRequestFullScreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
    } catch (error) {
      throw this.createVideoError(VideoErrorCode.PERMISSION_DENIED, error as Error);
    }
  }

  /**
   * Exit fullscreen mode
   */
  static async exitFullscreen(): Promise<void> {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      throw this.createVideoError(VideoErrorCode.PERMISSION_DENIED, error as Error);
    }
  }

  /**
   * Check if currently in fullscreen mode
   */
  static isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
  }

  /**
   * Save user preferences to localStorage
   */
  static saveUserPreferences(preferences: { volume: number; quality: string; autoplay: boolean }): void {
    try {
      localStorage.setItem('videoPlayerPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('Failed to save video preferences:', error);
    }
  }

  /**
   * Load user preferences from localStorage
   */
  static loadUserPreferences(): { volume: number; quality: string; autoplay: boolean } | null {
    try {
      const saved = localStorage.getItem('videoPlayerPreferences');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load video preferences:', error);
      return null;
    }
  }

  /**
   * Calculate aspect ratio from width and height
   */
  private static calculateAspectRatio(width: number, height: number): string {
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  /**
   * Extract format from video URL
   */
  private static getFormatFromUrl(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return 'video/mp4'; // default fallback
    }
  }

  /**
   * Create a standardized video error object
   */
  private static createVideoError(code: VideoErrorCode, originalError: Error, video?: VideoItem): VideoError {
    const error = new Error(originalError.message) as VideoError;
    error.code = code;
    error.video = video;
    error.details = originalError;
    return error;
  }

  /**
   * Preload a video for faster playback
   */
  static preloadVideo(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      
      video.oncanplaythrough = () => resolve();
      video.onerror = () => reject(this.createVideoError(VideoErrorCode.LOAD_FAILED, new Error('Preload failed')));
      
      video.src = url;
    });
  }

  /**
   * Get video loading progress
   */
  static getLoadingProgress(video: HTMLVideoElement): number {
    if (video.buffered.length === 0) return 0;
    
    const bufferedEnd = video.buffered.end(video.buffered.length - 1);
    const duration = video.duration;
    
    return duration > 0 ? (bufferedEnd / duration) * 100 : 0;
  }

  /**
   * Cleanup video resources
   */
  static cleanupVideo(video: HTMLVideoElement): void {
    video.pause();
    video.src = '';
    video.load();
  }
}