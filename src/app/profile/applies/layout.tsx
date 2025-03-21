import Header from "@/app/components/common/header/Header";

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
