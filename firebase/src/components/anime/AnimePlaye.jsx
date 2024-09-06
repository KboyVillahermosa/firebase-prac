import React, { useState, useEffect } from 'react';
import axios from 'axios';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const AnimePlayer = ({ episodeId, serverName }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { data } = await axios.get(`https://api.consumet.org/anime/9anime/watch/${episodeId}`, {
          params: { server: serverName }
        });

        console.log("API Response:", data); // Debug line

        if (data && data.url) {
          setVideoUrl(data.url);
        } else {
          setError('Video not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch video URL:', err);
        setError('An error occurred while fetching the video.');
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [episodeId, serverName]);

  useEffect(() => {
    if (videoUrl) {
      const player = videojs('anime-video', {
        controls: true,
        autoplay: true,
        preload: 'auto',
      });

      player.src({ src: videoUrl, type: 'video/mp4' });

      return () => {
        player.dispose();
      };
    }
  }, [videoUrl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <video id="anime-video" className="video-js vjs-default-skin" controls preload="auto" width="640" height="264" />
    </div>
  );
};

export default AnimePlayer;
