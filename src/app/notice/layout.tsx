import Footer from '@/app/components/common/footer/Footer';

export default function NoticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
