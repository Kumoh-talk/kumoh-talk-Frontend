import styles from './applyBanner.module.scss';
import Link from 'next/link';

export default function ApplyBanner() {
  return (
    <div className={styles.applyBanner}>
      <div className={styles.container}>
        <div className={styles.weare}>
          <span>WE ARE</span>
        </div>
        <div className={styles.looking}>
          <span className={styles.text}>LOOKING</span>
        </div>
        <div className={styles.for}>
          <span>FOR</span>
        </div>
        <div className={styles.aSeminarPresentor}>
          <div className={styles.wrapper}>
            <div className={styles.wrapper2}>
              <span>A SEMINAR PRESENTOR</span>
            </div>
          </div>
        </div>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <img
          src="/images/home-banner/twinkle.webp"
          alt="반짝"
          className={styles.twinkle}
        />
        <img
          src="/images/home-banner/star.webp"
          alt="별"
          className={styles.star}
        />
        <img
          src="/images/home-banner/speaker.webp"
          alt="확성기"
          className={styles.speaker}
        />
        <img
          src="/images/home-banner/star2.webp"
          alt="별2"
          className={styles.star2}
        />
        <img
          src="/images/home-banner/star3.webp"
          alt="별3"
          className={styles.star3}
        />
      </div>
      <div className={styles.bottom}>
        <Link href={'/apply'}>
          <button className={styles.apply}>신청하기</button>
        </Link>
        <div className={styles.introduce}>
          야밤의 금오톡에서 세미나 발표자를 찾습니다!
          <span className={styles.duration}>
            09.15
            <div className={styles.line}/>
            10.17
          </span>
        </div>
      </div>
    </div>
  );
}
