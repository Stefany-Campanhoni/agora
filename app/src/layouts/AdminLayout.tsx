import { useEffect, useRef } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { UserModal } from "../components/modal/UserModal"
import { useAuth } from "../hooks/useAuth"
import { useModal } from "../hooks/useModal"
import "./AdminLayout.css"

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isModalOpen, toggleModal } = useModal()
  const { logout } = useAuth()
  const topbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateTopbarHeight = () => {
      if (topbarRef.current) {
        const height = topbarRef.current.offsetHeight
        document.documentElement.style.setProperty("--topbar-height", `${height}px`)
      }
    }

    updateTopbarHeight()
    window.addEventListener("resize", updateTopbarHeight)
    return () => window.removeEventListener("resize", updateTopbarHeight)
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/home")
  }

  const handleUserIconClick = () => {
    toggleModal()
  }

  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  const getPageTitle = () => {
    if (location.pathname.includes("/admin/rooms")) return "Gerenciar Salas"
    if (location.pathname.includes("/admin/users")) return "Gerenciar Usuários"
    return "Painel de Administração"
  }

  if (location.pathname === "/admin" || location.pathname === "/admin/") {
    navigate("/admin/dashboard", { replace: true })
  }

  return (
    <>
      <UserModal
        show={isModalOpen}
        onHide={handleUserIconClick}
      />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img
              src={logo}
              alt="Ágora Logo"
              className="admin-sidebar-logo"
            />
            <h1 className="admin-sidebar-title">Ágora Admin</h1>
          </div>

          <nav className="admin-sidebar-nav">
            <div className="admin-nav-item">
              <a
                href="/admin/dashboard"
                className={`admin-nav-link ${
                  location.pathname === "/admin/dashboard" ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/admin/dashboard")
                }}
              >
                <span className="admin-nav-icon">📊</span>
                <span>Dashboard</span>
              </a>
            </div>

            <div className="admin-nav-item">
              <a
                href="/admin/rooms"
                className={`admin-nav-link ${isActive("/admin/rooms") ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/admin/rooms")
                }}
              >
                <span className="admin-nav-icon">🏛️</span>
                <span>Salas</span>
              </a>
            </div>

            <div className="admin-nav-item">
              <a
                href="/admin/users"
                className={`admin-nav-link ${isActive("/admin/users") ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/admin/users")
                }}
              >
                <span className="admin-nav-icon">👥</span>
                <span>Usuários</span>
              </a>
            </div>

            <div className="admin-nav-item">
              <a
                href="/home"
                className="admin-nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/home")
                }}
              >
                <span className="admin-nav-icon">👀</span>
                <span>Visualizar como Usuário</span>
              </a>
            </div>
          </nav>

          <div className="admin-sidebar-footer">
            <button
              className="admin-logout-btn"
              onClick={handleLogout}
            >
              <span className="admin-nav-icon">🚪</span>
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="admin-main-content">
          {/* Topbar */}
          <header
            className="admin-topbar"
            ref={topbarRef}
          >
            <h2 className="admin-topbar-title">{getPageTitle()}</h2>

            <div className="admin-topbar-actions">
              <div
                className="user-icon"
                onClick={handleUserIconClick}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="user-icon-svg"
                >
                  <path
                    d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="admin-content-area">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
