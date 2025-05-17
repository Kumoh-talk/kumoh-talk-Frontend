'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './subVideoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';

interface Props {
  mainScreenUrl: string;
  subScreenUrl: string;
  setMainScreenUrl: Dispatch<SetStateAction<string>>;
  setSubScreenUrl: Dispatch<SetStateAction<string>>;
}

export default function SubVideoStreaming({
  mainScreenUrl,
  subScreenUrl,
  setMainScreenUrl,
  setSubScreenUrl,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleChangeScreen = () => {
    setMainScreenUrl(subScreenUrl);
    setSubScreenUrl(mainScreenUrl);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(subScreenUrl);
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
        videoRef.current.src = subScreenUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [subScreenUrl]);

  return (
    <div className={styles.streamingVideo} onClick={handleChangeScreen}>
      <video ref={videoRef} className={styles.videoPlayer} muted />
    </div>
  );
}
