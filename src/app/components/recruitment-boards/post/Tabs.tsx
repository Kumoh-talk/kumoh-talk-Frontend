import CategoryButton from './CategoryButton';
import styles from './tabs.module.scss';
import Image from 'next/image';
import Stick from '@/app/assets/svg/stick.svg';

export default function Tabs() {
  return (
    <div className={styles.tabs}>
      <div className={styles.types}>
        <CategoryButton content="스터디" type="type" />
        <CategoryButton content="프로젝트" type="type" />
        <CategoryButton content="멘토링" type="type" />
      </div>
      <div className={styles.stick}>
        <Image src={Stick} alt="stick" width={15} height={30} />
      </div>
      <div className={styles.categories}>
        <CategoryButton content="프론트" type="tag" />
        <CategoryButton content="백엔드" type="tag" />
        <CategoryButton content="인공지능" type="tag" />
        <CategoryButton content="모바일" type="tag" />
        <CategoryButton content="보안" type="tag" />
        <CategoryButton content="기타" type="tag" />
      </div>
    </div>
  );
}
