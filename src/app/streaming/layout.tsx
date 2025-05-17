import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header title="스트리밍" />
      {children}
    </div>
  );
}
