import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './listContent.module.scss';
import Link from 'next/link';
import { Applicant } from '@/app/lib/types/recruitmentBoards/applyList';
import { getApplicantUserInfo } from '@/app/lib/apis/recruitment-boards/list/list';
import { ApplicantUserInfoApi } from '@/app/lib/types/recruitmentBoards/applicantUser';
import StudentStatus from './StudentStatus';

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  name: string;
  applicant: Applicant;
}

export default async function ListContent({ id, applicant }: Props) {
  const { applicantId, userId, createdAt, updatedAt } = applicant;
  const applicationUserInfo: ApplicantUserInfoApi = await getApplicantUserInfo(
    userId
  );
  console.log(applicationUserInfo.data);
  const {
    name: applicantUserName,
    profileImageUrl,
    userAdditionalProfile,
  } = applicationUserInfo.data;

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list/${applicantId}?id=${id}&applicantId=${userId}`}
      passHref={true}
    >
      <div className={styles.contentBlock}>
        <div className={styles.profile}>
          <ProfileImage profileImageUrl={profileImageUrl} />
          <div className={styles.profileInfo}>
            <p className={styles.name}>{applicantUserName}</p>
            <p className={styles.department}>
              {userAdditionalProfile.department}
            </p>
          </div>
        </div>
        <p className={styles.grade}>{userAdditionalProfile.grade}</p>
        <p className={styles.studentId}>{userAdditionalProfile.studentId}</p>
        <p className={styles.status}>
          <StudentStatus studentStatus={userAdditionalProfile.studentStatus} />
        </p>
      </div>
    </Link>
  );
}
