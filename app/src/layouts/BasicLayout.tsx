import { Outlet } from "react-router-dom"
import { Header } from "../components/header/Header"
import "./BasicLayout.css"

export function BasicLayout() {
  return (
    <>
      <Header />
      <main className="basic-layout-main">
        <Outlet />
      </main>
    </>
  )
}
