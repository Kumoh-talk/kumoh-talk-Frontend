'use client';

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
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
    console.log('화면 변경');
    setMainScreenUrl(subScreenUrl);
    setSubScreenUrl(mainScreenUrl);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          liveSyncDuration: 2,
          startPosition: -2,
        });
        hls.loadSource(subScreenUrl);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          videoRef.current?.play();
        });

        hls.on(Hls.Events.LEVEL_LOADED, (_event, data) => {
          // data.details.totalduration: 해당 레벨(quality)의 전체 길이(초 단위)
          // (VOD인 경우 유한한 숫자로, 라이브인 경우 Infinity로 나옴)
          const total = data.details.totalduration;
          console.log('HLS LEVEL_LOADED totalduration:', total);
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
