'use client';

import { useEffect, useRef } from 'react';
import styles from './subVideoVod.module.scss';
import Hls, { type Level } from 'hls.js';

interface Props {
  subScreenUrl: string;
  subScreenTsQuery: string;
  handleChangeScreen: () => void;
  isPlaying: boolean;
  currentTime: number;
  lastPlayTime: number;
}

export default function SubVideoVod({
  subScreenUrl,
  subScreenTsQuery,
  handleChangeScreen,
  isPlaying,
  currentTime,
  lastPlayTime,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // URL이 없으면 Hls.js 실행하지 않음
    if (
      !subScreenUrl ||
      typeof subScreenUrl !== 'string' ||
      !subScreenUrl.trim()
    )
      return;

    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          liveSyncDuration: 5,
          xhrSetup: (xhr, url) => {
            if (url.endsWith('.ts')) {
              const separator = url.includes('?') ? '&' : '?';
              xhr.open('GET', url + separator + subScreenTsQuery, true);
            }
          },
        });
        hls.loadSource(subScreenUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          if (videoRef.current) {
            videoRef.current.currentTime = lastPlayTime;
            videoRef.current.play();
          }
        });

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType('application/vnd.apple.mpegurl')
      ) {
        videoRef.current.src = subScreenUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          if (videoRef.current) {
            videoRef.current.currentTime = lastPlayTime;
            videoRef.current.play();
          }
        });
      }
    }
  }, [subScreenUrl, subScreenTsQuery, lastPlayTime]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - currentTime) > 0.5
    ) {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className={styles.streamingVideo} onClick={handleChangeScreen}>
      <video ref={videoRef} className={styles.videoPlayer} muted />
    </div>
  );
}
