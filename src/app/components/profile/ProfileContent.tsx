'use client';

import EducationInfo from './EducationInfo';
import ProfileInfo from './ProfileInfo';
import SignOutContainer from './SignOutContainer';
import { useState, useEffect } from 'react';
import { UserInfo } from '@/app/lib/types/user/userInfo';
import { AdditionalInfo } from '@/app/lib/types/user/userInfo';
import {
  getMyProfile,
  getAdditionalInfo,
} from '@/app/lib/apis/profile/myProfile';
import { notFound } from 'next/navigation';
import styles from './profileContent.module.scss';
import GithubSvg from '@/app/assets/svg/social/GithubSvg';
import KakaoSvg from '@/app/assets/svg/social/KakaoSvg';
import GoogleSvg from '@/app/assets/svg/social/GoogleSvg';
import NaverSvg from '@/app/assets/svg/social/NaverSvg';

const providerObj = {
  GITHUB: <GithubSvg />,
  KAKAO: <KakaoSvg />,
  GOOGLE: <GoogleSvg />,
  NAVER: <NaverSvg />,
};

export default function ProfileContent() {
  const [myProfile, setMyProfile] = useState<UserInfo | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo | null>(
    null
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getMyProfile();
        console.log('Profile Data:', profileData);

        if (profileData?.data) {
          setMyProfile(profileData.data);
          const additionalData = await getAdditionalInfo();
          setAdditionalInfo(additionalData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        notFound();
      }
    };

    fetchProfile();
  }, []);

  if (!myProfile) {
    return <div>로딩중...</div>;
  }

  return (
    <>
      <div>
        <div className={styles.titleBlock}>
          <span className={styles.title}>기본 정보</span>
          <div className={styles.provider}>
            {providerObj[myProfile.provider]}
          </div>
        </div>
        <ProfileInfo
          profileImageUrl={myProfile.profileImageUrl}
          name={myProfile.name}
          nickname={myProfile.nickname}
        />
      </div>
      <div>
        <div className={styles.titleBlock}>
          <span className={styles.title}>학사 정보</span>
        </div>
        {additionalInfo ? (
          <>
            <EducationInfo
              studentStatus={additionalInfo.studentStatus}
              grade={additionalInfo.grade}
              studentId={additionalInfo.studentId}
              department={additionalInfo.department}
              phoneNumber={additionalInfo.phoneNumber}
              email={additionalInfo.email}
            />
            <SignOutContainer provider={myProfile.provider} />
          </>
        ) : (
          <div>정보를 등록해주세요.</div>
        )}
      </div>
    </>
  );
}
