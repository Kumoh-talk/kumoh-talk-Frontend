import { useRef } from 'react';
import styles from './imageEditMenu.module.scss';
import {
  deleteProfileImage,
  getPresignedURL,
  patchProfileImage,
  uploadProfileImage,
} from '@/app/lib/apis/profile/myProfile';
import {
  PatchProfileImageResponse,
  PresignedURLResponse,
} from '@/app/lib/types/user/userInfo';

export interface Props {
  isShow: boolean;
}

export default function ImageEditMenu({ isShow }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (image: File) => {
    if (!image || !image.type.includes('image')) {
      return;
    }

    const response: PresignedURLResponse = await getPresignedURL(image.name);
    const url = response.data;

    const uploadProfileImageResponse = await uploadProfileImage(url, image);
    console.log(url, uploadProfileImageResponse);

    const patchResponse: PatchProfileImageResponse = await patchProfileImage(
      url
    );
    if (patchResponse.success === 'true') {
      window.location.reload();
    } else {
      alert('파일명에 한글 혹은 특수문자가 포함되어 있습니다.');
    }
  };

  const handleDeleteProfileImage = async () => {
    const response = await deleteProfileImage();
    if (response.success === 'true') {
      window.location.reload();
    }
  };

  if (!isShow) {
    return null;
  }

  return (
    <div className={styles.list}>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        className={styles.item}
        onChange={handleFileChange}
        hidden
      />
      <div
        className={styles.item}
        onClick={() => {
          fileRef.current?.click();
        }}
      >
        사진 변경
      </div>
      <div className={styles.item} onClick={handleDeleteProfileImage}>
        사진 삭제
      </div>
    </div>
  );
}
