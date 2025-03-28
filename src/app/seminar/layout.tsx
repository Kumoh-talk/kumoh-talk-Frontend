import Footer from '@/app/components/common/footer/Footer';

export default function SeminarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
