'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoVod.module.scss';
import Hls, { type Level } from 'hls.js';
import Caption from '../../streaming/[id]/Caption';
import SubVideoVod from './SubVideoVod';

interface Props {
  camUrl: string;
  camTsQuery: string;
  slideUrl: string;
  slideTsQuery: string;
}

export default function VideoVod({
  camUrl,
  camTsQuery,
  slideUrl,
  slideTsQuery,
}: Props) {
  const [mainScreenUrl, setMainScreenUrl] = useState(slideUrl);
  const [mainScreenTsQuery, setMainScreenTsQuery] = useState(slideTsQuery);
  const [subScreenUrl, setSubScreenUrl] = useState(camUrl);
  const [subScreenTsQuery, setSubScreenTsQuery] = useState(camTsQuery);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [lastPlayTime, setLastPlayTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleChangeScreen = () => {
    if (videoRef.current) {
      setLastPlayTime(videoRef.current.currentTime);
    }
    setMainScreenUrl(subScreenUrl);
    setMainScreenTsQuery(subScreenTsQuery);
    setSubScreenUrl(mainScreenUrl);
    setSubScreenTsQuery(mainScreenTsQuery);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      setIsPlaying(!videoRef.current.paused);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;

    if (videoEl) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            if (url.endsWith('.ts')) {
              const separator = url.includes('?') ? '&' : '?';
              xhr.open('GET', url + separator + mainScreenTsQuery, true);
            }
          },
        });
        hls.loadSource(mainScreenUrl);
        hls.attachMedia(videoEl);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoEl.currentTime = lastPlayTime;
          videoEl.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        videoEl.src = mainScreenUrl;
        videoEl.addEventListener('loadedmetadata', () => {
          videoEl.currentTime = lastPlayTime;
          videoEl.play();
        });
      }
    }
  }, [mainScreenUrl, lastPlayTime]);

  return (
    <div className={styles.streamingVideo}>
      <div className={styles.overlay}>
        <div className={styles.top}>
          <SubVideoVod
            subScreenUrl={subScreenUrl}
            subScreenTsQuery={subScreenTsQuery}
            handleChangeScreen={handleChangeScreen}
            isPlaying={isPlaying}
            currentTime={currentTime}
            lastPlayTime={lastPlayTime}
          />
        </div>
        <Caption />
      </div>
      <video
        ref={videoRef}
        className={styles.videoPlayer}
        controls
        muted
        onPlay={handlePlayPause}
        onPause={handlePlayPause}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
