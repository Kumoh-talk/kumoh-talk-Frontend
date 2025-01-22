import { Subscription } from '@/app/lib/types/profile/subscription';
import SubscriptionCard from './SubscriptionCard';
import styles from './subscriptionList.module.scss';

export interface Props {
  subscriptionList: Subscription[];
}

export default function SubscriptionStatus({ subscriptionList }: Props) {
  return (
    <ul className={styles.list}>
      {subscriptionList.map((subscription) => (
        <SubscriptionCard key={subscription.type} {...subscription} />
      ))}
    </ul>
  );
}
