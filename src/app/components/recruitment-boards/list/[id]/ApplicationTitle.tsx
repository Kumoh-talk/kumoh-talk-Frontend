import { getApplicantUserInfo } from '@/app/lib/apis/recruitment-boards/list/list';
import styles from './applicationTitle.module.scss';
import { ApplicantUserInfoApi } from '@/app/lib/types/recruitmentBoards/applicantUser';
import ProfileImage from '@/app/components/common/ProfileImage';
import StudentStatus from '../StudentStatus';

export interface Props {
  applicantUserId: string;
}

export default async function ApplicationTitle({ applicantUserId }: Props) {
  const applicantUserInfo: ApplicantUserInfoApi = await getApplicantUserInfo(
    Number(applicantUserId)
  );
  const { name, profileImageUrl, userAdditionalProfile } =
    applicantUserInfo.data;
  const { department, grade, studentId, studentStatus } = userAdditionalProfile;

  return (
    <div className={styles.titleWrapper}>
      <div className={styles.profileWrapper}>
        <div className={styles.profileInfo}>
          <div className={styles.profileImage}>
            <ProfileImage profileImageUrl={profileImageUrl} />
          </div>
          <div className={styles.nameDepartment}>
            <span className={styles.name}>{name}</span>
            <span className={styles.department}>{department}</span>
          </div>
        </div>
        <StudentStatus studentStatus={studentStatus} />
      </div>
      <div className={styles.detailInfo}>
        <div className={styles.detailComponent}>
          <span className={styles.detailTitle}>학번</span>
          <span className={styles.detailContent}>{studentId}</span>
        </div>
        <div className={styles.detailComponent}>
          <span className={styles.detailTitle}>학년</span>
          <span className={styles.detailContent}>{grade}</span>
        </div>
      </div>
    </div>
  );
}
