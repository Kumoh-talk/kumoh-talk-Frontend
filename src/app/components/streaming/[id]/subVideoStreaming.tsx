'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './subVideoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';

export default function SubVideoStreaming() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl =
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8';

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = videoUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [videoUrl]);

  return (
    <div className={styles.streamingVideo}>
      <video ref={videoRef} className={styles.videoPlayer} muted />
    </div>
  );
}
