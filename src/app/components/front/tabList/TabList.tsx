import ToggleTab from './toggleTab/ToggleTab';
import styles from './tabList.module.scss';

export type Tab = 'article' | 'notice';

export default function TabList() {
  const defaultTab = 'article';
  const tabs: { value: Tab; label: string }[] = [
    { value: 'article', label: '스터디/멘토링/프로젝트' },
    { value: 'notice', label: '공지사항' },
  ];

  const tabList = tabs.map((_tab) => (
    <ToggleTab
      key={_tab.value}
      value={_tab.value}
      label={_tab.label}
      isDefault={defaultTab === _tab.value}
    />
  ));

  return (
    <div className={styles.tabList}>
      <div className={styles.line}></div>
      <ul className={styles.list}>{tabList}</ul>
    </div>
  );
}
