import styles from './imageEditMenu.module.scss';

export interface Props {
  isShow: boolean;
}

export default function ImageEditMenu({ isShow }: Props) {
  if (!isShow) {
    return null;
  }

  return (
    <div className={styles.list}>
      <div className={styles.item}>사진 변경</div>
      <div className={styles.item}>사진 삭제</div>
    </div>
  );
}
