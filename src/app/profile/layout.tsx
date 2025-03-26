import { Metadata } from 'next';
import Header from '../components/common/header/Header';

export const metadata: Metadata = {
  title: '야밤의금오톡 프로필',
  description: '야밤의금오톡 프로필 페이지입니다.',
  openGraph: {
    title: '야밤의금오톡 프로필',
    description: '야밤의금오톡 프로필 페이지입니다.',
    images: ['/images/logo_thumbnail_v1.png'],
  },
};

export interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header title='내 프로필' />
      {children}
    </>
  );
}
