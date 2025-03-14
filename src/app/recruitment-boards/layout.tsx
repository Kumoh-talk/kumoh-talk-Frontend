export interface Props {
  children: React.ReactNode;
  applicationModal: React.ReactNode;
}

export default function Layout({ children, applicationModal }: Props) {
  return (
    <>
      {children}
      {applicationModal}
      <div id='applicationModal'></div>
    </>
  );
}
