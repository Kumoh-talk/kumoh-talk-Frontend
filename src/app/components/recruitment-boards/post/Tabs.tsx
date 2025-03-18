import CategoryButton from './CategoryButton';
import styles from './tabs.module.scss';
import Image from 'next/image';
import Stick from '@/app/assets/svg/stick.svg';

export default function Tabs() {
  return (
    <div className={styles.tabs}>
      <div className={styles.types}>
        <CategoryButton content='STUDY' type='type'>
          스터디
        </CategoryButton>
        <CategoryButton content='PROJECT' type='type'>
          프로젝트
        </CategoryButton>
        <CategoryButton content='MENTORING' type='type'>
          멘토링
        </CategoryButton>
      </div>
      <div className={styles.stick}>
        <Image src={Stick} alt='stick' width={15} height={30} />
      </div>
      <div className={styles.categories}>
        <CategoryButton content='FRONTEND' type='tag'>
          프론트
        </CategoryButton>
        <CategoryButton content='BACKEND' type='tag'>
          백엔드
        </CategoryButton>
        <CategoryButton content='AI' type='tag'>
          인공지능
        </CategoryButton>
        <CategoryButton content='MOBILE' type='tag'>
          모바일
        </CategoryButton>
        <CategoryButton content='SECURITY' type='tag'>
          보안
        </CategoryButton>
        <CategoryButton content='ETC' type='tag'>
          기타
        </CategoryButton>
      </div>
    </div>
  );
}
