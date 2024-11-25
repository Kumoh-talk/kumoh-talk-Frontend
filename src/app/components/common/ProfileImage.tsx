import defaultProfile from '@/app/assets/png/defaultProfile.png';
import Image from 'next/image';
// TODO: 백엔드 api 완성되면 수정
export default function ProfileImage() {
  return (
    <Image src={defaultProfile} alt="profile" width={40} height={40} />
  )
}