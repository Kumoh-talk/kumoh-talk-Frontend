import { useContext } from "react";
import styles from "./profileInfo.module.scss";
import Image from "next/image";
import { userInfoContext } from "./UserInfoProvider";

export default function ProfileInfo() {
  const { data } = useContext(userInfoContext);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.title}>
          <span>프로필 사진</span>
        </div>
        <div className={styles.content}>
          <Image
            className={styles.image}
            src={data.profileImageUrl || "/images/defaultProfileImage.svg"}
            alt="프로필 사진"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>이름</span>
          </div>
          <div className={styles.content}>
            <span>{data.name}</span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>
            <span>닉네임</span>
          </div>
          <div className={styles.content}>
            <span>{data.nickname}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
