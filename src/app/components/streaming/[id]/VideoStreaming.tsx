'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';

export default function VideoStreaming() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
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

  const handleQualityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLevel = parseInt(event.target.value, 10);
    if (hlsInstance) {
      hlsInstance.currentLevel = selectedLevel;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div className={styles.streamingVideo}>
      <video ref={videoRef} className={styles.videoPlayer} />
      <div className={styles.controls}>
        <button onClick={handleFullscreen}>전체화면</button>
        {levels.length > 0 && (
          <select onChange={handleQualityChange} defaultValue={-1}>
            <option value={-1}>Auto</option>
            {levels.map((level, index) => (
              <option key={index} value={index}>
                {level.height}p
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
