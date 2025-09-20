import { Outlet } from "react-router-dom"
import "./UserLayout.css"

export function UserLayout() {
  return (
    <div className="user-layout">
      <Outlet />
    </div>
  )
}
