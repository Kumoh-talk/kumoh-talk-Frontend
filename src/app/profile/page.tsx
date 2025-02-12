'use client';

import { useEffect, useState } from 'react';
import GithubSvg from '../assets/svg/social/GithubSvg';
import GoogleSvg from '../assets/svg/social/GoogleSvg';
import KakaoSvg from '../assets/svg/social/KakaoSvg';
import NaverSvg from '../assets/svg/social/NaverSvg';
import EducationInfo from '../components/profile/EducationInfo';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileSideBar from '../components/profile/ProfileSideBar';
import SignOutContainer from '../components/profile/SignOutContainer';
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

export default function Page() {
  const [myProfile, setMyProfile] = useState<UserInfoResponse | null>(null);
  const [additionalInfo, setAdditionalInfo] =
    useState<AdditionalInfoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile();
        console.log('Profile Data:', profileData);

        if (profileData?.data) {
          setMyProfile(profileData);
          const additionalData = await getAdditionalInfo();
          setAdditionalInfo(additionalData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!myProfile || !myProfile.data) {
    return <div>Error loading profile.</div>;
  }

  const { id, provider, nickname, name, profileImageUrl } = myProfile.data;

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
        <div>
          <div className={styles.titleBlock}>
            <span className={styles.title}>학사 정보</span>
          </div>
          {additionalInfo && additionalInfo.data ? (
            <>
              <EducationInfo
                studentStatus={additionalInfo.data.studentStatus}
                grade={additionalInfo.data.grade}
                studentId={additionalInfo.data.studentId}
                department={additionalInfo.data.department}
                phoneNumber={additionalInfo.data.phoneNumber}
                email={additionalInfo.data.email}
              />
              <SignOutContainer />
            </>
          ) : (
            <div>정보를 등록해주세요.</div>
          )}
        </div>
      </div>
    </div>
  );
}
