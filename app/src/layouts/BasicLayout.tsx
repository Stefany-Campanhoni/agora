import { Outlet } from "react-router-dom"
import { Header } from "@/components/header/Header"

export function BasicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
