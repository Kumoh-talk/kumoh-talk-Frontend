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
  applicant: Applicant;
}

export default async function ListContent({
  id,
  title,
  boardType,
  tag,
  applicant,
}: Props) {
  const { applicantId, userId, createdAt, updatedAt } = applicant;
  const applicationUserInfo: ApplicantUserInfoApi = await getApplicantUserInfo(
    userId
  );
  const { name, userAdditionalProfile } = applicationUserInfo.data;

  return (
    <Link
      style={{ textDecoration: 'none' }}
      href={`./list/${applicantId}?id=${id}&title=${title}&boardType=${boardType}&tag=${tag}`}
      passHref={true}
    >
      <div className={styles.contentBlock}>
        <div className={styles.profile}>
          <ProfileImage />
          <p className={styles.name}>{name}</p>
        </div>
        <p>{userAdditionalProfile.department}</p>
        <p>{userAdditionalProfile.grade}</p>
        <p>20201287</p>
        <p>010 1234 5678</p>
        <p>{userAdditionalProfile.studentStatus}</p>
      </div>
    </Link>
  );
}
