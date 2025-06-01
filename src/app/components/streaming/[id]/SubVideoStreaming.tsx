'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styles from './subVideoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';

interface Props {
  mainScreenUrl: string;
  mainScreenTsQuery: string;
  subScreenUrl: string;
  subScreenTsQuery: string;
  setMainScreenUrl: Dispatch<SetStateAction<string>>;
  setMainScreenTsQuery: Dispatch<SetStateAction<string>>;
  setSubScreenUrl: Dispatch<SetStateAction<string>>;
  setSubScreenTsQuery: Dispatch<SetStateAction<string>>;
}

export default function SubVideoStreaming({
  mainScreenUrl,
  mainScreenTsQuery,
  subScreenUrl,
  subScreenTsQuery,
  setMainScreenUrl,
  setMainScreenTsQuery,
  setSubScreenUrl,
  setSubScreenTsQuery,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleChangeScreen = () => {
    console.log('화면 변경');
    setMainScreenUrl(subScreenUrl);
    setSubScreenUrl(mainScreenUrl);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
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
