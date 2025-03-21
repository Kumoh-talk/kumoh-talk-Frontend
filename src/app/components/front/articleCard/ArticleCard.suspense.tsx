import styles from './articleCard.module.scss';

export interface Props {
  size?: 'normal' | 'large';
}

export default function ArticleCardSuspense({ size = 'normal' }: Props) {
  return (
    <li
      className={
        size === 'large' ? styles.articleCardLarge : styles.articleCard
      }
    ></li>
  );
}
