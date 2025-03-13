'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, type SwiperClass } from 'swiper/react';
import { BoardArticle } from '@/app/lib/types/board/board';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './seminarList.module.scss';
import SeminarItemMobile from './SeminarItemMobile';

export default function SeminarListMobile({
  items,
}: {
  items: BoardArticle[];
}) {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const loopAutoplay = () => !isHover && swiper?.slideNext();
    const interval = setInterval(loopAutoplay, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [swiper, isHover]);

  const list = items.map((item) => (
    <SwiperSlide key={item.boardId}>
      <SeminarItemMobile key={item.boardId} {...item} />
    </SwiperSlide>
  ));

  return (
    <section
      className={clsx(styles.container, styles.mobile)}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <header className={styles.header}>진행중인 세미나</header>
      <Swiper
        onSwiper={(e) => {
          setSwiper(e);
        }}
        loop
        slidesPerView={1}
        loopAdditionalSlides={1}
        modules={[Navigation, Pagination]}
        className={styles.list}
        onSlideChange={(e) => {
          setSliderIndex(e.realIndex);
        }}
      >
        {list}
      </Swiper>
    </section>
  );
}
