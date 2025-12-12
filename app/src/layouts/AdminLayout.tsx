import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { LayoutDashboard, DoorOpen, Users, Eye, LogOut, User } from "lucide-react"
import logo from "@/assets/logo.png"
import { UserModal } from "@/components/modal/UserModal"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { useAuth } from "@/hooks/useAuth"
import { useModal } from "@/hooks/useModal"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isModalOpen, toggleModal } = useModal()
  const { logout } = useAuth()

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/dashboard", { replace: true })
    }
  }, [location.pathname, navigate])

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

  const navItems = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    { path: "/admin/rooms", label: "Salas", icon: DoorOpen },
    { path: "/admin/users", label: "Usuários", icon: Users },
  ]

  return (
    <>
      <UserModal
        show={isModalOpen}
        onHide={handleUserIconClick}
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-card">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b p-4">
            <img
              src={logo}
              alt="Ágora Logo"
              className="h-10 w-10"
            />
            <h1 className="text-lg font-semibold text-primary">Ágora Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
                  (item.exact ? location.pathname === item.path : isActive(item.path)) &&
                    "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}

            <Separator className="my-4" />

            <Button
              variant="ghost"
              onClick={() => navigate("/home")}
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-5 w-5" />
              Visualizar como Usuário
            </Button>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="ml-64 flex flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
            <h2 className="text-xl font-semibold">{getPageTitle()}</h2>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleUserIconClick}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Menu do usuário</span>
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
