import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header title="다시보기" />
      {children}
    </div>
  );
}
