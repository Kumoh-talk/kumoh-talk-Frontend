import styles from './profileInfo.module.scss';
import Image from 'next/image';

export default function ProfileInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>프로필 사진</span>
        </div>
        <div className={styles.content}>
          <Image
            className={styles.image}
            src='/images/defaultProfileImage.svg'
            alt='프로필 사진'
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>이름</span>
          </div>
          <div className={styles.content}>
            <span>한태산</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>닉네임</span>
          </div>
          <div className={styles.content}>
            <span>탯냥이</span>
          </div>
        </div>
      </div>
    </div>
  );
}
