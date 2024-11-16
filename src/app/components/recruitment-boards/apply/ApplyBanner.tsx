import Image from 'next/image';
import applyBanner from '@/app/assets/png/applyBanner.png';
import styles from './applyBanner.module.scss';

export default function ApplyBanner() {
  return (
    <div className={styles.banner}>
      <Image className={styles.image} src={applyBanner} alt={'banner'}/>
    </div>
  )
}