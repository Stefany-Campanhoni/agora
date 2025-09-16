import { Header } from "../components/header/Header";

export function BasicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header /> 
      <main>{children}</main>
    </>
  );
}