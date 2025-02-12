import GithubSvg from '../assets/svg/social/GithubSvg';
import GoogleSvg from '../assets/svg/social/GoogleSvg';
import KakaoSvg from '../assets/svg/social/KakaoSvg';
import NaverSvg from '../assets/svg/social/NaverSvg';
import EducationInfo from '../components/profile/EducationInfo';
import NewsletterInfo from '../components/profile/NewsletterInfo';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileSideBar from '../components/profile/ProfileSideBar';
import SignOutContainer from '../components/profile/SignOutContainer';
import SubscriptionStatus from '../components/profile/SubscriptionStatus';
import { getAdditionalInfo, getMyProfile } from '../lib/apis/profile/myProfile';
import { Subscription } from '../lib/types/profile/subscription';
import {
  AdditionalInfoResponse,
  UserInfoResponse,
} from '../lib/types/user/userInfo';
import styles from './page.module.scss';

const providerObj = {
  GITHUB: <GithubSvg />,
  KAKAO: <KakaoSvg />,
  GOOGLE: <GoogleSvg />,
  NAVER: <NaverSvg />,
};

const dummySubscriptionList: Subscription[] = [
  { name: '세미나 내용 정리 알림', type: 'seminarContentNotice' },
  { name: '스터디 새 글 알림', type: 'studyNotice' },
  { name: '프로젝트 새 글 알림', type: 'projectNotice' },
  { name: '멘토링 새 글 알림', type: 'mentoringNotice' },
];

export default async function Page() {
  const myProfile: UserInfoResponse = await getMyProfile();
  const {
    id,
    provider,
    nickname,
    name,
    profileImageUrl,
    role,
    createdAt,
    updatedAt,
  } = myProfile.data;
  const additionalInfo: AdditionalInfoResponse = await getAdditionalInfo(id);
  const {
    email,
    department,
    studentId,
    grade,
    studentStatus,
    phoneNumber,
    isUpdated,
  } = additionalInfo.data;

  return (
    <div className={styles.page}>
      <div className={styles.sideBar}>
        <div />
        <ProfileSideBar />
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.titleBlock}>
            <span className={styles.title}>기본 정보</span>
            <div className={styles.provider}>{providerObj[provider]}</div>
          </div>
          <ProfileInfo
            profileImageUrl={profileImageUrl}
            name={name}
            nickname={nickname}
          />
        </div>
        {/* <div>
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
        </div> */}
        <div>
          <div className={styles.titleBlock}>
            <span className={styles.title}>학사 정보</span>
          </div>
          <EducationInfo
            studentStatus={studentStatus}
            grade={grade}
            studentId={studentId}
            department={department}
            phoneNumber={phoneNumber}
            email={email}
          />
          <SignOutContainer />
        </div>
      </div>
    </div>
  );
}
