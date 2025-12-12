import { useEffect, useState } from "react"
import { Settings, Mail, Shield, LogOut, User, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { loadUser } from "@/service/user/user.api"
import type { User as UserType } from "@/service/user/user.types"
import { useModal } from "@/hooks/useModal"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export function ModalManagementContent() {
  const [user, setUser] = useState<UserType | null>(null)
  const { logout, isAdmin } = useAuth()
  const { toggleModal } = useModal()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      try {
        const userData = await loadUser()
        setUser(userData)
      } catch (error) {
        navigate(-1)
      }
    })()
  }, [navigate])

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Estou de olho ein 👀</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6 py-4">
        {/* Avatar e Nome */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            {user.profilePicture ? (
              <img
                src={`data:image/png;base64,${user.profilePicture}`}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
          </div>
          <h3 className="mt-3 text-lg font-semibold">{user.name}</h3>
        </div>

        <Separator />

        {/* Informações do usuário */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="font-medium">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <DialogFooter className="flex-col gap-2 sm:flex-row">
        {isAdmin && (
          <Button
            variant="outline"
            onClick={() => {
              toggleModal()
              navigate("/admin/dashboard")
            }}
            className="w-full sm:w-auto"
          >
            <Shield className="mr-2 h-4 w-4" />
            Área Admin
          </Button>
        )}

        <Button
          variant="outline"
          onClick={() => navigate("user/edit", { state: { user } })}
          className="w-full sm:w-auto"
        >
          <Settings className="mr-2 h-4 w-4" />
          Editar Perfil
        </Button>

        <Button
          variant="destructive"
          onClick={() => logout()}
          className="w-full sm:w-auto"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </DialogFooter>
    </>
  )
}
