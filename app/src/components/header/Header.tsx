import { useLocation, useNavigate } from "react-router-dom"
import { Home, DoorOpen, CalendarDays, User } from "lucide-react"
import logo from "@/assets/logo.png"
import { useModal } from "@/hooks/useModal"
import { useAuth } from "@/hooks/useAuth"
import { UserModal } from "@/components/modal/UserModal"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const { isModalOpen, toggleModal } = useModal()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleUserIconClick = () => {
    toggleModal()
  }

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/rooms", label: "Salas Disponíveis", icon: DoorOpen },
    ...(isAuthenticated
      ? [{ path: "/reservations", label: "Minhas Reservas", icon: CalendarDays }]
      : []),
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <UserModal
        show={isModalOpen}
        onHide={handleUserIconClick}
      />

      <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Agora Logo"
              className="h-10 w-auto cursor-pointer"
              onClick={() => navigate("/home")}
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                onClick={() => navigate(item.path)}
                className={cn(
                  "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                  isActive(item.path) && "bg-primary-foreground/20 text-primary-foreground",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <nav className="flex md:hidden items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                onClick={() => navigate(item.path)}
                className={cn(
                  "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                  isActive(item.path) && "bg-primary-foreground/20 text-primary-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleUserIconClick}
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Menu do usuário</span>
            </Button>
          </div>
        </div>
      </header>
    </>
  )
}
