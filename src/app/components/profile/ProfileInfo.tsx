import styles from './profileInfo.module.scss';
import ImageEdit from './ImageEdit';
import PenSvg from '@/app/assets/svg/PenSvg';
import NicknameEdit from './NicknameEdit';
export interface Props {
  profileImageUrl: string;
  name: string;
  nickname: string;
}

export default function ProfileInfo({
  profileImageUrl,
  name,
  nickname,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>프로필 사진</span>
        </div>
        <div className={styles.content}>
          <ImageEdit profileImageUrl={profileImageUrl} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>이름</span>
          </div>
          <div className={styles.content}>
            <span>{name}</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>닉네임</span>
          </div>
          <div className={styles.content}>
            <span>{nickname}</span>
            <NicknameEdit />
          </div>
        </div>
      </div>
    </div>
  );
}
