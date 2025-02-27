import ProfileImage from '@/app/components/common/ProfileImage';
import styles from './listContent.module.scss';
import Link from 'next/link';
import { Applicant } from '@/app/lib/types/recruitmentBoards/applyList';
import { getApplicantUserInfo } from '@/app/lib/apis/recruitment-boards/list/list';

type UserAdditionalProfile = {
  studentStatus: string;
  department: string;
  grade: number;
  studentId: number;
};

type ApplicantUserInfo = {
  userId: number;
  name: string;
  profileImageUrl: string;
  userAdditionalProfile: UserAdditionalProfile;
  createdAt: string;
  updatedAt: string;
};

type ApplicantUserInfoApi = {
  success: string;
  data: ApplicantUserInfo;
};

export interface Props {
  id: string;
  title: string;
  boardType: string;
  tag: string;
  name: string;
  applicant: Applicant;
}

export default async function ListContent({
  id,
  title,
  boardType,
  tag,
  name,
  applicant,
}: Props) {
  const { applicantId, userId, createdAt, updatedAt } = applicant;
  const applicationUserInfo: ApplicantUserInfoApi = await getApplicantUserInfo(
    userId
  );
  const { name: applicantUserName, userAdditionalProfile } =
    applicationUserInfo.data;

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list/${applicantId}?id=${id}&title=${title}&boardType=${boardType}&tag=${tag}&name=${name}`}
      passHref={true}
    >
      <div className={styles.contentBlock}>
        <div className={styles.profile}>
          <ProfileImage />
          <div className={styles.profileInfo}>
            <p className={styles.name}>{applicantUserName}</p>
            <p className={styles.department}>
              {userAdditionalProfile.department}
            </p>
          </div>
        </div>
        <p className={styles.grade}>{userAdditionalProfile.grade}</p>
        <p className={styles.studentId}>{userAdditionalProfile.studentId}</p>
        <p className={styles.status}>{userAdditionalProfile.studentStatus}</p>
      </div>
    </Link>
  );
}
