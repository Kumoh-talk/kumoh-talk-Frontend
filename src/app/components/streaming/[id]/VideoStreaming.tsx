'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';
import Caption from './Caption';

export default function VideoStreaming() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

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
      <video ref={videoRef} className={styles.videoPlayer} controls muted />
      <div className={styles.overlay}>
        <div className={styles.top}></div>
        <Caption />
      </div>
    </div>
  );
}
