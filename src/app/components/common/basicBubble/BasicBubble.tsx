import clsx from 'clsx';
import BubbleTailRightSvg from '@/app/assets/svg/bubble/BubbleTailRightSvg';
import BubbleTailLeftSvg from '@/app/assets/svg/bubble/BubbleTailLeftSvg';
import BubbleTailTopSvg from '@/app/assets/svg/bubble/BubbleTailTopSvg';
import BubbleTailBottomSvg from '@/app/assets/svg/bubble/BubbleTailBottomSvg';
import styles from './basicBubble.module.scss';

export type DirectionPrimaryType = 'left' | 'right' | 'top' | 'bottom';
export type DirectionSecondrayType = 'start' | 'end';

export type BubbleDirectionType =
  | `${DirectionPrimaryType}-${DirectionSecondrayType}`;

export interface Props {
  direction: BubbleDirectionType;
  className?: string;
  children?: React.ReactNode;
}

const tailSvgs: Record<
  DirectionPrimaryType,
  React.FC<{ className?: string }>
> = {
  left: BubbleTailLeftSvg,
  right: BubbleTailRightSvg,
  top: BubbleTailTopSvg,
  bottom: BubbleTailBottomSvg,
};

export default function BasicBubble({
  direction,
  className = '',
  children,
}: Props) {
  const [dirPrimary, dirSecondary] = direction.split('-') as [
    DirectionPrimaryType,
    DirectionSecondrayType,
  ];

  const TailSvg = tailSvgs[dirPrimary];

  return (
    <div
      className={clsx(
        styles.basicBubble,
        className,
        styles[`primary-${dirPrimary}`],
        styles[`secondary-${dirSecondary}`],
      )}
    >
      <div className={styles.bubble}>{children}</div>
      <TailSvg className={styles.tail} />
    </div>
  );
}
