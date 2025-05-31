'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';
import Caption from './Caption';
import SubVideoStreaming from './SubVideoStreaming';

export default function VideoStreaming() {
  const [mainScreenUrl, setMainScreenUrl] = useState(
    'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
  );
  const [subScreenUrl, setSubScreenUrl] = useState(
    'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
  );

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          xhrSetup: (xhr, url) => {
            if (url.endsWith('.ts')) {
              const separator = url.includes('?') ? '&' : '?';
              xhr.open('GET', url + separator + 'tsQuery', true);
            }
          },
        });
        hls.loadSource(mainScreenUrl);
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
        videoRef.current.src = mainScreenUrl;
        videoRef.current.addEventListener('loadedmetadata', () => {
          videoRef.current?.play();
        });
      }
    }
  }, [mainScreenUrl]);

  return (
    <div className={styles.streamingVideo}>
      <div className={styles.overlay}>
        <div className={styles.top}>
          <SubVideoStreaming
            mainScreenUrl={mainScreenUrl}
            subScreenUrl={subScreenUrl}
            setMainScreenUrl={setMainScreenUrl}
            setSubScreenUrl={setSubScreenUrl}
          />
        </div>
        <Caption />
      </div>
      <video ref={videoRef} className={styles.videoPlayer} controls muted />
    </div>
  );
}
