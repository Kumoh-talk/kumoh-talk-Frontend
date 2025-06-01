'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './videoStreaming.module.scss';
import Hls, { type Level } from 'hls.js';
import Caption from './Caption';
import SubVideoStreaming from './SubVideoStreaming';

interface Props {
  camUrl: string;
  camTsQuery: string;
  slideUrl: string;
  slideTsQuery: string;
}

export default function VideoStreaming({
  camUrl,
  camTsQuery,
  slideUrl,
  slideTsQuery,
}: Props) {
  const [mainScreenUrl, setMainScreenUrl] = useState(slideUrl);
  const [mainScreenTsQuery, setMainScreenTsQuery] = useState(slideTsQuery);
  const [subScreenUrl, setSubScreenUrl] = useState(camUrl);
  const [subScreenTsQuery, setSubScreenTsQuery] = useState(camTsQuery);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
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
            mainScreenTsQuery={mainScreenTsQuery}
            subScreenUrl={subScreenUrl}
            subScreenTsQuery={subScreenTsQuery}
            setMainScreenUrl={setMainScreenUrl}
            setMainScreenTsQuery={setMainScreenTsQuery}
            setSubScreenUrl={setSubScreenUrl}
            setSubScreenTsQuery={setSubScreenTsQuery}
          />
        </div>
        <Caption />
      </div>
      <video ref={videoRef} className={styles.videoPlayer} controls muted />
    </div>
  );
}
