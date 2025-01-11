import EducationInfo from '../components/profile/EducationInfo';
import NewsletterInfo from '../components/profile/NewsletterInfo';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileSideBar from '../components/profile/ProfileSideBar';
import SubscriptionStatus from '../components/profile/SubscriptionStatus';
import { Subscription } from '../lib/types/profile/subscription';
import styles from './page.module.scss';

const dummySubscriptionList: Subscription[] = [
  { name: '세미나 내용 정리 알림', type: 'seminarContentNotice' },
  { name: '스터디 새 글 알림', type: 'studyNotice' },
  { name: '프로젝트 새 글 알림', type: 'projectNotice' },
  { name: '멘토링 새 글 알림', type: 'mentoringNotice' },
];

export default function Page() {
  return (
    <>
      <div className={styles.page}>
        <div className={styles.sideBar}>
          <div />
          <ProfileSideBar />
        </div>
        <div className={styles.content}>
          <div>
            <div className={styles.titleBlock}>
              <span className={styles.title}>기본 정보</span>
              <div>무슨 SNS로 로그인 했는지 아이콘 추가</div>
            </div>
            <ProfileInfo />
          </div>
          <div>
            <div className={styles.titleBlock}>
              <span className={styles.title}>뉴스레터</span>
            </div>
            <NewsletterInfo />
          </div>
          <div>
            <div className={styles.titleBlock}>
              <span className={styles.title}>구독상태</span>
            </div>
            <SubscriptionStatus subscriptionList={dummySubscriptionList} />
            <span className={styles.cancelSubscription}>구독 취소</span>
          </div>
          <div>
            <div className={styles.titleBlock}>
              <span className={styles.title}>학사 정보</span>
            </div>
            <EducationInfo />
            <span className={styles.cancelSubscription}>회원 탈퇴</span>
          </div>
        </div>
      </div>
    </>
  );
}
