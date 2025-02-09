import Check from '@/app/assets/svg/Check';
import { SubscriptionType } from '@/app/lib/types/profile/subscription';
import styles from './subscriptionCard.module.scss';

export interface Props {
  name: string;
  type: SubscriptionType;
}

export default function SubscriptionCard({ name, type }: Props) {
  return (
    <div className={styles.card}>
      <Check />
      <span className={styles.name}>{name}</span>
    </div>
  );
}
