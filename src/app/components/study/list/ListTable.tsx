import ListTitle from '@/app/components/study/list/ListTitle';
import ListContent from '@/app/components/study/list/ListContent';
import styles from './listTable.module.scss';

export default function ListTable() {
  return (
    <div className={styles.list}>
      <ListTitle />
      <ListContent />
      <ListContent />
      <ListContent />
      <ListContent />
      <ListContent />
      <ListContent />
      <ListContent />
    </div>
  )
}