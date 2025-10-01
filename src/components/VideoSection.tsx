import React, { useState } from 'react';
import { Play, Video, Globe } from 'lucide-react';
import VideoCard from './VideoCard';
import VideoPlayerModal from './VideoPlayerModal';
import { VideoItem } from '../types/video';
import { videoAssets, videoCollections } from '../config/videos';
import { cn } from '../lib/utils';

/**
 * VideoSection Component
 * 
 * Main section component that displays video cards in a responsive grid layout.
 * Manages video selection and modal playback with glassmorphism design.
 */
const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'english' | 'hindi'>('all');

  const handleVideoPlay = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const filteredVideos = videoAssets.filter(video => {
    if (activeFilter === 'all') return true;
    return video.language === activeFilter;
  });

  const getFilterLabel = (filter: string) => {
    switch (filter) {
      case 'hindi':
        return 'हिंदी';
      case 'english':
        return 'English';
      default:
        return 'All Videos';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 particles opacity-30" />
      
      {/* Section Header */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-6 py-3 mb-6">
            <Video className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">Video Showcase</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Watch & Learn</span>
          </h2>
          
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive video library featuring system demonstrations, 
            tutorials, and deep-dive technical content. Available in multiple languages 
            with premium glassmorphism player experience.
          </p>

          {/* Language Filter */}
          <div className="flex justify-center gap-4 mt-8">
            {(['all', 'english', 'hindi'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                  'border backdrop-filter backdrop-blur-md',
                  activeFilter === filter
                    ? 'bg-blue-500/20 border-blue-400 text-blue-200'
                    : 'bg-white/5 border-white/20 text-slate-300 hover:bg-white/10 hover:border-white/30'
                )}
              >
                <div className="flex items-center gap-2">
                  {filter === 'all' && <Globe className="w-4 h-4" />}
                  {filter !== 'all' && <Play className="w-4 h-4" />}
                  {getFilterLabel(filter)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Video Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {videoAssets.length}
            </div>
            <div className="text-slate-300 text-sm">Total Videos</div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {Math.floor(videoAssets.reduce((total, video) => total + video.duration, 0) / 60)}
            </div>
            <div className="text-slate-300 text-sm">Minutes of Content</div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">
              {new Set(videoAssets.map(v => v.language)).size}
            </div>
            <div className="text-slate-300 text-sm">Languages</div>
          </div>
        </div>

        {/* Featured Collection */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 glass-button rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-blue-400" />
            </div>
            Getting Started Collection
          </h3>
          
          <div className="glass-card rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Essential System Overview
                </h4>
                <p className="text-slate-300 mb-4">
                  Perfect introduction to our AI-powered system. These videos will get you 
                  up to speed with core concepts, architecture, and capabilities.
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-400">
                  <span>
                    {videoCollections.find(c => c.id === 'getting-started')?.videos.length} videos
                  </span>
                  <span>•</span>
                  <span>
                    {Math.floor((videoCollections.find(c => c.id === 'getting-started')?.totalDuration || 0) / 60)} minutes
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const firstVideo = videoCollections.find(c => c.id === 'getting-started')?.videos[0];
                  if (firstVideo) handleVideoPlay(firstVideo);
                }}
                className="btn-hero px-6 py-3 rounded-lg font-medium flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Watching
              </button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="transform hover:scale-105 transition-transform duration-300">
              <VideoCard
                video={video}
                onPlay={handleVideoPlay}
                size="medium"
                showDuration={true}
                showLanguage={true}
                showDescription={true}
              />
            </div>
          ))}
        </div>

        {/* No Videos Message */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-card rounded-2xl p-8 max-w-md mx-auto">
              <Video className="w-16 h-16 text-slate-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No videos found
              </h3>
              <p className="text-slate-300">
                No videos match the current filter. Try selecting a different language option.
              </p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience Our AI System?
            </h3>
            <p className="text-slate-300 mb-6">
              These videos showcase just a fraction of what our platform can do. 
              Get hands-on experience with our intelligent data processing capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero px-8 py-3 rounded-lg font-medium">
                Start Free Trial
              </button>
              <button className="btn-glass px-8 py-3 rounded-lg font-medium">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default VideoSection;